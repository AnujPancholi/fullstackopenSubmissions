import React from 'react';

const AnecdoteDisplay = ({anecdote}) => {
  return (<React.Fragment>
    <p>
      {anecdote}
    </p>
  </React.Fragment>)
}

export default AnecdoteDisplay;
