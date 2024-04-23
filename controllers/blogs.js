const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = req => {
  try {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    console.log(decodedToken)
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
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch {
    res.status(404).end()
  }
})

module.exports = blogsRouter