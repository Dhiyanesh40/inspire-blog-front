import { useState, useEffect } from 'react';
import { apiService, Blog } from '@/lib/api';

export const useAdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await apiService.getAdminBlogs();
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

  const togglePublishStatus = async (id: string, published: boolean) => {
    try {
      await apiService.updateBlog(id, { published });
      await fetchBlogs();
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
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

  return {
    blogs,
    loading,
    fetchBlogs,
    togglePublishStatus,
    deleteBlog
  };
};