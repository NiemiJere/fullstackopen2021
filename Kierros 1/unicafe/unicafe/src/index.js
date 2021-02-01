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
        <StatisticLine text = "good" value = {props.good} />
        <StatisticLine text = "neutral" value = {props.neutral} />
        <StatisticLine text = "bad" value = {props.bad} />
        <StatisticLine text = "all" value = {props.good + props.neutral + props.bad} />
        <StatisticLine text = "positive" value = {[props.good, props.neutral, props.bad]} />
        <StatisticLine text = "average" value = {[props.good, props.neutral, props.bad]} />
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

const StatisticLine = ({text, value}) => {
  if (text === "good" || text === "neutral" || text === "bad" || text === "all") {
    return (
      <div>
        {text} {value}
      </div>
      )
  }
  else if (text === "positive") {
    return (
      <div>
        {text} {<Positive good = {value[0]} neutral = {value[1]} bad = {value[2]} />} %
      </div>
    )
  }
  else {
    return (
      <div>
        {text} <Average good = {value[0]} neutral = {value[1]} bad = {value[2]} />
      </div>
    )
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
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)