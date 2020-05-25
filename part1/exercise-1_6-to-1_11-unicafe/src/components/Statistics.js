import React from "react";
import TitleContainer from "./TitleContainer.js";


const Statistic = ({name,stat}) => {
	
  return (<React.Fragment>
      <p>{name}:&#9;{stat}</p>
    </React.Fragment>)
}

const Statistics = ({statList}) => {

  return (<div>
    <TitleContainer text="statistics" />
    {statList.some(item =>  !item.isCalculatedValue && item.stat>0) ? statList.map(item => (<Statistic name={item.name} stat={item.stat} />)).reduce((statsJsx,currentStatJsx) => [statsJsx,currentStatJsx]) : (<p>No feedback given</p>)}
    </div>)
}

export default Statistics;