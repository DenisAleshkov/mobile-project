import JobReducer from './reducers/job.reducer';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  JobReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
