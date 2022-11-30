
  const Header = (props) => {
    return (
        <h1> {props.course}</h1>
    )
  }

  const Total = (props) => {
    return (
        <p> Number of exercises {props.course1 + props.course2 + props.course3}</p>
    )
  }

  const Part = (props) => {
    return (
      <p> {props.part} {props.exercise} </p>
  )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part = {props.part1} exercise = {props.exercises1} />
        <Part part = {props.part2} exercise = {props.exercises2}/>
        <Part part = {props.part3} exercise = {props.exercises3}/>
      </div>
    )
  }


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }



  return (
    <div>
      <Header course={course} />
      <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises} />
      <Total  course1 = {part1.exercises} course2 = {part2.exercises} course3 = {part3.exercises} />
    </div>
  )
}



export default App