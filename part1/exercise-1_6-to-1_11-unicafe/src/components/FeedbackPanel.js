import React from "react";
import Button from "./Button.js";
import TitleContainer from "./TitleContainer.js";


const FeedbackPanel = (props) => {

  const feedbackList = props.feedbackList;

  // console.log(feedbackList.map(item => item.count));

  const getStateValueIncrementer = (increment,currentStateValue,setStateValue) => {
    return (() => {
      setStateValue(currentStateValue+increment);
    })
  }

  return (<div>
    <TitleContainer text="give feedback" />
    {feedbackList.map(item => (<Button text={item.name} handleClick={getStateValueIncrementer(1,item.count,item.setCount)} />)).reduce((buttonsJsx,button) => [buttonsJsx,button])}
    </div>)
}


export default FeedbackPanel;