"use client";

import { useAdmin } from '@/hooks/useAdmin';
import AddBlogPost from '@/components/blog/AddBlogPost';

export default function Blog() {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <section className="w-full bg-background py-16 px-10 md:py-24 lg:py-32">
        <div className="container mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background py-16 px-10 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Blog</h1>
        
        {isAdmin && <AddBlogPost />}
        
        {/* Blog posts list will go here */}
        <div className="text-center text-muted-foreground">
          Blog posts coming soon...
        </div>
      </div>
    </section>
  );
}