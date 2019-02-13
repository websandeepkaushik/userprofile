import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Header from './Header';

class Verifytoken extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: null,
			status: 'msg true',
			errorMessage: null
		};
	}

	componentDidMount(){
		this.getStatus()
	}

	async getStatus(){
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-AUTH-TOKEN', localStorage.getItem('idToken'));

		const options ={
			method: 'POST',
			headers
		}
		await fetch('https://api.prontoitlabs.com/api/v1/user/verify-token', options)
		.then(responseJson => responseJson.json())
		.then(response => {
			console.log(response);
			this.setState({
				status: response.status.toString() + ' msg',
			})
			if(response.errorMessage){
				 this.setState({
					errorMessage: response.errorMessage
				})
			}else{
				this.setState({
					errorMessage: 'Token Verified'
				})
			}
			
		})
	}

	

	render() {
		return(
			<div>
				<Header />
				<div className="container">
					<div className={this.state.status}>
						{this.state.errorMessage}
					</div>
				</div>
			</div>
		);
	}
}

export default Verifytoken