import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BlogCard from '@/components/BlogCard';
import { mockBlogs } from '@/data/blogs';
import { Search, Filter, Sparkles } from 'lucide-react';

const BlogFeed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(mockBlogs.flatMap(blog => blog.tags)));

  // Filter blogs based on search and tag
  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover Amazing{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore thousands of articles from passionate writers around the world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-border/50 focus:border-primary transition-smooth"
              />
            </div>

            {/* Tags Filter */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter by topic:</span>
                {(searchTerm || selectedTag) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className={`cursor-pointer transition-smooth hover-lift ${
                      selectedTag === tag 
                        ? 'bg-gradient-primary text-white' 
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
            </span>
            {(searchTerm || selectedTag) && (
              <span className="text-muted-foreground">
                {searchTerm && `for "${searchTerm}"`}
                {searchTerm && selectedTag && ' '}
                {selectedTag && `in ${selectedTag}`}
              </span>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-muted/50 rounded-full p-6 w-24 h-24 mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or clearing the filters.
            </p>
            <Button onClick={clearFilters} variant="outline" className="hover-lift">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Load More (Placeholder) */}
        {filteredBlogs.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <Button
              variant="outline"
              size="lg"
              className="hover-lift transition-spring"
              disabled
            >
              Load More Articles
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              More articles coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFeed;