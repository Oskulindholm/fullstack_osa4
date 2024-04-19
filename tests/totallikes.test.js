const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Total likes', () => {
    const listWithOneBlog = [
    {
        title: "Balling in Bombay",
        author: "Bob Roberts",
        url: "http://ballinginbombay.now",
        likes: 5
    }]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    const emptyList = []

    test('of an empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes(emptyList), NaN)
    })

    const listWithPositiveLikes = [
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

    test('of a list with only positive likes', () => {
        const result = listHelper.totalLikes(listWithPositiveLikes)
        assert.strictEqual(result, 15)
    })

    const listWithNegativeLikes = [
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
            likes: -7
        },
        {
            title: "Balling in Bombay",
            author: "Bob Roberts",
            url: "http://ballinginbombay.now",
            likes: 5
        }]
    
        test('of a list with both positive and negative likes', () => {
            const result = listHelper.totalLikes(listWithNegativeLikes)
            assert.strictEqual(result, 1)
        })
})