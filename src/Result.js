import React from 'react';
import axios from 'axios';

class Result extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			soil : ['clay'],
			animals : [],
			crops : [],
			fit : 0
		}
	}
	render(){
		return (
			<div>
				{this.state.soil}
			</div>
		)
	}

	componentDidMount(){
		axios.get('http://localhost:5000/results', (req, res) => {
			console.log(res);
		});
		console.log("mounted");
	}
}

export default Result;