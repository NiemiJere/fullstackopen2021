import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  //console.log(points)
  const [copy, setCopy] = useState(new Array(props.anecdotes.length).fill(0))
  return (
    <div>
      {props.anecdotes[selected]} <br></br>
      has {copy[selected]} votes <br></br>
      <Button text="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}/>
      <Button text="vote" onClick={() => {
        let palautusarvo = [...copy]
        palautusarvo[selected] += 1
        setCopy(palautusarvo)
       }
      }  
      />
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)