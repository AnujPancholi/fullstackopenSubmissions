import React,{useState} from 'react';
import logo from './logo.svg';
import {
  Button,
  AnecdotesDisplay
} from './components/index.js';

const anecdotes = [{
    text: 'If it hurts, do it more often',
    // voteCount: 0
  },{
    text: 'Adding manpower to a late software project makes it later!',
    // voteCount: 0
  },{
    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    // voteCount: 0
  },{
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    // voteCount: 0
  },{
    text: 'Premature optimization is the root of all evil.',
    // voteCount: 0
  },{
    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    // voteCount: 0   
  }];

const initVotesState = Array.from({length: anecdotes.length},(e,i) => 0);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voteCounts, setVoteCounts] = useState(initVotesState);

  const setRandomIndexInState = () => {
    const randomIndex = parseInt(Math.random()*Math.pow(10,5))%anecdotes.length;
    // console.log(randomIndex);
    setSelected(randomIndex);
  }

  const recordUpvoteForSelectedAnecdote = () => {
    const updatedVoteCountForSelected = voteCounts[selected]+1;
    const updatedVoteCounts = [...voteCounts];
    updatedVoteCounts[selected] = updatedVoteCountForSelected;
    setVoteCounts(updatedVoteCounts);
  }

  

  return (
    <div>
      <AnecdotesDisplay anecdote={{text: anecdotes[selected].text, voteCount: voteCounts[selected]}} />
      <Button label="Upvote" handleClick={recordUpvoteForSelectedAnecdote} />
      <Button label="Change" handleClick={setRandomIndexInState} />
    </div>
  )
}


export default App;
