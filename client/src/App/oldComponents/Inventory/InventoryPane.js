import React, { Component } from 'react';
import InventoryItem from './InventoryItem';
import FilterList from './FilterList';
import FilterSearch from './FilterSearch';

class InventoryPane extends Component {
    // Initialize the state
    constructor(props){
      super(props);
      this.state = {
        list: [], //this will hold the list of inventory items
        filter: null //this will hold the string that the list of inventory items should be filtered on
      }
    }

    // Fetch the list on first mount
    async componentDidMount() {
      this.getList();
    }



    //if the text gets updated in the search box, then update our filter string to reflect that; this will impact the items that get shown in the inventory list
    updateSearch (inputValue) {
      let filter = this.state.filter;

      this.setState({
        filter: inputValue
      });
      console.log(inputValue);
    }

    //Tries to get the list of names from postgres
    getList = () => {
      fetch('/api/inventory/testPostgres')
      .then(res => res.json())
      .then(inventory => this.setState({list: inventory}));
    }

    postList = () =>{
      fetch('/api/inventory/updateTest', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({"inventory":this.state.list})
      }).then(function(response) {
        console.log(response.json());
      }).then(function(data) {
        console.log('Updated Inventory:', data);
      });
    }

    render() {
      return (
        <div>
        <div class="panel panel-default">
          <div class="panel-heading"><h3>Your Inventory</h3></div>
          <div class="panel-body">
                <div>
                <FilterSearch updateSearch={this.updateSearch.bind(this)} searchText={this.state.filter} />
                <FilterList filter={this.state.filter}></FilterList>
                </div>

            }
          </div>
        </div>


        </div>
      );
    }
  }

  export default InventoryPane;



  // <div>
  //   {/* Render the list of items */}
  //   {this.state.list.map((item) => {
  //     return(
  //       <InventoryItem name = {item.name} age = {item.age} category = {item.category} storage = {item.storage} />
  //     );
  //   })}
  // </div>
