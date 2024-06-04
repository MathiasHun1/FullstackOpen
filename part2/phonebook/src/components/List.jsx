
const List = ({ persons, filterText }) => {
  return (
    <>
      <h2>Numbers</h2>
      {!filterText && persons.map((person) => 
      <p key={person.name} >
        {person.name} {person.number}
      </p>)}
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