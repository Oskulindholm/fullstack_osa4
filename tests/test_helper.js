const Blog = require('../models/blog')

const testDataset = [
    {
        title: 'Balling in Bombay',
        author: 'Bob Roberts',
        url: 'http://ballinginbombay.now',
        likes: 5,
    },
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
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'asdf', author: 'jkl', url: 'qwerty' })
    await blog.save()
    const id = blog._id.toString()
    await blog.deleteOne()
    return id
}

module.exports = {
    testDataset, blogsInDb, nonExistingId
}