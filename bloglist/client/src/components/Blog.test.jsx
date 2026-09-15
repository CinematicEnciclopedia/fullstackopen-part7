import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

const blog = {
  id: '1',
  title: 'Component testing is done with react-testing-library',
  author: 'Matti Luukkainen',
  url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
  likes: 7,
  user: { username: 'daniel', name: 'Daniel Arenas Sedano', id: 'abc123' },
}

describe('<Blog />', () => {
  test('renders title as a link and author, but not url or likes', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: blog.title })).toBeInTheDocument()
    expect(screen.getByText('Matti Luukkainen', { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(/likes/)).toBeNull()
  })
})
