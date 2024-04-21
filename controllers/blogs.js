const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const newBlog = new Blog(req.body)
  const blog = await newBlog.save()
  res.status(201).json(blog)
})

module.exports = blogsRouter