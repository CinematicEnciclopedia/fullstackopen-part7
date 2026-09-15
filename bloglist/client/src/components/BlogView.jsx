import { useNavigate, useParams } from 'react-router-dom'
import blogStore from '../stores/blogStore'
import userStore from '../stores/userStore'
import CommentForm from './CommentForm'
import NotFound from './NotFound'

const BlogView = () => {
  const id = useParams().id
  const navigate = useNavigate()
  const blog = blogStore((state) => state.blogs.find((b) => b.id === id))
  const user = userStore((state) => state.user)
  const updateBlog = blogStore((state) => state.updateBlog)
  const removeBlog = blogStore((state) => state.removeBlog)

  if (!blog) {
    return <NotFound />
  }

  const handleLike = () => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
      navigate('/')
    }
  }

  // Intentionally NO null check on blog.user.name: a blog whose user reference is
  // missing crashes the render and trips the ErrorBoundary (see bloglist-tests).
  const blogOwnerId = blog.user?.id ?? blog.user
  const showDelete = Boolean(user && blogOwnerId && user.id.toString() === blogOwnerId.toString())

  return (
    <div className="blog-details">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div className="meta">
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className="meta">likes {blog.likes}</div>
      <div className="meta">added by {blog.user.name}</div>
      <div className="actions">
        {user && (
          <button type="button" className="primary" onClick={handleLike}>
            like
          </button>
        )}
        {showDelete && (
          <button type="button" className="danger" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
      <CommentForm blog={blog} />
    </div>
  )
}

export default BlogView
