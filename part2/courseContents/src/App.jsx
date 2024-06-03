import Course from "./components/Course"


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    courses.map((course) => (
      <Course key={course.id} course={course} />
    ))
  )
}


const Content = ({ parts }) => {
  return (
    parts.map((part) => (<Part key={part.id} part={part.name} exercises={part.exercises} />))
  )
}


const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}


const Total = ({ course }) => {
  const total = course.parts.reduce((acc, item) => {return acc + item.exercises}, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}


const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default App
export { Content, Header, Total }