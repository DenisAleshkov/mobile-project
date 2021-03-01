import axios from 'axios';
import {JOB} from '../api';
import {SET_JOBS, GLOBALS} from './../constants';

export const setJobs = (payload) => ({type: SET_JOBS, payload});

export const getJobs = () => (dispatch) => {
  axios
    .get(JOB.GET_JOBS(), {
      headers: {
        Authorization: `Token ${GLOBALS.AUTH_TOKEN}`,
      },
    })
    .then((jobs) => {
      dispatch(setJobs(jobs.data.data));
    })
    .catch((error) => {
      console.log('error', error.response);
    });
};
