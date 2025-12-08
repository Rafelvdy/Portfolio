import { NextRequest } from 'next/server';

/**
 * Check if the request has a valid admin session cookie
 * @param request - Next.js request object
 * @returns boolean indicating if user is authenticated as admin
 */
export function isAdmin(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin_session');
  return adminSession?.value === 'authenticated';
}

/**
 * Get admin session cookie value
 * @param request - Next.js request object
 * @returns string | undefined - The admin session cookie value
 */
export function getAdminSession(request: NextRequest): string | undefined {
  return request.cookies.get('admin_session')?.value;
}