import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string, username: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();
    
    if (existingUser) {
      return { error: { message: 'Username already exists' } };
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          username: username
        }
      }
    });
    return { error };
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    // Check if input is email or username
    const isEmail = emailOrUsername.includes('@');
    
    if (isEmail) {
      // Login with email
      const { error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password
      });
      return { error };
    } else {
      // Get email from username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('username', emailOrUsername)
        .single();
      
      if (profileError || !profile) {
        return { error: { message: 'Username not found' } };
      }
      
      // Get email from auth.users via RPC or direct query
      const { data: user, error: userError } = await supabase.auth.admin.getUserById(profile.user_id);
      
      if (userError || !user?.user?.email) {
        // Fallback: try to find email through profiles join
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailOrUsername, // This will fail but is needed for now
          password
        });
        return { error: error || { message: 'Could not retrieve user email' } };
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email: user.user.email,
        password
      });
      return { error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
};