const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const adder =  (sum, b) => {
        return sum + b.likes
    }

    return blogs.length === 0
        ?   NaN
        :   blogs.reduce(adder, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(b => b.likes))
    const favorite = blogs.find(b => b.likes === maxLikes)

    return blogs.length === 0
        ?    NaN
        :    favorite
}

const mostBlogs = (blogs) => {
    const authors = blogs.reduce( (authors, b) => {
        if (authors[b.author]) {
            authors[b.author]++
        } else {
            authors[b.author] = 1
        }
        return authors
    }, {})

    const maxBlogs = Math.max(...Object.values(authors))
    const auth = Object.keys(authors).find(a => authors[a] === maxBlogs)

    return blogs.length === 0
        ?    NaN
        :    { author: auth, blogs: maxBlogs }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}