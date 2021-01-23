import { combineReducers } from "redux";
import { boardsReducer } from "./boards";

export default combineReducers({
  boards: boardsReducer,
});
