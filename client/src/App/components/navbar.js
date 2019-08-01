import React, { Component } from 'react';

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state={
      username: this.props.username
    }
  }

  render(){
    return(
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Peacemeal :)</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Inventory</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Recipes<span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <button type="button" class="btn btn-primary btn-lg float-right">Logout of Peacemeal</button>
      </div>
    </nav>
    )
  }
}

export default Navbar;
