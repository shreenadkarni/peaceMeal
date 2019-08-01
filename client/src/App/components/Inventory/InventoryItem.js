import React, { Component } from 'react';


class InventoryItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      fullJSON: props.fullJSON,
      name: props.name,
      age: props.age,
      category: props.category,
      storage: props.storage,
      daysLeft: props.daysLeft,
      id: props.id,
      ageString:null,
      toolTipString:null
    }
  }

  getDescriptionString(){
    return (this.state.category+" | "+this.formatAge()+" in "+this.state.storage);
  }

  formatAge(){
    if(this.state.age < 7){
      return (this.state.age+" days");
    }
    else if(this.state.age % 7 ==0){
      return Math.floor(this.state.age/7)+" weeks";
    }
    else{
      return Math.floor(this.state.age/7)+"+ weeks";
    }
  }

  render(){
    return(
      <li class="list-group-item">
          <div class = "container-fluid">
              <div class = "row">
              <div class ="col-.5">
                <button class="btn btn-default btn-lg btn-circle" data-toggle="collapse" data-target={"#collapse"+this.state.id} aria-expanded="false" aria-controls={"collapse"+this.state.id}>
                  <span class="glyphicon glyphicon-edit"></span>
                </button>
              </div>
                <div class ="col-10" onClick ={()=>console.log('click')}>
                  <h3>{this.state.name+"  "}
                      {this.state.daysLeft<8?
                        (<span class="badge badge-danger badge-pill">{this.state.daysLeft} days until expiration</span>)
                         : (<span class="badge badge-default badge-pill">{this.state.daysLeft} days until expiration</span>)
                      }</h3>
                    {this.getDescriptionString()}
                </div>
                <div class ="col-1 float-right">
                  <button class="btn btn-default btn-lg btn-circle float-right" onClick={()=>this.props.removeItem(this.state.fullJSON)}>
                    <span class="glyphicon glyphicon-remove"></span>
                  </button>
                </div>
            </div>
          </div>
          <div id={"collapse"+this.state.id} class="collapse" aria-labelledby="headingOne">
            <div class="card-body">
              EDIT FORM WILL GO HERE
            </div>
          </div>
      </li>
    )
  }
}

export default InventoryItem;
