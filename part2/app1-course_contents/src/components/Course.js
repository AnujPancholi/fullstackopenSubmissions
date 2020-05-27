import React from "react";
import TitleContainer from "./TitleContainer.js";
import Part from "./Part.js";


//this is indeed a separate component inported by the root component
const Course = ({course}) => {
	// let totalExerciseCount=0;
	let totalExerciseCount = course.parts.reduce((total,part) => total+part.exercises,0);
  const courseJsx = course.parts.reduce((jsx,part) => {
  	// totalExerciseCount+=part.exercises;
    jsx.push(<Part key={part.id} name={part.name} exercises={part.exercises} />);
    return jsx;
  },[<TitleContainer key={-1} text={course.name} />]);
  courseJsx.push(<Part key={0} name="Total" exercises={totalExerciseCount} className="part-bold"/>);
  return courseJsx;
}


export default Course;
