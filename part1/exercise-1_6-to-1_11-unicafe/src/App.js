import React,{useState} from 'react';
import logo from './logo.svg';
import {
  Button,
  TitleContainer,
  Statistics,
  FeedbackPanel
} from "./components/index.js";


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackList = [{
    name: "good",
    count: good,
    weight: 1,
    setCount: setGood
  },{
    name: "neutral",
    count: neutral,
    weight: 0,
    setCount: setNeutral
  },{
    name: "bad",
    count: bad,
    weight: -1,
    setCount: setBad
  }];

  const additionalStatsList = [{
    name: "all",
    getValue: () => feedbackList.reduce((total,item) => total+=item.count,0)
  },{
    name: "average",
    getValue: () => {
        let totalWeight=0,totalCount=0;
        feedbackList.forEach(item => {
            totalCount+=item.count;
            totalWeight+=item.count*item.weight;
        })
        return totalCount===0 ? 0 : (totalWeight/totalCount);
    }
  },{
    name: "positive",
    getValue: () => {
        const positiveStatusNameSet = new Set(["good"]);
        let totalCount=0,positiveCount=0;
        feedbackList.forEach(item => {
            if(positiveStatusNameSet.has(item.name)){
                positiveCount+=item.count;
            }
            totalCount+=item.count;
        })

        return `${totalCount===0 ? 0 : (positiveCount/totalCount)*100}%`; 
    }
  }]

  const statList = feedbackList.concat(additionalStatsList.map(item => ({
    name: item.name,
    count: item.getValue(),
    isCalculatedValue: true
  }))).map(item => ({
    name: item.name,
    stat: item.count,
    isCalculatedValue: item.isCalculatedValue || false
  }));
  

  return (
    <div>
      <FeedbackPanel feedbackList={feedbackList} />
      <Statistics statList={statList} />
    </div>
  )
}

export default App;
