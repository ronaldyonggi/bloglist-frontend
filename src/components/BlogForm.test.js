import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'

describe('<BlogForm />', () => {

  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = jest.fn()

    const user = userEvent.setup()

    render(<BlogForm createBlog={mockHandler} />)

    const submitButton = screen.getByText('create')

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    await user.type(titleInput, 'this is the title')
    await user.type(authorInput, 'Kevin H')
    await user.type(urlInput, 'www.somerandomblog.io')

    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('this is the title')
    expect(mockHandler.mock.calls[0][0].author).toBe('Kevin H')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.somerandomblog.io')

  })
})