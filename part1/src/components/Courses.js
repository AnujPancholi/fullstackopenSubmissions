import React from 'react';
import Part from "./Part.js";


const Courses = (props) => {

  let partsJsx = props.parts.map(part => (<Part name={part.name} excerciseCount={part.excerciseCount}/>)).reduce((acc,curr) => [acc,curr]);
  
  return (<React.Fragment>
    {partsJsx}
    </React.Fragment>);
}

export default Courses;