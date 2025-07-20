import { useState, useEffect } from 'react';
import { apiService, Blog } from '@/lib/api';

export type { Blog };

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await apiService.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async (blogData: {
    title: string;
    summary: string;
    content: string;
    coverImage?: string;
    tags: string[];
    readTime: number;
    published: boolean;
  }) => {
    try {
      const data = await apiService.createBlog(blogData);
      await fetchBlogs();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    try {
      const data = await apiService.updateBlog(id, updates);
      await fetchBlogs();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await apiService.deleteBlog(id);
      await fetchBlogs();
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const getBlogById = async (id: string) => {
    try {
      const data = await apiService.getBlogById(id);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  return {
    blogs,
    loading,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    fetchBlogs
  };
};