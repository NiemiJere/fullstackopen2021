import React, { useState, useImperativeHandle } from 'react'

const BlogForm = React.forwardRef(({ createBlog }, ref) => {

  BlogForm.displayName = 'BlogForm'

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const toggleFields = () => {
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  useImperativeHandle(ref, () => {
    return {
      toggleFields
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <form onSubmit={addBlog} id='form'>
      <div>
        Title:
        <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
})

export default BlogForm