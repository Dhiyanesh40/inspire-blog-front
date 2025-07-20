const express = require('express');
const Blog = require('../models/Blog');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all published blogs with author info
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('authorId', 'displayName username avatarUrl role')
      .sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author_id: blog.authorId._id,
      cover_image: blog.coverImage,
      tags: blog.tags,
      read_time: blog.readTime,
      likes: blog.likes.length,
      published: blog.published,
      created_at: blog.createdAt,
      updated_at: blog.updatedAt,
      profiles: {
        display_name: blog.authorId.displayName,
        username: blog.authorId.username,
        avatar_url: blog.authorId.avatarUrl,
        role: blog.authorId.role
      }
    }));

    res.json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('authorId', 'displayName username avatarUrl role');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const formattedBlog = {
      id: blog._id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author_id: blog.authorId._id,
      cover_image: blog.coverImage,
      tags: blog.tags,
      read_time: blog.readTime,
      likes: blog.likes.length,
      published: blog.published,
      created_at: blog.createdAt,
      updated_at: blog.updatedAt,
      profiles: {
        display_name: blog.authorId.displayName,
        username: blog.authorId.username,
        avatar_url: blog.authorId.avatarUrl,
        role: blog.authorId.role
      }
    };

    res.json(formattedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new blog
router.post('/', auth, async (req, res) => {
  try {
    const { title, summary, content, coverImage, tags, readTime, published } = req.body;

    const blog = new Blog({
      title,
      summary,
      content,
      authorId: req.user._id,
      coverImage: coverImage || '',
      tags: tags || [],
      readTime: readTime || 5,
      published: published !== false
    });

    await blog.save();
    await blog.populate('authorId', 'displayName username avatarUrl role');

    const formattedBlog = {
      id: blog._id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author_id: blog.authorId._id,
      cover_image: blog.coverImage,
      tags: blog.tags,
      read_time: blog.readTime,
      likes: blog.likes.length,
      published: blog.published,
      created_at: blog.createdAt,
      updated_at: blog.updatedAt,
      profiles: {
        display_name: blog.authorId.displayName,
        username: blog.authorId.username,
        avatar_url: blog.authorId.avatarUrl,
        role: blog.authorId.role
      }
    };

    res.status(201).json(formattedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blog
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user owns the blog or is admin
    if (blog.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('authorId', 'displayName username avatarUrl role');

    const formattedBlog = {
      id: updatedBlog._id,
      title: updatedBlog.title,
      summary: updatedBlog.summary,
      content: updatedBlog.content,
      author_id: updatedBlog.authorId._id,
      cover_image: updatedBlog.coverImage,
      tags: updatedBlog.tags,
      read_time: updatedBlog.readTime,
      likes: updatedBlog.likes.length,
      published: updatedBlog.published,
      created_at: updatedBlog.createdAt,
      updated_at: updatedBlog.updatedAt,
      profiles: {
        display_name: updatedBlog.authorId.displayName,
        username: updatedBlog.authorId.username,
        avatar_url: updatedBlog.authorId.avatarUrl,
        role: updatedBlog.authorId.role
      }
    };

    res.json(formattedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user owns the blog or is admin
    if (blog.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's own blogs
router.get('/user/my-blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id })
      .populate('authorId', 'displayName username avatarUrl role')
      .sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author_id: blog.authorId._id,
      cover_image: blog.coverImage,
      tags: blog.tags,
      read_time: blog.readTime,
      likes: blog.likes.length,
      published: blog.published,
      created_at: blog.createdAt,
      updated_at: blog.updatedAt,
      profiles: {
        display_name: blog.authorId.displayName,
        username: blog.authorId.username,
        avatar_url: blog.authorId.avatarUrl,
        role: blog.authorId.role
      }
    }));

    res.json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike blog
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const isLiked = blog.likes.includes(req.user._id);

    if (isLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.json({ likes: blog.likes.length, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('authorId', 'displayName username avatarUrl role')
      .sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      author_id: blog.authorId._id,
      cover_image: blog.coverImage,
      tags: blog.tags,
      read_time: blog.readTime,
      likes: blog.likes.length,
      published: blog.published,
      created_at: blog.createdAt,
      updated_at: blog.updatedAt,
      profiles: {
        display_name: blog.authorId.displayName,
        username: blog.authorId.username,
        avatar_url: blog.authorId.avatarUrl,
        role: blog.authorId.role
      }
    }));

    res.json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;