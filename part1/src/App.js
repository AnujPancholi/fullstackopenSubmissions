import React from 'react';
import {
  Content,
  Header,
  Total
} from './components/index.js';



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [{
    name: part1,
    exerciseCount: exercises1
  },{
    name: part2,
    exerciseCount: exercises2
  },{
    name: part3,
    exerciseCount: exercises3
  }];

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}


export default App;