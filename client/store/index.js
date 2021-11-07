import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import filmsReducer from "./films";
import diaryReducer from "./diary";
import watchlistReducer from "./watchlist"
import directorsReducer from "./directors";

const reducer = combineReducers({
  auth,
//   films: filmsReducer,
//   directors: directorsReducer,
//   userDiary: diaryReducer,
//   userWatchlist: watchlistReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./films";
export * from "./directors";
export * from "./diary";
export * from "./watchlist"
