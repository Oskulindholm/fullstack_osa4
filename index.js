require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoUrl = `${process.env.MONGODB_URI}`

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.set('toJSON', {
    transform: (document, retObj) => {
        delete retObj._id
        delete retObj.__v
    }
})
  
const Blog = mongoose.model('Blog', blogSchema)

/*let blogs = [
  {
    title: `John's dull doughs`,
    author: 'John Doe',
    url: 'http://johndoe.ccc',
    likes: 3
  },
  {
    title: `Jane's smithereens`,
    author: 'Jane Smith',
    url: 'http://janesmithereens.sss',
    likes: 7
  }
]*/

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)
  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})