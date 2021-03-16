import {SET_STEP, SET_NEXT_STEP, SET_PREV_STEP} from './../constants';

export const setStep = (payload) => ({type: SET_STEP, payload});
export const setNextStep = (step) => ({type: SET_NEXT_STEP, payload: step + 1});
export const setPrevStep = (step) => ({type: SET_PREV_STEP, payload: step - 1});
