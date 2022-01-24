const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  request.body.likes = request.body.likes ? request.body.likes : 0
  if (request.body.title === "" || request.body.url === "") {
    response.status(400).json({
      error: 'data missing'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog(request.body)
  blog.user = user
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
  
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (user.id.toString() === blog.user.toString()) {
    result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else response.status(401).json({ error: "Invalid user" })
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user
  }
  
  const result = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(result)
})

module.exports = blogsRouter