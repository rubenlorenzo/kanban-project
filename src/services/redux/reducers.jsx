import { combineReducers } from "redux";
import  tasksReducer  from "./tasks";
import { boardsReducer } from "./boards";
import  listsReducer  from "./lists";

export default combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  tasks: tasksReducer,
});
