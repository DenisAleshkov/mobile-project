import JobReducer from './reducers/job.reducer';
import LoadingReducer from './reducers/loading.reducer';
import StepperReducer from './reducers/stepper.reducer';
import ProjectReducer from './reducers/project.reducer';
import {reducer as formReducer} from 'redux-form';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  JobReducer,
  LoadingReducer,
  StepperReducer,
  ProjectReducer,
  form: formReducer  
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
