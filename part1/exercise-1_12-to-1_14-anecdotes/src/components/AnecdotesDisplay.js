import React from 'react';

const AnecdotesDisplay = ({anecdote}) => {
  return (<React.Fragment>
    <p>
      {anecdote.text}
    </p>
    <p>{anecdote.voteCount} votes</p>
  </React.Fragment>)
}

export default AnecdotesDisplay;
