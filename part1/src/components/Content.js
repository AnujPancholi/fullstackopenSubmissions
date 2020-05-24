import React from 'react';
import Part from "./Part.js";


const Content = (props) => {

  let partsJsx = props.parts.map(part => (<Part name={part.name} exerciseCount={part.exerciseCount}/>)).reduce((acc,curr) => [acc,curr]);
  
  return (<React.Fragment>
    {partsJsx}
    </React.Fragment>);
}

export default Content;