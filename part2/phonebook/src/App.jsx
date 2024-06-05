import { useEffect, useState } from 'react'
import Form from './components/Form'
import List from './components/List'
import FilterField from './components/FilterField'
import _ from 'lodash'
import services from './services/people'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const baseUrl = 'http://localhost:3001/peoples'

  useEffect(() => {
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  // Alert if not every field is filled 
    if(newName === '' || newNumber === '') {
      alert('Please fill every field')
      return
    }
  //Check if the person is already on the list
    if (persons.some((person) => 
      person.name.trim() === newName.trim() && person.number.trim() === newNumber.trim())) {
      alert(`${newName.trim()} is already on the list!`)
      } else if(persons.some((person) => 
        person.name.trim() === newName.trim() && person.number.trim() !== newNumber.trim())) {
          if(window.confirm(`${newName.trim()} is already in the phonebook, do you want to update the number?`)) {
            const personToUpdate = persons.find(person => person.name.trim() === newName.trim())
            const updatedPerson = {...personToUpdate, number: newNumber}
            console.log(updatedPerson.id)
            services
              .update(updatedPerson.id, updatedPerson)
              .then(returnesPerson => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnesPerson)) )

          }
      } else {
        const createdPerson = {name: newName, number: newNumber}
        services
          .create(createdPerson)
          .then(newPerson => setPersons(persons.concat(newPerson)))
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