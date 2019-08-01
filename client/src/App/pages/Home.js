import React, { Component } from 'react';
import Navbar from '../components/navbar';

class Home extends Component{
  constructor(){
    super();
    this.state={
      username: "test-username"
    }
  }

  render(){
    return(
      <body>
        <Navbar/>
        <div> {this.state.username?(
          <div>You're logged in!</div>
        ):(
          <div>You're not logged in!</div>
        )} </div>
      </body>
    )
  }
}

export default Home;
