import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Test whether function is called with correct parameters when creating blog', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler}/>
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(inputTitle, { 
    target: { value: 'Testiversion jännät tapahtumat' } 
  })

  fireEvent.change(inputAuthor, { 
    target: { value: 'Miikka Kirsilä' } 
  })

  fireEvent.change(inputUrl, { 
    target: { value: 'miikantoiminimi.com' } 
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls[0][0].title).toBe('Testiversion jännät tapahtumat')
  expect(mockHandler.mock.calls[0][0].author).toBe('Miikka Kirsilä')
  expect(mockHandler.mock.calls[0][0].url).toBe('miikantoiminimi.com')
  
})