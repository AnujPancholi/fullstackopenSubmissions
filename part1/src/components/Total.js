import React from 'react';


const Total = (props) => {
  return (<React.Fragment>
    <p>Number of exercises {props.parts.reduce((total,part) => total+=part.exerciseCount,0)}</p>
    </React.Fragment>)
}


export default Total;