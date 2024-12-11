import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";

const reducer = {
  dialog: appReducer.dialogSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
