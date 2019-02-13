import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Userlist from './pages/Userlist';
import Verifytoken from './pages/Verifytoken';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem('idToken')
      ? <Redirect to='/login' />
      : ''
  )} />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userlist" component={Userlist} />
          <Route exact path="/verifytoken" component={Verifytoken} />
          <PrivateRoute path='/' component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
