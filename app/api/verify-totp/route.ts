import { NextRequest, NextResponse } from 'next/server';
import speakeasy from 'speakeasy';

const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { attempts: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, resetTime: now + WINDOW_MS };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.attempts++;
  rateLimitMap.set(ip, record);
  return { allowed: true, remaining: MAX_ATTEMPTS - record.attempts, resetTime: record.resetTime };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string' || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid code format. Must be a 6-digit number.' },
        { status: 400 }
      );
    }

    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      const resetSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: 'Too many attempts. Please try again later.',
          resetIn: resetSeconds,
        },
        { status: 429 }
      );
    }

    const secret = process.env.ADMIN_TOTP_SECRET;
    if (!secret) {
      console.error('ADMIN_TOTP_SECRET is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 2,
    });

    if (!verified) {
      return NextResponse.json(
        {
          error: 'Invalid verification code',
          remaining: rateLimit.remaining,
        },
        { status: 401 }
      );
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
      },
      { status: 200 }
    );

    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}