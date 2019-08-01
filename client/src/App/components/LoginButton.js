import React, { Component } from 'react';


//this class generates the login/logout button for the app; depending on the users authentication state it displays the correct button
class LoginButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: props.user,
    }
  }

  render(){
    if (this.state.user.state.authenticated === null) return null;
    return this.state.user.state.authenticated ?
      <button class = "btn btn-light" onClick={this.state.user.logout}>Logout</button> :
      <button class = "btn btn-success" onClick={this.state.user.login}>Login</button>;
  }

}

export default LoginButton;
