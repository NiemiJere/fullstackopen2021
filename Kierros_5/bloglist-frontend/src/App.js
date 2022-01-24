import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const blogFunctionsRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogFunctionsRef.current.toggleFields()

    if (!blogObject.title || !blogObject.url || !blogObject.author ) {
      setErrorMessage('Some of the fields are empty! Save was not completed!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    const added = await blogService.create(blogObject)
    setBlogs(blogs.concat(added))
    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    const updatedObject = {
      title: blogObject.title,
      url: blogObject.url,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      user: blogObject.user.id
    }

    await blogService.update(blogObject.id, updatedObject)

    const updatedBlogs = blogs.map(item => {
      if (item.id === blogObject.id) {
        item.likes = updatedObject.likes
        return (item)
      }
      else {
        return (item)
      }
    })
    setBlogs(updatedBlogs)
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} ref={blogFunctionsRef} />
    </Togglable>
  )

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setErrorMessage('Password or username is wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = () => {
    window.localStorage.clear()
    setErrorMessage(`${user.name} logged out`)
    setUser(null)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleBlogDelete = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.remove(blogObject.id)
      const updatedBlogs = blogs.filter(item => item.id !== blogObject.id)
      setBlogs(updatedBlogs)
    }
  }

  return (
    <div>

      {errorMessage &&
        <Notification message={errorMessage}/>
      }

      {user === null && loginForm()}

      {user !== null &&
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={handleDelete}>Log out</button>
          </div>
          {blogForm()}
          {blogs.sort( (a, b) => b.likes - a.likes ).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={updateBlog} deleteBlog={handleBlogDelete} user={user}/>
          )}
        </>
      }
    </div>
  )
}

export default App