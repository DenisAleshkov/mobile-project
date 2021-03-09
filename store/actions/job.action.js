import axios from 'axios';
import {JOB} from '../api';
import {SET_JOBS, LOAD_JOBS, GLOBALS, REQUEST_ERROR} from './../constants';
import {setLoading} from './loading.action';

export const setJobs = (payload) => ({type: SET_JOBS, payload});
export const loadJobs = (payload) => ({type: LOAD_JOBS, payload});
export const setError = (payload) => ({type: REQUEST_ERROR, payload});

export const getJobs = (currentPage) => (dispatch, getState) => {
  dispatch(setLoading(true));
  const {page} = getState().JobReducer;
  axios
    .get(JOB.GET_JOBS(page), {
      headers: {
        Authorization: `Token ${GLOBALS.AUTH_TOKEN}`,
      },
    })
    .then((jobs) => {
      if (currentPage === 1) {
        dispatch(setJobs({jobs: jobs.data.data, currentPage}));
      }
      if (page !== currentPage) {
        dispatch(loadJobs({jobs: jobs.data.data, currentPage}));
        dispatch(setLoading(false));
      }
    })
    .catch((error) => {
      console.log('error', error.response)
      dispatch(setError({error: 'something wrong'}));
      dispatch(setLoading(false));
    });
};
