import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Header from './Header';

class Userlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userlist: [],
			activePage: 0,
			totalItemsCount: 25
		};
	}

	handlePageChange(pageNumber) {
    	//console.log(`active page is ${pageNumber}`);
    	this.setState({activePage: pageNumber}, ()=>{
				this.userList();
    	});
    	//console.log(this.state.activePage);
    	
  	}

	componentDidMount(){
		this.userList()
	}

	userList = (e) => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('X-AUTH-TOKEN', localStorage.getItem('idToken'));

		const options ={
			method: 'GET',
			headers
		}
		console.log(localStorage.getItem('idToken'));
		fetch('https://api.prontoitlabs.com/api/v1/user?page='+ this.state.activePage +'&size=25', options)
		.then(responseJson => responseJson.json())
		.then(response => {
			console.log(response.data);
			let userlist = response.data.content.map((user) => {
				return(
					<div className="user_row" key={'row'+user.id}>
						<div className="user_id" key={user.id}>{user.id}</div>
						<div className="user_name" key={user.userName}>{user.userName}</div>
						<div className="user_gender" key={user.gender}>{user.gender}</div>
					</div>
				)
			})

			this.setState({
				userlist: userlist,
				activePage: response.data.currentPage,
				totalItemsCount: response.data.totalElements
			})
		})

		//e.preventDefault();
	}

	

	render() {
		return(
			<div>
				<Route render={() => (
					localStorage.getItem('idToken') ? '' : <Redirect to='/login' />
				)} />
				<Header />
				<div className="container">
					<div className="user_list">
						{this.state.userlist}
				    </div>
					<Pagination
			          activePage={this.state.activePage}
			          itemsCountPerPage={25}
			          totalItemsCount={450}
			          pageRangeDisplayed={5}
			          onChange={(pageNumber)=>this.handlePageChange(pageNumber)}
			        />
			    </div>
			</div>
		);
	}
}

export default Userlist