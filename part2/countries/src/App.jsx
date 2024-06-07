import { useState, useEffect } from "react"
import Country from "./components/Country"
import axios from 'axios'
import _ from 'lodash'

function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [text, setText] = useState('')
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    const request = axios.get(baseUrl)
      request.then(response => {
        setCountries(response.data)
    })
  },[])

  useEffect(() => {
    if(countries) {
      setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(text)))
    }
  }, [text])

  const handleClick = (country) => {
    setFilteredCountries([country])
  }
  return (
    <>
      <p>Find Countries <input value={text} onChange={((e) => setText(e.target.value))} /></p>

      {filteredCountries && filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries 
      && 1 < filteredCountries.length <= 10 
      && filteredCountries.map(country => (
          <p key={country.name.common}>{country.name.common} 
          <button onClick={() => handleClick(country)} >show</button></p>
      ))}

      {filteredCountries && filteredCountries.length === 1 && (
        <Country 
          data={filteredCountries[0]}/>
      )}
    </>
  )
}

export default App
