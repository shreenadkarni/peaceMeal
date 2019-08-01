// src/js/reducers/index.js
// redux reducer index.js
// the "reducer" is used to "reduce" all of the different action items into a single "state" that can be referenced

import {ADD_ARTICLE} from '../constants/action-types';
import {ADD_INVENTORY} from '../constants/action-types';
import {OVERWRITE_INVENTORY} from '../constants/action-types';
import {INVENTORY_DATA_LOADED} from '../constants/action-types';

const initialState = {
  articles: [{"id":"ID1", "title":"test article name"}],
  inventory: [],
  lastInventory: [], //stores the inventory to be loaded on "undo"
  nextInventory: [], //stores the inventory to be loaded on "redo"
  undoAvailable: false,
  redoAvailable: false,
  undoableAction: "",
  inventoryLoadStatus: "loading",
  inventoryPostStatus: "latest changes saved"
};

//this function is from a tutorial; not used for feed-m3
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  //this function is intended to allow users to add inventory (one or many items)
  if (action.type === ADD_INVENTORY) {
    //console.log('adding inventory call:');
    //console.log(action.payload);
    return Object.assign({}, state, {
      pastInventory: [].concat(state.inventory),
      inventory: state.inventory.concat(action.payload),
      undoAvailable: true,
      undoableAction: "inventory added"
    });
  }

  //this function is intended to completely reduce the user's inventory; useful in "delete" situations
  if (action.type === OVERWRITE_INVENTORY) {
    //console.log('adding inventory call:');
    //console.log(action.payload);
    return Object.assign({}, state, {
      pastInventory: [].concat(state.inventory),
      inventory: action.payload,
      undoAvailable: true,
      undoableAction: "inventory deleted"
    });
  }

  //once data gets loaded from the user; overwrite the corresponded state items
  if (action.type === INVENTORY_DATA_LOADED) {
    return Object.assign({}, state, {
      inventory: action.payload,
      inventoryLoadStatus: "successful"
    });
  }

  //if getting user's inventory data fails
  if (action.type === "INVENTORY_GET_ERRORED") {
    return Object.assign({}, state, {
      inventoryLoadStatus: "failed"
    });
  }

  //if getting user's inventory data fails
  if (action.type === "UNDO") {
    console.log('undo called');
    return Object.assign({}, state, {
      nextInventory: [].concat(state.inventory),
      inventory: [].concat(state.pastInventory),
      pastInventory: []
    });
  }


  return state;
}
export default rootReducer;
