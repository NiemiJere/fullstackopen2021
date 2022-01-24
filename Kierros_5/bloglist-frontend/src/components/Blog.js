import { useState, useEffect } from 'react'
import React from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {

  const [showAll, setShowAll] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.username === blog.user.username) {
        setIsOwn(true)
      }
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    borderColor: 'red',
    marginLeft: '10px',
    borderRadius: '5px'
  }

  const handleShow = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
    setButtonText(!showAll ? 'hide' : 'view')
  }

  const handleLike = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  const handleBlogDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {showAll ?
          <>
            <p>url: {blog.title}</p>
            <p>url: {blog.url}</p>
            <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
            <p>author: {blog.author}</p>
          </>
          :
          <>
            {blog.title} {blog.author}
          </>
        }
      </div>
      <button onClick={handleShow}>{buttonText}</button>
      {isOwn &&
        <button style={deleteButtonStyle} onClick={handleBlogDelete}>Delete</button>
      }
    </div>
  )
}

export default Blog