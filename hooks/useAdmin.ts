"use client";

import { useState, useEffect } from 'react';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Include credentials to send cookies with the request
    fetch('/api/blog/posts?published=false', {
      credentials: 'include', // This ensures cookies are sent
    })
      .then((res) => {
        setIsAdmin(res.status !== 401);
        setLoading(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setLoading(false);
      });
  }, []);

  return { isAdmin, loading };
}