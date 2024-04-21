const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObj = new Blog(testDataset[0])
    await blogObj.save()
    blogObj = new Blog(testDataset[1])
    await blogObj.save()
    blogObj = new Blog(testDataset[2])
    await blogObj.save()
})


test('Blogs are returned in JSON format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('The amount of blogs is 3', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, 3)
})

test('The first blog is about Bombay', async () => {
    const res = await api.get('/api/blogs')
    const titles = res.body.map(e => e.title)
    assert(titles.includes('Balling in Bombay'))
})

test('The blogs have a field named "id" ', async () => {
    const res = await api.get('/api/blogs')
    const ids = res.body.map(e => e.id)
    const ans = ids.every(i => typeof(i) === 'string')
    assert.strictEqual(ans, true)
})

test('A valid blog can be added', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Tester',
        url: 'helloworld.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, testDataset.length + 1)

    const titles = res.body.map(e => e.title)
    assert(titles.includes('Test Blog'))
})

after(async () => {
    await mongoose.connection.close()
})