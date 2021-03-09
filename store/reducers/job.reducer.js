import {SET_JOBS, LOAD_JOBS, REQUEST_ERROR} from './../constants';

const initialState = {
  jobs: [],
  page: 1,
  error: '',
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS: {
      return {
        ...state,
        page: action.payload.page,
        jobs: action.payload.jobs,
      };
    }
    case LOAD_JOBS: {
      return {
        ...state,
        page: action.payload.page,
        jobs: [...state.jobs, ...action.payload.jobs],
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default JobReducer;
