import React, { useEffect, useState } from 'react'
import Form from './Form.js'
import Person from './Person.js'
import Sort from './Sort.js'
import axios from 'axios'
import personHandle from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newItem, setNewItem ] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [nameFind, setNameFind] = useState('')

  useEffect(() => {
    personHandle
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const addName = (event) => {
    event.preventDefault()
    if (newItem.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personHandle
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNewItem(newItem.concat(newName))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const [showAll, setShowAll] = useState(false)
  
  const handleSearch = (event) => {
    event.preventDefault()
    let list = []
    let i
    for (i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(event.target.value)) {
        setNameFind(event.target.value)
        list = list.concat(persons[i])
        // setPersons(persons.filter(x=>x.name.includes(event.target.value)))
      }
      else setNameFind(event.target.value)
    }
  }

    const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(nameFind.toLowerCase()))


      // if (newItem[i].toLowerCase.includes(nameFind.toLowerCase)) {
      //   setShowAll(persons[i])
      // }
      
  return (
    <div>
      <h2>Phonebook</h2>
      <Sort 
        nameFind = {nameFind}
        handleSearch = {handleSearch}/>
        <h2>Add a new</h2>
      <Form
        addName={addName} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person}/>
        )}
    </div>
  )

}

export default App