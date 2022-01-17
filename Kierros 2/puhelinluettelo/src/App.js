import React, { useEffect, useState } from 'react'
import Form from './Form.js'
import Person from './Person.js'
import Sort from './Sort.js'
import personHandle from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newItem, setNewItem ] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [nameFind, setNameFind] = useState('')
  const [errorMes, setErrorMes] = useState(null)

  useEffect(() => {
    personHandle
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const addName = (event) => {
    event.preventDefault()
    // if (newItem.includes(newName)) {
    //   setErrorMes(`${newName} is already added to phonebook`)
    //   setTimeout(() => {
    //     setErrorMes(null)
    //   }, 5000)
    // }
    let toggle = false
    let id = "" 

    persons.forEach(person => {
      if (person.name === newName) {
        toggle = true
        id = person.id
      }
    })
    
    if (toggle) {
     if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: id
      }
      personHandle
        .update(id, personObject)
        .then(response => {
          toggle = false
          setPersons(persons.map(person => person.name !== newName ? person : personObject))
          setNewItem(newItem.concat(newName))
          setErrorMes(`Updated ${personObject.name}`)
          setTimeout (() => {
            setErrorMes(null)
          }, 5000)
          })
      }
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
          setErrorMes(`Added ${personObject.name}`)
          setTimeout (() => {
            setErrorMes(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMes(`${error.response.data.error}`)
          setTimeout (() => {
            setErrorMes(null)
          }, 5000)
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

  const del = (person) => {
    personHandle
      .getAll()
      .then(response => {
        if (window.confirm(`Delete ${person.name}?`)) {
          personHandle
          .del(person.id)
          setPersons(persons.filter(p => p.id !== person.id))
          setErrorMes(`Deleted ${person.name}`)
          setTimeout (() => {
            setErrorMes(null)
          }, 5000)
        }
      })

    personHandle.getAll(response => console.log(response.data))
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
      <Notification message={errorMes}/>
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
        <Person key={person.name} person={person} remove={() => del(person)}/>
        )}
    </div>
  )

}

export default App