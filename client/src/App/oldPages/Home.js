// src/Home.js

import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Navbar from '../components/Navbar.js';
import InventoryPane from '../components/Inventory/InventoryPane';
import InventoryForm from '../components/Inventory/InventoryForm';
//import InventoryContainer from '../components/Inventory/InventoryContainer';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render() {
    return(
      <div>
      <Navbar user = {this}/>
      <div class = "container-fluid">
        <div class = "row">
          <div class = "col-sm">
            <InventoryPane/>
          </div>
          <div class = "col-sm">
            <InventoryForm/>
          </div>
        </div>
      </div>
      </div>
    )
  }


});
