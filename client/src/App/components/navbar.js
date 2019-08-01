import React, { Component } from 'react';

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state={
      username: this.props.username
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        username: this.props.username
      });
    }
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Peacemeal :)</a>
      {this.state.username ? (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Inventory</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Recipes<span className="sr-only">(current)</span></a>
            </li>
          </ul>
          <div className="btn-group dropleft">
            <button className="button" class="btn btn-primary btn-lg" id="dropdownMenuButton" width="100%" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.state.username}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" width="100%" >
              <a className="dropdown-item" href="#" >Manage Profile</a>
              <a className="dropdown-item" href="#">...</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={this.props.toggleLogin}>Log Out</a>
            </div>
          </div>
        </div>
      ):(null)}

    </nav>
    )
  }
}

export default Navbar;
