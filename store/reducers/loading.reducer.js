import update from 'immutability-helper';
import {SET_LOADING} from './../constants';

const initialState = {
  isLoading: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return update(state, {
        isLoading: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default LoadingReducer;
