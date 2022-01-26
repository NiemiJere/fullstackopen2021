import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.id ? anecdote : action.data)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
  default: 
    return state
  }
}

export const addLike = (id, anecdotes) => {

  const anecdoteToChange = anecdotes.find(n => n.id === id)
  const changedAnecdote = { 
    ...anecdoteToChange, 
    votes: anecdoteToChange.votes + 1
  }

  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
      id: anecdoteToChange.id
    })
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAncecdote = await anecdoteService.createNew(content)
    console.log(newAncecdote)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAncecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer