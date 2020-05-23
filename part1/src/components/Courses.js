import React from 'react';



const Courses = (props) => {

  let partsJsx = props.parts.map(part => (<p>{part.name} {part.exerciseCount}</p>)).reduce((acc,curr) => [acc,curr]);
  
  return (<React.Fragment>
    {partsJsx}
    </React.Fragment>);
}

export default Courses;