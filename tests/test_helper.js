const Blog = require('../models/blog')
const User = require('../models/user')


const userDataset = [
    {
        username: 'Gorgon',
        name: 'Gary',
        password: 'gary'
    },
    {
        username: 'JeeperCreeper',
        name: 'Jerry',
        password: 'jerry'
    },
    {
        username: '360_noScope_proX',
        name: 'Howard',
        password: 'lol'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const blogDataset = [
    {
        title: 'Balling in Bombay',
        author: 'Bob Roberts',
        url: 'http://ballinginbombay.now',
        likes: 5
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

const nonExistingBlogId = async () => {
    const blog = new Blog({ title: 'asdf', author: 'jkl', url: 'qwerty' })
    await blog.save()
    const id = blog._id.toString()
    await blog.deleteOne()
    return id
}

module.exports = {
    blogDataset,
    userDataset,
    blogsInDb,
    usersInDb,
    nonExistingBlogId
}