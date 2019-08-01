import React, { Fragment, Component } from 'react';

class FilterList extends React.Component {
  constructor(props){
    super(props);
    console.log('status: '+props.inventoryLoadStatus);
    this.state={
      fullInventory: this.props.inventory,
      inventoryLoadStatus: this.props.inventoryLoadStatus
    }
  }

  //this calls the getData function on load to make sure that redux loads the user's inventory
  componentDidMount(){
    this.props.getInventoryData();
  }

  //updates the inventory props if the Redux inventory gets updated
  componentWillReceiveProps(nextProps) {
     console.log();
     this.props.postInventoryData(nextProps.inventory);
     this.setState({fullInventory : nextProps.inventory,
                    inventoryLoadStatus: nextProps.inventoryLoadStatus})
    }

  //activated if the "remove" button is clicked on any specific inventory item; updates state and sends the update to Redux
  removeItem(itemToRemove){
    var arr = this.state.fullInventory.filter((ingredient)=> ingredient.id != itemToRemove.id);
    this.setState({fullInventory:arr},()=>{this.props.overwriteInventory(arr)})
  }

  //returns a filtered version of the inventory list if users search for a specific item
  filter (inventory) {
    if (!this.props.filter) {
      return inventory;
    }
    return inventory.filter((ingredient) => ingredient.name.toLowerCase().search(this.props.filter.toLowerCase()) != -1)
  }

  render () {
    var filteredInventory = this.filter(this.state.fullInventory)

    return (
      <ul class="list-group">
      <li className="list-group-item">Inventory Load Status: {this.state.inventoryLoadStatus}</li>
      {filteredInventory.length ? (
            filteredInventory.map((inventoryItem) => <InventoryItem removeItem={this.removeItem.bind(this)} id={inventoryItem.id} key={inventoryItem.id}  name={inventoryItem.name} category={inventoryItem.category} age={inventoryItem.age} storage={inventoryItem.storage} daysLeft={inventoryItem.daysLeft}></InventoryItem>)
        ):(
          <li className = "list-group-item">No results found, add something to your inventory?</li>
        )
      }
      </ul>
    )
  }
}

//connect ties the redux state variables and redux functions into the props for the FilterList component
export default connect(mapStateToProps,mapDispatchToProps)(FilterList);
