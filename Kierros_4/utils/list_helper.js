const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
      likes += element.likes
    })
    return likes
  }

  const favouriteBlog = (blogs) => {
    let mostLikedIndex = 0
    let i = 0
    let mostLikedAmount = 0
    blogs.forEach(element => {
      if (element.likes >= mostLikedAmount) {
        mostLikedIndex = i
        mostLikedAmount = element.likes
      }
      i += 1
    })
    return blogs.length !== 0 ? blogs[mostLikedIndex] : null
  }

  const mostBlogs = (blogs) => {
    let writers = []
    let checked = []
    let writersWithBlogs = []

    blogs.forEach(element => {
      writers = writers.concat(element.author)
    })

    writers.forEach(element => {
      if (!checked.includes(element)) {
        let localAmount = 0
        writers.forEach(i => {
          if (i === element) {
            localAmount += 1
          }
        })
        let addElement = [element, localAmount]
        writersWithBlogs = writersWithBlogs.concat([addElement])
        checked = checked.concat(element)
      }
    })

    let mostBlogsIndex = 0
    let i = 0
    let mostBlogsAmount = 0

    writersWithBlogs.forEach(element => {
      if (element[1] >= mostBlogsAmount) {
        mostBlogsIndex = i
        mostBlogsAmount = element[1]
      }
      i += 1
    })

    let rtrnItem = blogs.length === 0 ? null : {
      author: writersWithBlogs[mostBlogsIndex][0],
      blogs: writersWithBlogs[mostBlogsIndex][1]
    }

    return (rtrnItem)
  }

  const mostLikes = (blogs) => {
    let writers = []
    let likes = []
    let checked = []
    let writersWithBlogs = []

    blogs.forEach(element => {
      writers = writers.concat(element.author)
      likes = likes.concat(element.likes)
    })

    writers.forEach(element => {
      if (!checked.includes(element)) {
        let localAmount = 0
        let index = 0
        writers.forEach(i => {
          if (i === element) {
            localAmount += likes[index]
          }
          index += 1
        })
        let addElement = [element, localAmount]
        writersWithBlogs = writersWithBlogs.concat([addElement])
        checked = checked.concat(element)
      }
    })

    let mostBlogsIndex = 0
    let i = 0
    let mostBlogsAmount = 0

    writersWithBlogs.forEach(element => {
      if (element[1] >= mostBlogsAmount) {
        mostBlogsIndex = i
        mostBlogsAmount = element[1]
      }
      i += 1
    })

    let rtrnItem = blogs.length === 0 ? null : {
      author: writersWithBlogs[mostBlogsIndex][0],
      likes: writersWithBlogs[mostBlogsIndex][1]
    }
    
    return (rtrnItem)
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }