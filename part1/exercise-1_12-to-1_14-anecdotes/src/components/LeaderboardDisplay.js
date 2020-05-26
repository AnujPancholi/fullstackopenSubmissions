import React from "react";
import AnecdotesDisplay from "./AnecdotesDisplay.js";

const LeaderboardDisplay = ({ anecdotes, votesList}) => {
	const topVoteCount = Math.max(...votesList);
	if(topVoteCount===0){
		return (<div>
			<h2>Anecdotes with most votes</h2>
			<p>Not enough data</p>
		</div>);
	}

	let renderedComponent = votesList.reduce((jsx,count,index) => {
		if(count===topVoteCount){
			jsx.push(<React.Fragment><p>{anecdotes[index].text}</p><p>{count} votes</p></React.Fragment>);
		}
		return jsx;
	},[<h2>Anecdotes with the most votes</h2>]);

	return renderedComponent;
}

export default LeaderboardDisplay;