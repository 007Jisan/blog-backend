const Blog = require("../models/blogModel");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = await Blog.create({ title, content, author });
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({ message: "All blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Single Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
