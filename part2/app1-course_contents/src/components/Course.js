import React from "react";
import TitleContainer from "./TitleContainer.js";
import Part from "./Part.js";


const Course = ({course}) => {

  return course.parts.reduce((jsx,part) => {
    jsx.push(<Part key={part.id} name={part.name} exercises={part.exercises} />);
    return jsx;
  },[<TitleContainer key={-1} text={course.name} />]);
}


export default Course;
