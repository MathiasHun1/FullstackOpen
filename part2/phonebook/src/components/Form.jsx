
const Form = ({ handleSubmit, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
      </div>
      <div>number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form