import React from 'react';

const AnecdotesDisplay = ({anecdote}) => {
  return (<React.Fragment>
    <p>
      <h2>{anecdote.text}</h2>
    </p>
    <p>{anecdote.voteCount} votes</p>
  </React.Fragment>)
}

export default AnecdotesDisplay;
