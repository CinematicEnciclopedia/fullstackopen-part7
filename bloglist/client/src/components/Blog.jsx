import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <div className="blog">
    <div>
      <Link to={`/blogs/${blog.id}`} className="blog-title">
        {blog.title}
      </Link>{' '}
      <span className="blog-author">{blog.author}</span>
    </div>
  </div>
)

export default Blog
