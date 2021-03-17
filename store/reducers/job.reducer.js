import update from 'immutability-helper';
import {SET_JOBS, LOAD_JOBS, REQUEST_ERROR, SET_HAS_MORE} from './../constants';

const initialState = {
  jobs: null,
  page: 1,
  perPage: null,
  error: '',
  hasMore: true,
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return update(state, {
        jobs: {$set: action.payload.jobs},
        page: {$set: action.payload.page},
      });
    case LOAD_JOBS: {
      return {
        ...state,
        page: action.payload.page,
        jobs: [...state.jobs, ...action.payload.jobs],
      };
    }
    // return update(state, {
    //   jobs: {$push: action.payload.jobs},
    //   page: {$set: action.payload.page},
    // });
    case REQUEST_ERROR:
      return update(state, {
        error: {$set: action.payload.error},
      });
    case SET_HAS_MORE:
      return update(state, {
        hasMore: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default JobReducer;
