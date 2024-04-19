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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}