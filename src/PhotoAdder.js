import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
	gridList: {
		width : "100vw",
		height : "100vh"
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		backgroundColor: theme.palette.background.paper,
		overflowX: 'hidden',
		overflowY: 'scroll'
	},
});

class PhotoAdder extends Component {
	constructor(props){
		super(props);
		this.state = {
			file : null,
			images : [],
			files : []
		}
		console.log(props);
	}

	render() {
		return (
			<div>
				<Grid alignItems={'center'} container spacing={16}>
					<Grid item xs={4}>
						<div className='PhotoAdder'>
							<Link to={'./result'}>
								<Button variant="contained" onClick={this.send_images}>
									Submit
								</Button>
							</Link>
							<Button 
								variant = "fab" 
								component = "label"
								label = "oya"
								color="primary" 
								aria-label="Add" 
								className={this.props.button}
							>
								<input style={{display:'none'}} type = 'file' onChange={this.file_upload} />
								<AddIcon/>
							</Button>

						</div>
					</Grid>
						<Grid item xs={8}>
							<div className={this.props.root}>
								<GridList cellHeight={150} className={this.props.gridList} cols={2.5}>
									{this.state.images.map(image => (
										<GridListTile key={image.key}>
											<img src={image.data}/>
										</GridListTile>
									))}
								</GridList>
							</div>
						</Grid>

				</Grid>
			</div>
		);
	}

	send_images = () => {
		var x = new FormData();
		for (var i = this.state.images.length - 1; i >= 0; i--) {
			x.append("img", this.state.files[i]);
		}
		x.append('len', this.state.images.length);
		axios.post('/images',
			x,
			{
		      'Content-Type': 'multipart/form-data'
		    }).then((res) => {
			console.log(res);
		});
	}

	file_upload = (event) => {
		this.setState({
			file : event.target.files[0]
		});

		console.log(this.state)
		let reader = new FileReader();
		reader.onloadend = () => {
			let l = this.state.images;
			l.push({
				data : reader.result,
				key : this.state.images.length,
			});


			this.setState({
				images : l
			});
		}
		let f = this.state.files;
		f.push(event.target.files[0]);

		this.setState({
			files : f
		});

		reader.readAsDataURL(event.target.files[0]);
		console.log(this.state);
	}	

}

export default withStyles(styles)(PhotoAdder);
