import React, { Component } from 'react';

class InventorySearch extends React.Component {
  handleChange (event) {
    this.props.updateSearch(event.target.value);
  }

  render () {
    return (
      <div class="input-group input-group-lg mb-3">
        <input type="text" placeholder="Search your inventory" className="form-control" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary">Action</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
      </div>

    )
  }
}

export default InventorySearch;
