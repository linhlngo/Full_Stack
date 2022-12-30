
  const Header = ({name}) => <h2> {name}</h2>
  
  const Part = ({name, exercises}) => <p> {name} {exercises} </p>

  const Total = ({parts}) => {
    return (
      <div>
        <p> total of {parts.map(part => part.exercises).reduce((s,p) => s + p)} exercises</p>
      </div>
    )
  }

  const Content = ({parts}) => {
    return (
    <div>
          {parts.map(part => <Part name={part.name} exercises = {part.exercises} />)}
      
    </div>
)
    
  }
  
const Course = ({course}) => {
        return (
        <>
        <Header name = {course.name} />
        <Content  parts = {course.parts} />
        <Total  parts = {course.parts} />

        </>
      )
  }

  export default Course
