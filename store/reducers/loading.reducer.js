import update from 'immutability-helper';
import {SET_LOADING, SET_REFRESHING} from './../constants';

const initialState = {
  isLoading: false,
  refreshing: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return update(state, {
        isLoading: {$set: action.payload},
      });
    case SET_REFRESHING:
      return update(state, {
        refreshing: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default LoadingReducer;
