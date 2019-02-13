import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			status: 'msg true',
			errorMessage: null
		};
	}

	handleChangeName = (e) => {
	
		this.setState({
			userName: e.target.value
		});
	}

	handleChangePassword = (e) => {
		this.setState({
			password: e.target.value
		});
	}

	onSubmit = (e) => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const data = {
			userName: this.state.userName,
			password: this.state.password
		}

		const options ={
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		}
		fetch('https://api.prontoitlabs.com/api/v1/user/login', options)
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

		e.preventDefault();
	}

	

	render() {
		return(
			<div className="container">
				<Route render={() => (
					localStorage.getItem('idToken') ? <Redirect to='/' /> : ''
				)} />
				<form id="form" onSubmit={(e) => this.onSubmit(e)}>
					<h1>Login</h1>
					<input
					 name="username"
					 placeholder="User Name"
					 type="text"
					 value={this.state.userName}
					 onChange={this.handleChangeName}
					/><br />
					<input
					 name="password"
					 placeholder="Password"
					 type="password"
					 onChange={this.handleChangePassword}
					/><br />
					<input value="Submit" type="submit" />
					<div className={this.state.status}>
						{this.state.errorMessage}
					</div>
					<div className="link-register">
						<span>OR</span>
						<Link to={'/register'}>Create an Account</Link>	
					</div>
				</form>
			</div>
		);
	}
}

export default Login