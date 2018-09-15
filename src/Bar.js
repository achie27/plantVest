import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root : {
		flexGrow : 1
	}
};

class Bar extends Component {
	render() {
		return (
			<div className='appbar'>
				<AppBar position='static' style = {{backgroundColor : '#2196F3'}}>
					<Toolbar>
						<Typography variant='title' color='inherit'>
							plantVest
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default Bar;
