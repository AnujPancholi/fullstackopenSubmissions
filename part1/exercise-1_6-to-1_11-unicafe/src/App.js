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
  }]

  const statList = feedbackList.map(item => ({
    name: item.name,
    stat: item.count
  }));
  

  return (
    <div>
      <FeedbackPanel feedbackList={feedbackList} />
      <Statistics statList={statList} />
    </div>
  )
}

export default App;
