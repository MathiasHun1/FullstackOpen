import { Header, Content, Total } from "../App"

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts}/>
      <Total course={course} />
    </>
  )
}

export default Course