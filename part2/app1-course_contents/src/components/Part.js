import React from "react";
import './Part.css';

const Part = ({name,exercises,className}) => {
	const cssClass = className || "part-default";
  return (<p className={cssClass}>{name}: {exercises}</p>);
}


export default Part;
