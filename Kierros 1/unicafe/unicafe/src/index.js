import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Average = (props) => {
  if (props.bad + props.neutral + props.good === 0) {
    return 0
  }
  else {
    return ((props.good - props.bad) / (props.bad + props.neutral + props.good))
  }
}

const Positive = (props) => {
  if (props.bad + props.neutral + props.good === 0) {
    return 0
  }
  else {
    return ((props.good) / (props.bad + props.neutral + props.good) * 100)
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      all {good + neutral + bad} <br></br>
      average <Average good = {good} bad = {bad} neutral = {neutral} /> <br></br>
      positive <Positive good = {good} bad = {bad} neutral = {neutral} /> %
    </div>
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)