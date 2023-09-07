import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'

describe('<Blog />', () => {

  test('renders title and author but not URL and number of likes', () => {
    const blogObject = {
      title: 'Testing blog title',
      author: 'Mr Jenkins',
      url: 'www.testingreact.io',
      likes: 37,
      user: {
        id: 1234
      }
    }

    const testUser = {
      username: 'testUsername',
      name:'testName',
      password: 'lol',
      id: '1234'
    }

    render(<Blog blog={blogObject} user={testUser}/>)

    const title = screen.getByText('Testing blog title', { exact: false })
    const author = screen.getByText('Mr Jenkins', { exact: false })
    const url = screen.queryByText('www.testingreact.io', { exact:false })
    const likes = screen.queryByText('37', { exact:false })
    expect(title).toBeDefined
    expect(author).toBeDefined
    expect(url).toBeNull
    expect(likes).toBeNull

  })
})