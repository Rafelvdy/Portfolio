import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth-helper';
import pool from '@/lib/db';
import { initializeBlogTable } from '@/lib/db-schema';

// Initialize table on first import (in production, run migrations separately)
if (process.env.NODE_ENV !== 'production') {
  initializeBlogTable().catch(console.error);
}

// Helper to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  // Check authentication
  if (!isAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, content, excerpt, published = false } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create slug
    const slug = createSlug(title);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, published, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, title, slug, content, excerpt, published, created_at, updated_at`,
      [title, slug, content, excerpt || null, published]
    );

    return NextResponse.json(
      {
        success: true,
        post: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    
    // Handle duplicate slug error
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// GET - Fetch all blog posts (public can see published, admin sees all)
export async function GET(request: NextRequest) {
  try {
    const isAdminUser = isAdmin(request);
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get('published') === 'true' || !isAdminUser;

    let query = 'SELECT id, title, slug, content, excerpt, author, published, created_at, updated_at FROM blog_posts';
    const params: any[] = [];

    if (publishedOnly) {
      query += ' WHERE published = true';
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      posts: result.rows,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}