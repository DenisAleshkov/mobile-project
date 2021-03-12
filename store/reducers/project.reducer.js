import update from 'immutability-helper';
import {
  SET_PICKUP_SITES,
  SET_DROPOF_SITES,
  SET_JOB_DETAILS,
  SET_TRUCKS,
} from './../constants';

const initialState = {
  payloads: [
    {
      id: 18544,
      payloadName: '# 4 Stone',
      unitPrice: 20,
      totalQuantity: '99.22 / 5000',
    },
  ],
  pickupSites: null,
  dropofSites: null,
  jobDetails: null,
  trucks: null,
};

const StepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOB_DETAILS:
      return update(state, {
        jobDetails: {$set: action.payload},
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
    default:
      return state;
  }
};

export default StepperReducer;
