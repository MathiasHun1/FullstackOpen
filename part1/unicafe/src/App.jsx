import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  
  const all = good + neutral + bad

  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text={'good'} />
      <Button handleClick={addNeutral} text={'neutral'} />
      <Button handleClick={addBad} text={'bad'} />
      <h1>statistics</h1>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </>
  )
}

/// Button Component
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick} >{text}</button>
  )
}

///StatistiscLine Component
const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  )
}

/// Statistics Component
const Statistics = ({ all, good, bad, neutral }) => {
  const calcAverage = () => {
    const x = ((-1 * bad) + (1 * good)) / all
    return !isNaN(x) ? x : ''
  } 
  
  const calcPositive = () => {
    const x = good / all * 100
    return !isNaN(x) ? x : ''
  }

  if( all === 0) {
    return <h3>No feedback given</h3>
  }

  return (
    <table>
      <tr>
        <StatisticsLine text='good' value={good}/>
      </tr>
      <tr>
        <StatisticsLine text='neutral' value={neutral}/>
      </tr>
      <tr>
        <StatisticsLine text='bad' value={bad}/>
      </tr>
      <tr>
        <StatisticsLine text='all' value={all}/>
      </tr>
      <tr>
        <StatisticsLine text='average' value={calcAverage()}/>
      </tr>
      <tr>
        <StatisticsLine text='positive' value={calcPositive()}/>
      </tr>
    </table>
  )
}


export default App