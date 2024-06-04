import { useState } from 'react'
import Form from './components/Form'
import List from './components/List'
import FilterField from './components/FilterField'
import _ from 'lodash'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if(newName === '' || newNumber === '') {
      alert('Please fill every field')
      return
    }

    if (persons.some((person) => 
      _.isEqual(person, {name: newName.trim(), number: newNumber.trim()}))) {
      alert(`${newName.trim()} is already on the list!`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
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
      />
    </div>
  )
}

export default App