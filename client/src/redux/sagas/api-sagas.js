import { takeEvery, takeLatest, call, put } from "redux-saga/effects";

//this function intercepts dispatches and looks for ones that are met by the "takeEvery" parameter
export default function* watcherSaga() {
  yield takeEvery("INVENTORY_DATA_REQUESTED", inventoryRequestWorkerSaga);
  yield takeLatest("INVENTORY_POST_REQUESTED", inventoryPostWorkerSaga);
}

//when called, this will get the user's inventory data, and then pass that along to the reducer's appropriate function
function* inventoryRequestWorkerSaga() {
  try {
    const payload = yield call(getInventoryData);
    yield put({ type: "INVENTORY_DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "INVENTORY_GET_ERRORED", payload: e });
  }
}

//when called, this will post the user's inventory data into the database
function* inventoryPostWorkerSaga(action) {
  try {
    const payload = yield call(testPost(action.payload));
    yield put({ type: "INVENTORY_DATA_POSTED", payload });
  } catch (e) {
    yield put({ type: "INVENTORY_POST_ERRORED", payload: e });
  }
}

//this function makes the fetch request for the user's inventory data
  function getInventoryData() {
    return fetch('/api/inventory/testPostgres').then(response =>
      response.json()
    );
  }


  //post call to node for testing purposes; post and get requests likely to be moved to Redux
  function testPost(postBody){
    return fetch('/api/inventory/updateTest', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({"inventory":postBody})
    });
  }
