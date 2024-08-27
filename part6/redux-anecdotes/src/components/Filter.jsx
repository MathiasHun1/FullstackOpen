import { useDispatch } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const text = e.target.value || ''
    dispatch(filterAnecdotes(text))
  }

  return (
    <label>
      filter 
      <input 
        style={{ marginBottom: '10px' }}
        type="text"
        onChange={handleChange}
      />
    </label>
  )
}

export default Filter