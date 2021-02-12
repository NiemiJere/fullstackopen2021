import React from 'react';

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((summa, tehtava) => {
      return summa + tehtava.exercises
      }, 0)
    return(
      <p><b>Total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    const result = course.parts.map(part =>
      <div key = {part.id}>
        {<Part part = {part} />}
      </div>
      )
    return result
  }

  export default Course