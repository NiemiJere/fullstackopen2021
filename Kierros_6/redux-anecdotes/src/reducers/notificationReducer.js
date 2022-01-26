const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      const showState = {
        message: action.message,
        type: 'VOTE'
      }
      return showState  
    case 'ADD': 
      const addState = {
        message: action.message,
        type: 'ADD'
      }
      return addState 
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

const initialState = {
  message: null,
  type: null
}
  
export const voteMessage = message => {
  return {
    type: 'SHOW',
    message,
  }
}

export const createMessage = message => {
  return {
    type: 'ADD',
    message
  }
}

export const zeroNotification = () => {
  return {
    type: 'ZERO'
  }
}

export default notificationReducer