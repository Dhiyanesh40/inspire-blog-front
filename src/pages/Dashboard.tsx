import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { useToast } from '@/hooks/use-toast';
import { useUserRole } from '@/hooks/useUserRole';
import { Edit, Trash2, Eye, PlusCircle, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { blogs, loading, deleteBlog, updateBlog, fetchBlogs } = useBlogs();
  const { toast } = useToast();
  const { profile } = useUserRole();
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            *,
            profiles!blogs_author_id_fkey (display_name, avatar_url, role)
          `)
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUserBlogs((data as any) || []);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchUserBlogs();
  }, [user, blogs]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const { error } = await deleteBlog(id);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Blog deleted successfully",
        });
      }
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    const { error } = await updateBlog(blog.id, { published: !blog.published });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update blog",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Blog ${blog.published ? 'unpublished' : 'published'} successfully`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {profile?.display_name || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              {user?.email} • @{profile?.username || 'username'} • {profile?.role || 'user'}
            </p>
            <p className="text-muted-foreground">Manage your blog posts and track your progress</p>
          </div>
          <Link to="/write">
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <PlusCircle className="h-5 w-5 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userBlogs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userBlogs.filter(blog => blog.published).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userBlogs.reduce((total, blog) => total + blog.likes, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Your Posts</h2>
          
          {userBlogs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't written any posts yet.</p>
                <Link to="/write">
                  <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
                    Write Your First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {userBlogs.map((blog) => (
                <Card key={blog.id} className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{blog.title}</h3>
                          <Badge variant={blog.published ? "default" : "secondary"}>
                            {blog.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3 line-clamp-2">{blog.summary}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(blog.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {blog.likes} likes
                          </div>
                          <div>{blog.read_time} min read</div>
                        </div>

                        {blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {blog.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublish(blog)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {blog.published ? "Unpublish" : "Publish"}
                        </Button>
                        
                        <Link to={`/blog/${blog.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;