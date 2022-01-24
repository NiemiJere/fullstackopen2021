const { describe } = require('eslint/lib/rule-tester/rule-tester')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id instead of _id', async () => {
  const blogs = await Blog.find({})
  blogs.forEach(element => {
      expect(element.id).toBeDefined()
  });
})
  
test('a valid blog can be added ', async () => {
  const initialBlogs = await Blog.find({})
  const newBlog = {
      "title": "Kallen kummalliset kemut",
      "author": "Kalle Kustaa Kolmas",
      "url": "www.trinode.fi",
      "likes": 343
  }
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('Kallen kummalliset kemut')
})

test('if likes is not given, it is 0 in the database', async () => {
const newBlog = {
    "title": "Kallen kummalliset kemut",
    "author": "Kalle Kustaa Kolmas",
    "url": "www.trinode.fi",
    "likes": ""
}
await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

const blogs = await Blog.find({})
expect(blogs[blogs.length - 1].likes).toBe(0)
})

describe('empty fields', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('if title is empty, status should be 400', async () => {
    const newBlog = {
        "title": "",
        "author": "Kalle Kustaa Kolmas",
        "url": "www.trinode.fi",
        "likes": 12312
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    }
  )

  test('if url is empty, status should be 400', async () => {
    const newBlog = {
        "title": "Kallen hassut kemut",
        "author": "Kalle Kustaa Kolmas",
        "url": "",
        "likes": 12312
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    }
  )

  test('if url and title are empty, status should be 400', async () => {
    const newBlog = {
        "title": "",
        "author": "Kalle Kustaa Kolmas",
        "url": "",
        "likes": 12312
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    }
  )
})

afterAll(() => {
  mongoose.connection.close()
})