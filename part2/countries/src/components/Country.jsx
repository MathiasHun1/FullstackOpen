import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
const key = import.meta.env.VITE_WEATHER_KEY

const Country = ({ data }) => {
  const [weather, setWeather] = useState('')
  useEffect(() => {
    getWeather()
  }, [])

  const languages = []

  for (let key in data.languages) {
    languages.push(data.languages[key])
  }

  const getWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=${key}`)
      .then(response => 
        setWeather(response.data.main.temp)) 
  }
  
  return (
   <div>
      <h1>{data.name.common}</h1>
      <p>capital: {data.capital}</p>
      <p>area: {data.area}</p>
      <h4>languages:</h4>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p style={{fontSize: 100}} >{data.flag}</p>
      <h3>weather: {weather} F</h3>
   </div>
  )
}

export default Country