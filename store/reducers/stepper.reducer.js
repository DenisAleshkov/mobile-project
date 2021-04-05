import update from 'immutability-helper';
import {SET_STEP, SET_NEXT_STEP, SET_PREV_STEP} from './../constants';

const initialState = {
  steps: [
    {
      fillCircle: true,
      renderIcon: false,
      fillLabel: false,
      filLine: false,
      renderLine: false,
      label: 'Payload',
    },
    {
      fillCircle: false,
      renderIcon: false,
      fillLabel: false,
      filLine: false,
      renderLine: true,
      label: 'Job Details',
    },
    {
      fillCircle: false,
      renderIcon: false,
      fillLabel: false,
      filLine: false,
      renderLine: true,
      label: 'Job Sites',
    },
    {
      fillCircle: false,
      renderIcon: false,
      fillLabel: false,
      filLine: false,
      renderLine: true,
      label: 'My Trucks',
    },
    {
      fillCircle: false,
      renderIcon: false,
      fillLabel: false,
      filLine: false,
      renderLine: true,
      label: 'Haulers',
    },
  ],
  step: 0,
};

const StepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP:
      return update(state, {
        step: {$set: action.payload},
      });
    case SET_NEXT_STEP:
      return update(state, {
        step: {$set: action.payload},
      });
    case SET_PREV_STEP:
      return update(state, {
        step: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default StepperReducer;
