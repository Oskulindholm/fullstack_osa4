const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObj = new Blog(helper.blogDataset[0])
    await blogObj.save()
    blogObj = new Blog(helper.blogDataset[1])
    await blogObj.save()
    blogObj = new Blog(helper.blogDataset[2])
    await blogObj.save()
})

describe('GET requests', () => {
    test('blogs are returned in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, 3)
    })
    
    test('a specific blog is within the returned ones', async () => {
        const res = await api.get('/api/blogs')
        const titles = res.body.map(e => e.title)
        assert(titles.includes('Balling in Bombay'))
    })
    
    test('all blogs have a field named "id" ', async () => {
        const res = await api.get('/api/blogs')
        const ids = res.body.map(e => e.id)
        const ans = ids.every(i => typeof(i) === 'string')
        assert.strictEqual(ans, true)
    })
})


describe('POST requests', () => {
    test('a valid blog can be added (201)', async () => {
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
        assert.strictEqual(res.body.length, helper.blogDataset.length + 1)
    
        const titles = res.body.map(e => e.title)
        assert(titles.includes('Test Blog'))
    })
    
    test('a blog with missing url cannot be added (400)', async () => {
        const newBlog = {
            title: "Test Blog",
            author: 'Tester',
            likes: 3
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const res = await api.get('/api/blogs')
    
        assert.strictEqual(res.body.length, helper.blogDataset.length)
    })
    
    test('a blog with missing title cannot be added (400)', async () => {
        const newBlog = {
            author: 'Tester',
            url: 'helloworld.com',
            likes: 3
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            
        const res = await api.get('/api/blogs')
    
        assert.strictEqual(res.body.length, helper.blogDataset.length)
    })
    
    test('a blog without declared likes has 0 likes', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Tester',
            url: 'helloworld.com'
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const res = await api.get('/api/blogs')
        const ans = await res.body.filter(t => t.title === 'Test Blog')
        assert.strictEqual(ans.length, 1)
        assert.strictEqual(ans[0].likes, 0)
    })
})

describe('DELETE requests', () => {
    test('a blog can be deleted successfully (204)', async () => {
        const initialBlogs = await helper.blogsInDb()
        const blogToDelete = initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(b => b.title)

        assert.strictEqual(blogsAtEnd.length, helper.blogDataset.length - 1)
        assert(!titles.includes(blogToDelete.title))
    })
    
    test('a blog with an incorrect id cannot be deleted (400)', async () => {
        const initialBlogs = await helper.blogsInDb()
        const invalidId = await helper.nonExistingBlogId()

        await api
            .delete(`/api/blogs/${invalidId.id}`)
            .expect(404)
        
        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.blogDataset.length)
    })
})

describe('PUT requests', () => {
    test('all text fields of a blog can be updated successfully (204)', async () => {
        const initialBlogs = await helper.blogsInDb()
        const oldBlog = initialBlogs[0]
        const id = oldBlog.id
        const updBlog = {
            title: 'Updated title',
            author: 'Updated author',
            url: 'Updated url',
            likes: 100
        }

        await api
            .put(`/api/blogs/${oldBlog.id}`)
            .send(updBlog)
            .expect(204)
            
        const updDb = await helper.blogsInDb()

        assert.deepStrictEqual(oldBlog !== updBlog, true)
        assert.deepStrictEqual(updBlog.title, updDb[0].title)
    })

    test('a blog with invalid id cannot be updated (400)', async () => {
        const initialBlogs = await helper.blogsInDb()
        const invalidId = await helper.nonExistingBlogId()

        await api
            .put(`/api/blogs/${invalidId.id}`, {})
            .expect(404)
        
        const blogsAtEnd = await helper.blogsInDb()

        assert.deepStrictEqual(blogsAtEnd, initialBlogs)
    })
})


after(async () => {
    await mongoose.connection.close()
})