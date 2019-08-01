import React, { Component } from 'react';
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addInventory, postInventoryData, reduxUndo} from "../../../redux/actions/index";

//this ties the Redux addInventory function into the props for InventoryForm
function mapDispatchToProps(dispatch) {
  return {
    addInventory: inventory => dispatch(addInventory(inventory)),
    postInventoryData: inventory => dispatch(postInventoryData(inventory)),
    reduxUndo: () => dispatch(reduxUndo())
  };
}

//this ties the state.inventory variable from redux into the props for InventoryForm
const mapStateToProps = state => {
  return { inventory: state.inventory, undoAvailable: state.undoAvailable };
};

class InventoryForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      Food: null,
      Quantity: null,
      PurchaseDate: null,
      Storage: null,
      Category: null,
      fullInventory: this.props.inventory,
      undoAvailable: this.props.undoAvailable
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.undoFunction = this.undoFunction.bind(this);
  }

  //this component waits for updated Redux inventory to update the component's state accordingly
  componentWillReceiveProps(nextProps) {
     //console.log();
     this.props.postInventoryData(nextProps.inventory);
     this.setState({fullInventory : nextProps.inventory, undoAvailable : nextProps.undoAvailable})
    }

  //testing function no longer in use
  undoFunction(event){
    //event.preventDefault();
    console.log('undo click logged');
    this.props.reduxUndo();
  }

  //this function updates the state values as users type into the form
  handleChange(event){
    this.setState({[event.target.name]:[event.target.value]}, ()=>{console.log(this.state);});
  }


  //this function waits for a form submission and then packages up the inventory data to send to Redux
  handleSubmit(event) {
    event.preventDefault();
    const inventoryName = this.state.Food[0]
    const inventoryAge = 14;
    const inventoryCategory = this.state.Category[0];
    const inventoryStorage = this.state.Storage[0];
    const inventoryQuantity = this.state.Quantity[0];
    const id = uuidv1()
    this.props.addInventory({ "id": id,
                              "name": inventoryName,
                              "age": inventoryAge,
                              "category": inventoryCategory,
                              "storage": inventoryStorage,
                              "quantity": inventoryQuantity});
  }

  render(){
    return(
      <div>
      <h3>Add Inventory</h3>
        <form onSubmit = {this.handleSubmit}>
          <div class="form-row">
            <div class="col-5">
              <input type="text" name = "Food" class="form-control form-control-lg" placeholder="Food" onChange = {this.handleChange}/>
            </div>
            <div class="col">
              <input type="text" name = "Quantity" class="form-control form-control-lg" placeholder="Quantity" onChange = {this.handleChange}/>
            </div>
            <div class="col">
              <input type="text" name = "PurchaseDate" class="form-control form-control-lg" placeholder="Purchase Date" onChange = {this.handleChange}/>
            </div>
            <div class="col">
              <input type="text" name = "Storage" class="form-control form-control-lg" placeholder="Storage Place" onChange = {this.handleChange}/>
            </div>
            <div class="col">
              <input type="text" name = "Category" class="form-control form-control-lg" placeholder="Category" onChange = {this.handleChange}/>
            </div>
            <div class="col">
              <button class="btn btn-primary btn-lg" type="submit"><span class = "glyphicon glyphicon-ok"/></button>
            </div>
          </div>
        </form>
        {this.state.undoAvailable? (<button type="button" className="btn btn-primary btn-lg" onClick = {()=>{this.undoFunction; return false}}> undo available </button>) : (<div> undo not available </div>)}
      </div>
    );
  }
}

//this ties the state.variables and functions from Redux into the props for the InventoryForm component
export default connect(mapStateToProps, mapDispatchToProps)(InventoryForm);;
