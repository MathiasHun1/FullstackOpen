const dummy = (blogs) => {
  if(Array.isArray(blogs)) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const reducer = (total, obj) => {
    return total + obj.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (blog, currentBlog) => {
    if(currentBlog.likes > blog.likes) {
      return currentBlog
    } else {
      return blog
    }
  }

  const {author, likes, title} = blogs.reduce(reducer)

  return { author, likes, title }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}