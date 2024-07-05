import { useEffect, useState } from 'react'
import Form from './components/Form'
import List from './components/List'
import FilterField from './components/FilterField'
import Notification from './components/Notification'
import _ from 'lodash'
import services from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    console.log('success')
    
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.log(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  //Check if the person is already on the list
    if (persons.some((person) => 
      person.name.trim() === newName.trim() && person.number.trim() === newNumber.trim())) {
      alert(`${newName.trim()} is already on the list!`)
      } 
  // Update the persons number
      else if(persons.some((person) => 
        person.name.trim() === newName.trim() && person.number.trim() !== newNumber.trim())) {
          if(window.confirm(`${newName.trim()} is already in the phonebook, do you want to update the number?`)) {
            const personToUpdate = persons.find(person => person.name.trim() === newName.trim())
            const updatedPerson = {...personToUpdate, number: newNumber}
            services
              .update(updatedPerson.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
                setSuccessMessage(`${returnedPerson.name}'s number update succesful!`)
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 5000)
              })
              .catch(error => {
                console.log('fail')
                setErrorMessage(`${updatedPerson.name} has already deleted from the database!`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== updatedPerson.id))
              })

          }
      } // Add a new peron to the list
        else {
        const createdPerson = {name: newName, number: newNumber}
        services
          .create(createdPerson)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setSuccessMessage(`${newPerson.name} addedd succesfully`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
            
        setNewName('')
        setNewNumber('')
    }
  }
  // Delete person
  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      services
        .removePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        errorMessage={errorMessage} 
        successMessage={successMessage}
      />
      <FilterField 
        setFilterText={setFilterText} 
        filterText={filterText}
      />
      <h2>Add a new</h2>
      <Form 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <List 
        persons={persons} 
        filterText={filterText}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App