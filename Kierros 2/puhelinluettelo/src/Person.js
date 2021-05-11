import React from 'react'
import personHandle from './services/persons'

const Person = ({ person, remove }) => {      
    return (
        <div>
            {person.name} {person.number} <button onClick = {remove}>Delete</button>
        </div>
    )
}

export default Person