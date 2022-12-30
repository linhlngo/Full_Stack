import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import {Notification, ErrorNotification} from './components/Notification'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initiatePersons => {
        setPersons(initiatePersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const person = persons.find(person => person.name === newName)

      if (person) {
      const changedPerson = { ...person, number: newNumber }
      if ( window.confirm(`${newName} is already added to phonebook, replace the old name with a new on ? `)){
        personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== person.id).concat(returnedPerson))
      })
      }
    } 
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) 
        setNewName('')
        setNewNumber('')
        setAddMessage(`Add '${personObject.name}' `)
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
        })
      .catch(error => {
          // this is the way to access the error message
          setAddMessage(error.response.data.error)
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
    }
  }
      



  const removePerson = id => {
    const removedPerson = persons.find(p => p.id === id)
    const name = removedPerson.name
    const remainingPersons = persons.filter(person => person.id !== id)
    if (removedPerson) {
    if (window.confirm(` Delete ${removedPerson.name} ? `)){

    personService
      .remove(id)
      .then(removedPerson => {
        setPersons(remainingPersons)
        console.log(removedPerson)
        setErrorMessage(`Information of ${name} was already deleted from server `)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(
          `Information of '${removedPerson.name}' was already deleted from server`
        )
      })
    }
  }
}




  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    const search = event.target.value
    setNewSearch(search)
  }

  
  
  return (
    <div>
      <h1> Phonebook </h1>
      <Notification message={addMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter newSearch = {newSearch} 
              handleSearchChange = {handleSearchChange} />
      <h2>  add a new </h2>
      <PersonForm addPerson={addPerson} newName = {newName} handlePersonChange = {handlePersonChange} 
                  newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newSearch={newSearch} persons = {persons} removePerson = {removePerson}/>
    </div>
  )

}



export default App