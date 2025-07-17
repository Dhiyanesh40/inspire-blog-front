import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockBlogs } from '@/data/blogs';
import { 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  MessageSquare, 
  Share2, 
  ArrowLeft,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const blog = mockBlogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button className="hover-lift">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing blog post: ${blog.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/blogs">
          <Button variant="ghost" className="hover-lift mb-6 animate-fade-in">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <article className="bg-gradient-card rounded-xl shadow-elegant border border-border/50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-8 pb-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 transition-smooth"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground">{blog.author}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Article</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className={`transition-spring hover-lift ${
                    isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {blog.likes + (isLiked ? 1 : 0)}
                </Button>

                <Button variant="outline" size="sm" className="transition-smooth hover-lift">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {blog.comments}
                </Button>

                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="transition-smooth hover-lift"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  {showShareMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-popover border border-border rounded-lg shadow-elegant z-50 animate-scale-in">
                      <div className="p-2 space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleShare('twitter')}
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleShare('facebook')}
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleShare('linkedin')}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            <div className="prose-blog">
              {blog.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                      {paragraph.substring(2)}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-foreground">
                      {paragraph.substring(3)}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground">
                      {paragraph.substring(4)}
                    </h3>
                  );
                } else if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
                      {paragraph.substring(2)}
                    </blockquote>
                  );
                } else if (paragraph.startsWith('```')) {
                  return (
                    <pre key={index} className="bg-muted p-4 rounded-lg my-4 overflow-x-auto">
                      <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                    </pre>
                  );
                } else if (paragraph.trim() === '') {
                  return <br key={index} />;
                } else {
                  return (
                    <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{blog.author}</h4>
                  <p className="text-sm text-muted-foreground">
                    Passionate writer sharing insights about technology and development.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleLike}
                  className={`transition-spring hover-lift ${
                    isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like this post'}
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Posts (Placeholder) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold text-foreground mb-8 animate-fade-in">
          You might also like
        </h3>
        <div className="text-center py-8 bg-muted/30 rounded-xl animate-fade-in">
          <p className="text-muted-foreground">Related posts coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;