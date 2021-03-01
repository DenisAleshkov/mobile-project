import {SET_JOBS} from './../constants';

const initialState = {
  jobs: [],
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS: {
      return {
        ...state,
        jobs: action.payload,
      };
    }
    default:
      return state;
  }
};

export default JobReducer;
