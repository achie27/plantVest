import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class PhotoAdder extends Component {
	constructor(props){
		super(props);
		this.state = {
			file : null,
			images : []
		}
	}

	render() {
		return (
			<div>
				<div className='PhotoAdder'>
					<input type = 'file' onChange={this.file_upload} />
					<button onClick={this.display_img}>Upload</button>
				</div>
				<GridList cols={2.5}>
					{this.state.images.map(image => (
						<GridListTile>
							<img src={image}/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}

	file_upload = (event) => {
		this.setState({
			file : event.target.files[0]
		});
	}	

	display_img = () => {
		let reader = new FileReader();
		reader.onloadend = () => {
			let l = this.state.images;
			l.push(reader.result);

			this.setState({
				images : l
			});
		}
		reader.readAsDataURL(this.state.file);
		console.log(this.state);
	}
}

export default PhotoAdder;
