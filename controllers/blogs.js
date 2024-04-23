const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({})
  req.body.user = user._id
  const newBlog = new Blog(req.body)
  
  try {
    const blog = await newBlog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    res.status(201).json(blog)
  } catch {
    res.status(400).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(204).json(blog)
  } catch {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch {
    res.status(404).end()
  }
})

module.exports = blogsRouter