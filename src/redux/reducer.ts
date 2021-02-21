import { combineReducers } from "redux";
import thunkReducer from "./thunk/reducers/index";
import { History } from "history";
import { connectRouter } from "connected-react-router";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...thunkReducer,
  });

export default rootReducer;
