import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'
import blogStore from '../stores/blogStore'

const BlogForm = () => {
  const addBlog = blogStore((state) => state.addBlog)
  const navigate = useNavigate()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('url', 'url')

  const { reset: resetTitle, ...titleInput } = title
  const { reset: resetAuthor, ...authorInput } = author
  const { reset: resetUrl, ...urlInput } = url

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addBlog({
        title: titleInput.value,
        author: authorInput.value,
        url: urlInput.value,
      })
      resetTitle()
      resetAuthor()
      resetUrl()
      navigate('/')
    } catch {
      // L'avís d'error ja el mostra el store; conservem els camps escrits.
    }
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input {...titleInput} required />
        </label>
        <label>
          author
          <input {...authorInput} />
        </label>
        <label>
          url
          <input {...urlInput} required />
        </label>
        <button type="submit" className="primary">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
