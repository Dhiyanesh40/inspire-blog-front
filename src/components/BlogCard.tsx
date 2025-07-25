import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '@/hooks/useBlogs';
import { Calendar, Clock, User, Heart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-gradient-card rounded-xl shadow-card hover-lift border border-border/50 overflow-hidden group">
      {/* Cover Image */}
      {blog.cover_image && (
        <div className="relative overflow-hidden">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-smooth"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-smooth">
            {blog.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {blog.summary}
        </p>

        {/* Author and Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {blog.profiles?.avatar_url ? (
              <img
                src={blog.profiles.avatar_url}
                alt={blog.profiles.display_name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {blog.profiles?.display_name || 'Anonymous'}
              </p>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{blog.read_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{blog.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;