import notificationStore from '../stores/notificationStore'

const Notification = () => {
  const notification = notificationStore((state) => state.notification)

  if (notification === null) return null

  return (
    <div className={`notification ${notification.type}`} role="status">
      {notification.message}
    </div>
  )
}

export default Notification
