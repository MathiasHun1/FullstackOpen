import Person from "./Person"

const List = ({ persons, filterText, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {!filterText && persons.map((person) => 
        <Person key={person.name} person={person} handleDelete={handleDelete}/>
    )}
      {filterText && persons.map((person) => (
        person.name.toLowerCase().includes(filterText.toLocaleLowerCase()) 
        ? <p key={person.name}>
            {person.name} {person.number}
          </p>
        : null
      ))}
    </>
  )
}

export default List