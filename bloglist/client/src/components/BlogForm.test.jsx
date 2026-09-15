import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { beforeEach, test, vi } from 'vitest'
import BlogForm from './BlogForm'
import blogStore from '../stores/blogStore'

const addBlogMock = vi.fn().mockResolvedValue({})

beforeEach(() => {
  addBlogMock.mockClear()
  blogStore.setState({ addBlog: addBlogMock })
})

test('<BlogForm /> creates a new blog with the right details', async () => {
  render(
    <MemoryRouter>
      <BlogForm />
    </MemoryRouter>
  )

  const user = userEvent.setup()

  await user.type(screen.getByLabelText('title'), 'testing a form...')
  await user.type(screen.getByLabelText('author'), 'Samantha')
  await user.type(screen.getByLabelText('url'), 'https://example.com/test')

  await user.click(screen.getByText('create'))

  expect(addBlogMock.mock.calls).toHaveLength(1)
  expect(addBlogMock.mock.calls[0][0]).toEqual({
    title: 'testing a form...',
    author: 'Samantha',
    url: 'https://example.com/test',
  })
})
