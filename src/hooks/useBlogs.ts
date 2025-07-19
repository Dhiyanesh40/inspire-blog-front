import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  author_id: string;
  cover_image?: string;
  tags: string[];
  read_time: number;
  likes: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  } | null;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles (display_name, avatar_url)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
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
    author_id: string;
    cover_image?: string;
    tags: string[];
    read_time: number;
    published: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();

      if (error) throw error;
      await fetchBlogs();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchBlogs();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchBlogs();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getBlogById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles (display_name, avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
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