import React from 'react'

const Notification = ({ message }) => {
  console.log(message)
  if (message === null) {
    return null
  }
  else if (message.includes('Added') || (message.includes('Updated')) || (message.includes('cleared')) || (message.includes('added'))) {
    return (
      <div className = "success">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className = "error">
        {message}
      </div>
    )
  }
}

export default Notification