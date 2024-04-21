const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('The author with most blogs', () => {
    
    const emptyList = []

    test('of an empty list is NaN', () => {
        assert.strictEqual(listHelper.mostBlogs(emptyList), NaN)
    })

    const listWithOneBlog = [
    {
        title: "Balling in Bombay",
        author: "Bob Roberts",
        url: "http://ballinginbombay.now",
        likes: 5
    }]

    test('when list has only one blog equals that', () => {
        const answer = {
            author: "Bob Roberts",
            blogs: 1
        }
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, answer)
    })

    const listWithSeveralBlogs = [
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
    },
    {
        title: "Balling in Johnbay",
        author: "John Doe",
        url: "http://ballinginjohnbay.now",
        likes: 5
    }]
    
    test('of a list with several blogs', () => {
        const answer = {
            author: 'John Doe',
            blogs: 2
        }
        const result = listHelper.mostBlogs(listWithSeveralBlogs)
        assert.deepStrictEqual(result, answer)
    })

    const listWithEqualBlogs = [
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
    },
    {
        title: "Balling in Bombay",
        author: "Bob Roberts",
        url: "http://ballinginbombay.now",
        likes: 5
    }]

    test('of a list of authors with equal amounts of blogs returns the first item', () => {
        const answer = {
            author: 'John Doe',
            blogs: 1
        }
        const result = listHelper.mostBlogs(listWithEqualBlogs)
        assert.deepStrictEqual(result, answer)
    })
})