import { useSelector, useDispatch } from "react-redux"
import { addLike } from "../reducers/anecdoteReducer"
import { voteMessage, zeroNotification } from "../reducers/notificationReducer"

const AnecdotesList = () => {

  const dispatch = useDispatch()

  const vote = (anecdote, anecdotes) => {
    dispatch(addLike(anecdote.id, anecdotes))
    dispatch(voteMessage(anecdote.content))
    setTimeout(() => {
      dispatch(zeroNotification())
    }, 5000)
  }
  
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

  return (
  <div>
    {anecdotes.sort( (a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes 
        <button onClick={() => vote(anecdote, anecdotes)}>vote</button>
      </div>
    </div>
    )}
  </div>
  )
}

export default AnecdotesList