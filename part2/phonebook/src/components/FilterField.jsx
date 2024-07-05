
const FilterField = ({ filterText, setFilterText }) => {
  return (
    <div>filter shown with: 
      <input type='text' onChange={(e) => setFilterText(e.target.value)} value={filterText}/>
    </div>
  )
}

export default FilterField