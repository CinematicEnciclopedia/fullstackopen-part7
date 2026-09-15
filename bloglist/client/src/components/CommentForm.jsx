import { useState } from 'react'
import blogStore from '../stores/blogStore'

const CommentForm = ({ blog }) => {
  const addComment = blogStore((state) => state.addComment)
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = comment.trim()
    if (!trimmed) return
    await addComment(blog.id, trimmed)
    setComment('')
  }

  return (
    <div className="comments">
      <h3>comments</h3>
      <ul className="comment-list">
        {(blog.comments || []).map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          comment
          <input
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
