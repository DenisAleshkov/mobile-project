import update from 'immutability-helper';
import {SET_JOBS, LOAD_JOBS, REQUEST_ERROR} from './../constants';

const initialState = {
  jobs: [],
  page: 1,
  error: '',
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return update(state, {
        jobs: {$set: action.payload.jobs},
        page: {$set: action.payload.page},
        perPage: {$set: action.payload.perPage},
      });
    case LOAD_JOBS: {
      return {
        ...state,
        page: action.payload.page,
        perPage: action.payload.perPage,
        jobs: [...state.jobs, ...action.payload.jobs],
      };
    }
    case REQUEST_ERROR:
      return update(state, {
        error: {$set: action.payload.error},
      });
    default:
      return state;
  }
};

export default JobReducer;
