import React, {Fragment} from 'react';
import {FormGroup} from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import options from '../exampleData';
var Typeahead = require('react-bootstrap-typeahead').Typeahead; // typeahead module for searching

/* example-start */
class SwapList extends React.Component {
  state = {
    multiple: true,
  };

  render() {
    const {multiple} = this.state;

    return (
      <Fragment>
        <Typeahead
          defaultSelected = {options.slice(0, 5)}
          labelKey="name"
          multiple={multiple}
          options={options} //this typeahead is getting filled with example data for now
          placeholder="Choose a state..."
        />
      </Fragment>
    );
  }
}
/* example-end */

export default SwapList;
