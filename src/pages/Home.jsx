import React, { Component } from 'react';
import Header from './Header';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return(
			<div>
				<Header />
				<div className="container">
					<div className="profile">
						<h1>Profile</h1>
						<div className="profile-detail">
							<div className="profile-row">
								<label>Name:</label>
								<span>{localStorage.getItem('r_username')}</span>
							</div>
							<div className="profile-row">
								<label>Gender:</label>
								<span>{localStorage.getItem('r_gender')}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home