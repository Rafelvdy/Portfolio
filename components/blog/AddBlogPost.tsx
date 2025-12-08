"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface AddBlogPostProps {
  onSuccess?: () => void;
}

export default function AddBlogPost({ onSuccess }: AddBlogPostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create blog post');
        setLoading(false);
        return;
      }

      // Success
      setSuccess(true);
      setTitle('');
      setContent('');
      setExcerpt('');
      setPublished(false);
      
      // Refresh router to show new post
      router.refresh();
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      setLoading(false);
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Add New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-50"
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            disabled={loading}
            rows={2}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-50"
            placeholder="Brief description of the post"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
            Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
            rows={10}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:opacity-50 font-mono text-sm"
            placeholder="Write your blog post content here..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={loading}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground">
            Publish immediately
          </label>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
            Blog post created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !title || !content}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Blog Post'}
        </button>
      </form>
    </div>
  );
}