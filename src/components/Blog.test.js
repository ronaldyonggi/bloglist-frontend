import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'

describe('<Blog />', () => {

  // Declare variables before each test
  let blogObject
  let testUser
  let mockHandler
  let container

  beforeEach(() => {
    blogObject = {
      title: 'Testing blog title',
      author: 'Mr Jenkins',
      url: 'www.testingreact.io',
      likes: 37,
      user: {
        id: 1234
      }
    }

    testUser = {
      username: 'testUsername',
      name:'testName',
      password: 'lol',
      id: '1234'
    }

    mockHandler = jest.fn()
    container = render(<Blog blog={blogObject} user={testUser} handleDelete={mockHandler} handleLike={mockHandler}/>)

  })

  test('renders title and author but not URL and number of likes', () => {
    // render(<Blog blog={blogObject} user={testUser}/>)

    const title = screen.getByText('Testing blog title', { exact: false })
    const author = screen.getByText('Mr Jenkins', { exact: false })
    const url = screen.queryByText('www.testingreact.io', { exact:false })
    const likes = screen.queryByText('37', { exact:false })
    expect(title).toBeDefined
    expect(author).toBeDefined
    expect(url).toBeNull
    expect(likes).toBeNull

  })

  test('renders URL and number of likes if the view button is pressed', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const url = screen.queryByText('www.testingreact.io', { exact:false })
    const likes = screen.queryByText('37', { exact:false })
    expect(url).toBeDefined
    expect(likes).toBeDefined
  })
})