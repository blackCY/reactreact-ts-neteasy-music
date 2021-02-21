import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import { createBrowserHistory } from "history";
import { logger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history), thunk, /* logger */))
);

export default store;
