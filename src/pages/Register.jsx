import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
			gender: null,
			status: 'msg true',
			errorMessage: null
		};
	}

	handleChangeName = (e) => {
	
		this.setState({
			username: e.target.value
		});
	}

	handleChangePassword = (e) => {
		this.setState({
			password: e.target.value
		});
	}

	setGender(e) {
		this.setState({
			gender: e.target.value
		});
	}

	onSubmit = (e) => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const data = {
			userName: this.state.username,
			password: this.state.password,
			gender: this.state.gender
		}

		const options ={
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		}
		fetch('https://api.prontoitlabs.com/api/v1/user', options)
		.then(responseJson => responseJson.json())
		.then(response => {
			if(response.status == true){
				localStorage.setItem('idToken', response.data.token);
				localStorage.setItem('r_username', response.data.user.userName);
				localStorage.setItem('r_gender', response.data.user.gender);
				console.log(response.data.token);
				this.props.history.push("/userlist");
			}else{
				this.setState({
					status: response.status.toString() + ' msg',
					errorMessage: response.errorMessage
				})
			}
		})

		//const request = new Request('https://api.prontoitlabs.com/api/v1/user', options);
		//const response = fetch(request);
		//console.log(JSON.stringify(data));
		//console.log(response);
		e.preventDefault();
	}

	render() {
		return(
			<div className="container">
				<Route render={() => (
					localStorage.getItem('idToken') ? <Redirect to='/' /> : ''
				)} />
				<form id="form" onSubmit={(e) => this.onSubmit(e)}>
					<h1>Create an account</h1>
					<input
					 name="username"
					 placeholder="User Name"
					 type="text"
					 value={this.state.firstName}
					 onChange={this.handleChangeName}
					/><br />
					<input
					 name="password"
					 placeholder="Password"
					 type="password"
					 onChange={this.handleChangePassword}
					/>
					<div className="gender-option" onChange={this.setGender.bind(this)}>
					 Gender: 
					 <label><input type="radio" value="MALE" name="gender"/> Male</label>
					 <label><input type="radio" value="FEMALE" name="gender"/> Female</label>
					 <label><input type="radio" value="OTHER" name="gender"/> Other</label>
					</div>
					<input value="Submit" type="submit" />
					<div className={this.state.status}>
						{this.state.errorMessage}
					</div>
					<div className="link-register">
						<span>OR</span>
						<Link to={'/login'}>Back to Login</Link>	
					</div>
				</form>
			</div>
		);
	}
}

export default Register