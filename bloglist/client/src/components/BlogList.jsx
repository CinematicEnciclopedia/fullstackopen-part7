import Blog from './Blog'
import blogStore from '../stores/blogStore'

const BlogList = () => {
  const blogs = blogStore((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <div className="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
