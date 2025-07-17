import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
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
      <div className="relative overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>

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
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{blog.author}</p>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(blog.date)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{blog.readTime} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{blog.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;