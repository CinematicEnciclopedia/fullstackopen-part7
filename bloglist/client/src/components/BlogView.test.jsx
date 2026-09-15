import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { beforeEach, vi } from 'vitest'
import BlogView from './BlogView'
import blogStore from '../stores/blogStore'
import userStore from '../stores/userStore'

const blog = {
  id: '1',
  title: 'Blog for view testing',
  author: 'Matti Luukkainen',
  url: 'https://example.com/view-test',
  likes: 5,
  comments: [],
  user: { id: 'creator-id', username: 'creator', name: 'Creator Name' },
}

const updateBlogMock = vi.fn().mockResolvedValue({})
const removeBlogMock = vi.fn().mockResolvedValue({})

const renderBlogView = (user) => {
  blogStore.setState({
    blogs: [blog],
    updateBlog: updateBlogMock,
    removeBlog: removeBlogMock,
    addComment: vi.fn().mockResolvedValue({}),
  })
  userStore.setState({ user })

  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </MemoryRouter>
  )
}

beforeEach(() => {
  updateBlogMock.mockClear()
  removeBlogMock.mockClear()
})

describe('<BlogView />', () => {
  test('unauthenticated user sees the blog info and likes, but no buttons', () => {
    renderBlogView(null)

    expect(screen.getByText('Blog for view testing', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('https://example.com/view-test')).toBeInTheDocument()
    expect(screen.getByText(/likes 5/)).toBeInTheDocument()
    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('authenticated non-creator sees only the like button', () => {
    renderBlogView({ id: 'other-id', username: 'other', name: 'Other User' })

    expect(screen.getByText(/likes 5/)).toBeInTheDocument()
    expect(screen.getByText('like')).toBeInTheDocument()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('the creator also sees the delete button', () => {
    renderBlogView({ id: 'creator-id', username: 'creator', name: 'Creator Name' })

    expect(screen.getByText('like')).toBeInTheDocument()
    expect(screen.getByText('remove')).toBeInTheDocument()
  })

  test('clicking the like button twice calls the update handler twice', async () => {
    renderBlogView({ id: 'other-id', username: 'other', name: 'Other User' })

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogMock.mock.calls).toHaveLength(2)
  })
})
