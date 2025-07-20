-- Add foreign key relationship between blogs and profiles
ALTER TABLE public.blogs 
ADD CONSTRAINT blogs_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;