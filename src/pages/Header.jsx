import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	}

	logout = () => {
		localStorage.setItem('idToken', '');
		this.setState({
			redirect: true
		})
	}

	render() {
		return(
			<div className="header-section">
			<Route render={() => (
					!localStorage.getItem('idToken') ? <Redirect to='/login' /> : ''
				)} />
				<div className="userlink">
					<Link to={'/'}>{localStorage.getItem('idToken')}</Link>
				</div>
				<div className="menu">
					<Link to={'/userlist'}>User List</Link>
					<Link to={'/verifytoken'}>Verify Token</Link>
					<a onClick={this.logout}>Logout</a>
				</div>
			</div>
		)
	}
}

export default Header