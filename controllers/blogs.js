const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    req.body.user = decodedToken.id
    const newBlog = new Blog(req.body)

    const blog = await newBlog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    res.status(201).json(blog)
  } catch {
    res.status(401).json({ error: 'invalid token' })
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
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(req.params.id)
    if (!blogToDelete) {
      return res.status(404).end()
    }
    if (!decodedToken) {
      return res.status(401).json({ error: 'token invalid' })
    }
    if (blogToDelete.user && blogToDelete.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'invalid user to complete this operation'})
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
})

module.exports = blogsRouter