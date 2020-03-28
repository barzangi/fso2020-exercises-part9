import React from 'react'
import ReactDOM from 'react-dom'

interface HeaderProps {
  name: string;
}

interface CoursePartProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  total: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>
}

const Content: React.FC<CoursePartProps[]> = (props) => {
  return (
    <div>
      <p>{props[0].name} {props[0].exerciseCount}</p>
      <p>{props[1].name} {props[1].exerciseCount}</p>
      <p>{props[2].name} {props[2].exerciseCount}</p>
    </div>  
  )
}

const Total: React.FC<TotalProps> = (props) => {
  return <p>Number of execises {props.total}</p>
}

const App: React.FC = () => {
  const courseName = 'Half Stack Application Development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ]

  const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header name={courseName} />
      <Content {...courseParts} />
      <Total total={totalExercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))