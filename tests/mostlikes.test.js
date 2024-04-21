const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('The author with most likes', () => {
    
    const emptyList = []

    test('of an empty list is NaN', () => {
        assert.strictEqual(listHelper.mostLikes(emptyList), NaN)
    })

    const listWithOneBlog = [
    {
        title: 'Balling in Bombay',
        author: 'Bob Roberts',
        url: "http://ballinginbombay.now",
        likes: 5
    }]

    test('when list has only one blog equals that', () => {
        const answer = {
            author: "Bob Roberts",
            likes: 5
        }
        const result = listHelper.mostLikes(listWithOneBlog)
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
            title: "Doughing in Bombay",
            author: 'John Doe',
            url: "http://johninbombay.now",
            likes: 5
        }]
        
        test('of a list with several blogs is the one with the highest sum of likes', () => {
            const answer = {
                author: 'John Doe',
                likes: 8
            }
            const result = listHelper.mostLikes(listWithSeveralBlogs)
            assert.deepStrictEqual(result, answer)
        })

        const listWithEqualLikes = [
        {
            title: `Jane's smithereens`,
            author: 'Jane Smith',
            url: 'http://janesmithereens.sss',
            likes: 3
        },
        {
            title: `John's dull doughs`,
            author: 'John Doe',
            url: 'http://johndoe.ccc',
            likes: 4
        },
        
        {
            title: `Jane's jukebox`,
            author: 'Jane Smith',
            url: 'http://jjukebox.box',
            likes: 7
        },
        {
            title: "Doughing in Bombay",
            author: 'John Doe',
            url: "http://johninbombay.now",
            likes: 6
        }]
        
        test('of a list with authors with equal amount likes returns the first item', () => {
            const answer = {
                author: 'Jane Smith',
                likes: 10
            }
            const result = listHelper.mostLikes(listWithEqualLikes)
            assert.deepStrictEqual(result, answer)
        })
})