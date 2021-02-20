import { combineReducers } from "redux";
import { boardsReducer } from "./boards";
import  listsReducer  from "./lists";

export default combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
});
