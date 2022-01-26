
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const checkContent = (notification) => {
    return (notification.type === 'ADD' ? `You added '${notification.message}'` : `You voted: '${notification.message}'`)
  }

  return (
    <>
      {notification.message &&
        <div style={style}>
          {checkContent(notification)}
        </div>
      }
    </>
  )
}

export default Notification