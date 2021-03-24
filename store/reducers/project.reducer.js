import update from 'immutability-helper';
import {
  SET_PICKUP_SITES,
  SET_DROPOF_SITES,
  SET_TRUCKS,
  SET_HAULERS,
  SET_CREATED_PROJECT,
} from './../constants';

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
  pickupSites: null,
  dropofSites: null,
  trucks: null,
  haulers: null,
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
    case SET_HAULERS:
      return update(state, {
        haulers: {$set: action.payload},
      });
    case SET_PICKUP_SITES:
      return update(state, {
        pickupSites: {$set: action.payload},
      });
    case SET_DROPOF_SITES:
      return update(state, {
        dropofSites: {$set: action.payload},
      });
    case SET_TRUCKS:
      return update(state, {
        trucks: {$set: action.payload},
      });
    case SET_CREATED_PROJECT:
      return update(state, {
        createdProject: {$push: action.payload},
      });
    default:
      return state;
  }
};

export default StepperReducer;
