import React, { Fragment, Component } from 'react';
import Navbar from '../components/navbar';

const test_username = "test-username"
const test_inventory = [{"name":"pork", "id":"id1","age":"12", "storage":"fridge","daysLeft":"15"}]

class Home extends Component{
  constructor(){
    super();
    this.state={
      username: test_username,//null//
      inventory: test_inventory
    }
    this.toggleUsername = this.toggleUsername.bind(this);
  }

  toggleUsername(){
    console.log('successfully called toggleUsername in home.js');
    if(this.state.username)
      this.setState({username:null})
    else {
      this.setState({username:test_username})
    }
  }

  render(){
    return(
      <Fragment>
        <Navbar username = {this.state.username} toggleLogin = {this.toggleUsername.bind(this)}/>
        <div className="container">
          <div> {this.state.username?(
            <div>You're logged in!</div>
          ):(
            <div>You're not logged in!</div>
          )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home;
