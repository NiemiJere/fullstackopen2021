const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.text  
    default:
      return state
  }
}
  
const initialState = ''

export const setFilter = text => {
  return {
      type: 'FILTER',
      text,
  }
}

export default filterReducer