import update from 'immutability-helper';
import {SET_STEP} from './../constants';

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
};

const StepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP:
      return update(state, {
        steps: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default StepperReducer;
