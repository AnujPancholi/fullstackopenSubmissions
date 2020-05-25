import React,{useState} from 'react';
import logo from './logo.svg';
// import './App.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const AnecdoteDisplay = ({anecdote}) => {
  return (<React.Fragment>
    <p>
      {anecdote}
    </p>
  </React.Fragment>)
}

const Button = ({label,handleClick}) => {
  return (<React.Fragment>
    <button onClick={handleClick}>
      {label}
    </button>
  </React.Fragment>)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const setRandomIndexInState = () => {
    const randomIndex = parseInt(Math.random()*Math.pow(10,5))%anecdotes.length;
    console.log(randomIndex);
    setSelected(randomIndex);
  }

  return (
    <div>
      <AnecdoteDisplay anecdote={anecdotes[selected]} />
      <Button label="Change" handleClick={setRandomIndexInState} />
    </div>
  )
}


export default App;
