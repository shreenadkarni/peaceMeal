import React, { Component } from 'react';
import ReduxForm from './ReduxForm'
import ReduxTestList from './ReduxTestList';


//this class generates the login/logout button for the app; depending on the users authentication state it displays the correct button
class LoginButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
      <h2>Articles</h2>
      <ReduxTestList />
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>Add a new article</h2>
      <ReduxForm />
    </div>
  </div>);
  }

}

export default LoginButton;
