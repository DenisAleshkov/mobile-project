import JobReducer from './reducers/job.reducer';
import LoadingReducer from './reducers/loading.reducer';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  JobReducer,
  LoadingReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
