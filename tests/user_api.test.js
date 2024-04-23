const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    let userObj = new User(helper.userDataset[0])
    await userObj.save()
    userObj = new User(helper.userDataset[1])
    await userObj.save()
    userObj = new User(helper.userDataset[2])
    await userObj.save()
})

describe('GET requests', () => {
    test('users are returned in JSON format', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const res = await api.get('/api/users')
        assert.strictEqual(res.body.length, 3)
    })
})

describe('POST requests', () => {
    test('a valid user can be added (201)', async () => {
        const newUser = {
            username: 'Morrig4n',
            name: 'Marilyn',
            password: '11223344'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const res = await api.get('/api/users')
        assert.strictEqual(res.body.length, helper.userDataset.length + 1)
    
        const usernames = res.body.map(e => e.username)
        assert(usernames.includes(newUser.username))
    })

    test('a user with missing username cannot be added (400)', async () => {
        const newUser = {
            username: '',
            name: 'Leroy Jenkins',
            password: 'geronimo'
        }
    
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await api.get('/api/users')
        assert(res.body.error.includes('username is too short or missing'))
    
        assert.strictEqual(usersAtEnd.body.length, helper.userDataset.length)
    })

    test('a user with a too short password cannot be added (400)', async () => {
        const newUser = {
            username: 'yourAverageHabboHotelGuest',
            name: 'Ashley',
            password: 'a'
        }
    
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await api.get('/api/users')
        assert(res.body.error.includes('password is too short or missing'))
    
        assert.strictEqual(usersAtEnd.body.length, helper.userDataset.length)
    })

    test('a user with an already existing username cannot be added (400)', async () => {
        const newUser = {
            username: 'JeeperCreeper',
            name: 'Janette',
            password: 'muahahaha'
        }
    
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await api.get('/api/users')
        assert(res.body.error.includes('username is not unique'))
    
        assert.strictEqual(usersAtEnd.body.length, helper.userDataset.length)
    })
})


after(async () => {
    await mongoose.connection.close()
})