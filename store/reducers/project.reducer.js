import update from 'immutability-helper';
import {SET_CREATED_PROJECT} from './../constants';

const initialState = {
  payloads: [
    {
      id: 18544,
      payloadName: '# 4 Stone',
      unitPrice: 20,
      totalQuantity: '99.22 / 5000',
    },
    {
      id: 18542,
      payloadName: '# 5 Stone',
      unitPrice: 10,
      totalQuantity: '0 / 0',
    },
  ],
  errors: [
    {quantity: ['quantity is more than left on the store']},
    {site: ['incorrect site']},
    {trucks: ['truck 4 is offline']},
    {message: ['server error']},
  ],
  createdProject: [],
};

const StepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATED_PROJECT:
      return update(state, {
        createdProject: {$push: [action.payload]},
      });
    default:
      return state;
  }
};

export default StepperReducer;
