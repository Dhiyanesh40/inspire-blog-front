import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Eye, 
  Send, 
  Image as ImageIcon, 
  Tag, 
  Plus,
  X,
  FileText,
  Clock
} from 'lucide-react';

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { toast } = useToast();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved!",
      description: "Your blog post has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and content before publishing.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Blog Published!",
      description: "Your blog post has been published successfully.",
    });
  };

  const estimatedReadTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Write Your Story
            </h1>
            <p className="text-muted-foreground">
              Share your thoughts, ideas, and expertise with the world.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{wordCount} words</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{estimatedReadTime} min read</span>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="hover-lift"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!isPreview ? (
              // Edit Mode
              <div className="space-y-6 animate-slide-up">
                {/* Title */}
                <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Blog Title
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-semibold border-border/50 focus:border-primary transition-smooth"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Summary
                  </label>
                  <Textarea
                    placeholder="Write a compelling summary of your blog post..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    className="border-border/50 focus:border-primary transition-smooth"
                  />
                </div>

                {/* Content */}
                <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content
                  </label>
                  <Textarea
                    placeholder="Start writing your blog post... You can use Markdown formatting."
                    value={content}
                    onChange={handleContentChange}
                    rows={20}
                    className="border-border/50 focus:border-primary transition-smooth font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: You can use Markdown formatting (# for headers, ** for bold, etc.)
                  </p>
                </div>
              </div>
            ) : (
              // Preview Mode
              <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 animate-scale-in">
                {/* Preview Header */}
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}
                
                <div className="space-y-4">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <h1 className="text-3xl font-bold text-foreground">
                    {title || 'Your Blog Title'}
                  </h1>
                  
                  {summary && (
                    <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
                      {summary}
                    </p>
                  )}
                  
                  <div className="prose-blog">
                    {content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-foreground">
                            {paragraph.substring(2)}
                          </h1>
                        );
                      } else if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-xl font-semibold mt-4 mb-3 text-foreground">
                            {paragraph.substring(3)}
                          </h2>
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
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Actions */}
            <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">Publish</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="w-full justify-start hover-lift"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={handlePublish}
                  className="w-full justify-start bg-gradient-primary hover:opacity-90 transition-smooth hover-lift"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">Cover Image</h3>
              <div className="space-y-3">
                <Input
                  type="url"
                  placeholder="Enter image URL..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="border-border/50 focus:border-primary transition-smooth"
                />
                <Button variant="outline" className="w-full justify-start hover-lift" disabled>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">Tags</h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Add a tag..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-border/50 focus:border-primary transition-smooth"
                  />
                  <Button
                    onClick={addTag}
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90 transition-smooth"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive transition-smooth"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Writing Tips */}
            <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50 animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">Writing Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use clear, engaging headlines</li>
                <li>• Write a compelling summary</li>
                <li>• Break up text with headers</li>
                <li>• Add relevant tags for discovery</li>
                <li>• Include a cover image</li>
                <li>• Aim for 200+ words per minute of reading time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;