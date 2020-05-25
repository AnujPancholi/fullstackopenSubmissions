import React from "react";
import TitleContainer from "./TitleContainer.js";


const Statistic = ({name,stat}) => {

  return (<React.Fragment>
      <tr>
      	<td>{name}</td>
      	<td>{stat}</td>
      </tr>
    </React.Fragment>)
}

const Statistics = ({statList}) => {

  return (<div>
    <TitleContainer text="statistics" />

    {statList.some(item =>  !item.isCalculatedValue && item.stat>0) ?
    	(<table>{statList.map(item => (<Statistic name={item.name} stat={item.stat} />)).reduce((statsJsx,currentStatJsx) => [statsJsx,currentStatJsx])}</table>) 
    	 : (<p>No feedback given</p>)}
    </div>)
}

export default Statistics;