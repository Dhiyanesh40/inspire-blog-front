import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type BlogFromDB = Database['public']['Tables']['blogs']['Row'] & {
  profiles?: Database['public']['Tables']['profiles']['Row'] | null;
};

export const useAdminBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<BlogFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles!blogs_author_id_profiles_user_id_fkey (display_name, avatar_url, role, username)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllBlogs((data as any) || []);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const adminDeleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchAllBlogs();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const adminUpdateBlog = async (id: string, updates: Partial<BlogFromDB>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchAllBlogs();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    allBlogs,
    loading,
    adminDeleteBlog,
    adminUpdateBlog,
    fetchAllBlogs
  };
};