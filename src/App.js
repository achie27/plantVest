import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Bar from './Bar';
import PhotoAdder from './PhotoAdder';
import Result from './Result';

class App extends Component {
	render(){
		const App = () => (
			<div>
				<Bar />
				<Switch>
					<Route exact path='/' component = {PhotoAdder} />
					<Route path='/result' component = {Result} />
				</Switch>
			</div>
		);
		return (
			<Switch>
				<App />
			</Switch>
		);
	}
}

export default App;