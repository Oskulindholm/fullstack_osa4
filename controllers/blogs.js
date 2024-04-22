const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const newBlog = new Blog(req.body)
  try {
    const blog = await newBlog.save()
    res.status(201).json(blog)
  } catch {
    res.status(400).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch {
    res.status(400).end()
  }
})

module.exports = blogsRouter