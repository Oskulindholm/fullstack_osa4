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

module.exports = {
    dummy,
    totalLikes
}