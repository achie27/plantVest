import React, {Component} from 'react';
import Bar from './Bar';
import PhotoAdder from './PhotoAdder';

class App extends Component {
	render(){
		return (
			<div>
				<Bar />
				<PhotoAdder />
			</div>
		);
	}
}

export default App;