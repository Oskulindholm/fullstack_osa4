const mongoose = require('mongoose')

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


module.exports = mongoose.model('Blog', blogSchema)