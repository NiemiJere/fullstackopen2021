import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad > 0) {
    return (
      <div>
        good {props.good} <br></br>
        neutral {props.neutral} <br></br>
        bad {props.bad} <br></br>
        all {props.good + props.neutral + props.bad} <br></br>
        average <Average good = {props.good} bad = {props.bad} neutral = {props.neutral} /> <br></br>
        positive <Positive good = {props.good} bad = {props.bad} neutral = {props.neutral} /> %
      </div>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }    
}
const Average = (props) => {
  return ((props.good - props.bad) / (props.bad + props.neutral + props.good))
}


const Positive = (props) => {
  return ((props.good) / (props.bad + props.neutral + props.good) * 100)
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
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)