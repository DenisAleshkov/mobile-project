import axios from 'axios';
import {JOB} from '../api';
import {SET_JOBS, LOAD_JOBS, GLOBALS, REQUEST_ERROR} from './../constants';
import {setLoading} from './loading.action';
import store from './../store';

export const setJobs = (payload) => ({type: SET_JOBS, payload});
export const loadJobs = (payload) => ({type: LOAD_JOBS, payload});
export const setError = (payload) => ({type: REQUEST_ERROR, payload});

export const getJobs = (page) => (dispatch, getState) => {
  dispatch(setLoading(true));
  axios
    .get(JOB.GET_JOBS(page), {
      headers: {
        Authorization: `Token ${GLOBALS.AUTH_TOKEN}`,
      },
    })
    .then((jobs) => {
      if (page === 1) {
        dispatch(setJobs({jobs: jobs.data.data, page}));
      }
      if (store.getState().JobReducer.page !== page) {
        dispatch(loadJobs({jobs: jobs.data.data, page}));
        dispatch(setLoading(false));
      }
    })
    .catch((error) => {
      dispatch(setError({error: error.response.status}));
      dispatch(setLoading(false));
    });
};
