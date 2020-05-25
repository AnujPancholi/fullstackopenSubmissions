import React from 'react';


const Button = ({label,handleClick}) => {
  return (<React.Fragment>
    <button onClick={handleClick}>
      {label}
    </button>
  </React.Fragment>)
}

export default Button;