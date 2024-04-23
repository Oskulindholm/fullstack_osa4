const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  if (password.length < 3) {
    return res.status(400).json({ error: 'password is too short or missing'}) }
  if (username.length < 3) {
    return res.status(400).json({ error: 'username is too short or missing'}) }
  const nameDouble = await User.find({ username: `${username}` })
  if (nameDouble.length > 0) {
    return res.status(400).json({ error: 'username is not unique'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })
  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch {
    res.status(400).end()
  }
})

module.exports = usersRouter