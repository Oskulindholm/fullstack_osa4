const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('The favorite blog', () => {
    
    const emptyList = []

    test('of an empty list is NaN', () => {
        assert.strictEqual(listHelper.favoriteBlog(emptyList), NaN)
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
            title: "Balling in Bombay",
            author: "Bob Roberts",
            url: "http://ballinginbombay.now",
            likes: 5
        }
        const result = listHelper.favoriteBlog(listWithOneBlog)
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
        title: "Balling in Bombay",
        author: "Bob Roberts",
        url: "http://ballinginbombay.now",
        likes: 5
    }]
    
    test('of a list with several blogs is the one with the most likes', () => {
        const answer = {
            title: `Jane's smithereens`,
            author: 'Jane Smith',
            url: 'http://janesmithereens.sss',
            likes: 7
        }
        const result = listHelper.favoriteBlog(listWithSeveralBlogs)
        assert.deepStrictEqual(result, answer)
    })

    const listWithEqualLikes = [
    {
        title: `John's dull doughs`,
        author: 'John Doe',
        url: 'http://johndoe.ccc',
        likes: 5
    },
    {
        title: `Jane's smithereens`,
        author: 'Jane Smith',
        url: 'http://janesmithereens.sss',
        likes: 5
    },
    {
        title: "Balling in Bombay",
        author: "Bob Roberts",
        url: "http://ballinginbombay.now",
        likes: 5
    }]

    test('of a list of blogs with equal amounts of likes returns the first item', () => {
        const answer = {
            title: `John's dull doughs`,
            author: 'John Doe',
            url: 'http://johndoe.ccc',
            likes: 5
        }
        const result = listHelper.favoriteBlog(listWithEqualLikes)
        assert.deepStrictEqual(result, answer)
    })
})