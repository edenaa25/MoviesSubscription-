import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import usersReducer from '../redux/usersReducer'
import moviesReducer from '../redux/moviesReducer'
import membersReducer from '../redux/membersReducer'

const rootReducer = combineReducers({
  users: usersReducer,
  movies: moviesReducer,
  members:membersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
