import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Before click title and author are visible', () => {
  const blog = {
    title: "Tämä on testi",
    author: "Jere Niemi",
    url: "www.trinode.fi",
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Tämä on testi'
  )

  expect(component.container).toHaveTextContent(
    'Jere Niemi'
  )

  expect(component.container).not.toHaveTextContent(
    'www.trinode.fi'
  )

  expect(component.container).not.toHaveTextContent(
    'likes 0'
  )
})

test('After click url and likes are visible', () => {
  const blog = {
    title: "Tämä on toinen testi",
    author: "Jere Niemenpoika",
    url: "www.korkeakouluun.com",
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )
  
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Tämä on toinen testi'
  )

  expect(component.container).toHaveTextContent(
    'Jere Niemenpoika'
  )

  expect(component.container).toHaveTextContent(
    'www.korkeakouluun.com'
  )

  expect(component.container).toHaveTextContent(
    'likes 1'
  )
})

test('If like button is clicked twice, function addLike is called twice', () => {

  const blog = {
    title: "Tämä on kolmas testi",
    author: "Jere Nieminen",
    url: "www.trinode.com",
    likes: 4
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler}/>
  )

  const openButton = component.getByText('view')
  fireEvent.click(openButton)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
