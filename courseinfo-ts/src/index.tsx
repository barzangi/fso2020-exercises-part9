import React from 'react'
import ReactDOM from 'react-dom'

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Content: React.FC<CoursePart[]> = (props): any => {

  // Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
  }
  // Does not compile! (TypeError: props.forEach is not a function)
  props.forEach(part => {
    switch (part.name) {
      case 'Fundamentals':
        return <p>{part.name} {part.exerciseCount} {part.description}</p>
      case 'Using props to pass data':
        return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
      case 'Deeper type usage':
        return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
      default:
        return assertNever(part)
    }
  })
}

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = (props) => {
  return <p>Number of execises {props.total}</p>
}

const App: React.FC = () => {
  const courseName = 'Half Stack Application Development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake.made-up-url.dev'
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