import React, { Component } from 'react';
import LoginButton from './LoginButton';


//class that generates the Navbar for the app
class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: props.user,
    }
  }

  render(){
    const {user} = this.state;
    return(
      getNavBar(user)
    )
  }
}

export default Navbar;


//this function returns the appropriate login/logout button depending on the user's state
function getAuthButton(user){
  return <LoginButton user = {user}/>;
}

function getNavBar(user){
  return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Feed.M3</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
  </div>
  {getAuthButton(user)}
</nav>);
}
