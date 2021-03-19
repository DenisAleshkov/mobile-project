import axios from 'axios';
import {JOB} from '../api';
import {
  SET_JOBS,
  LOAD_JOBS,
  GLOBALS,
  REQUEST_ERROR,
  SET_HAS_MORE,
  SET_REFRESHING,
} from './../constants';
import {setLoading} from './loading.action';

export const setJobs = (payload) => ({type: SET_JOBS, payload});
export const loadJobs = (payload) => ({type: LOAD_JOBS, payload});
export const setError = (payload) => ({type: REQUEST_ERROR, payload});
export const setRefreshign = (payload) => ({type: SET_REFRESHING, payload});
export const setHasMore = (payload) => ({type: SET_HAS_MORE, payload});

export const getJobs = (currentPage) => (dispatch, getState) => {
  dispatch(setLoading(true));
  axios
    .get(JOB.GET_JOBS(currentPage), {
      headers: {
        Authorization: `Token ${GLOBALS.AUTH_TOKEN}`,
      },
    })
    .then((jobs) => {
      if (currentPage === 1) {
        dispatch(setRefreshign(true));
        dispatch(
          setJobs({
            jobs: jobs.data.data,
            page: currentPage + 1,
            perPage: jobs.data.meta.pePage,
          }),
        );
        dispatch(setRefreshign(false));
      } else {
        dispatch(
          loadJobs({
            jobs: jobs.data.data,
            page: currentPage + 1,
            perPage: jobs.data.meta.pePage,
          }),
        );
      }
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log('error', error);
      dispatch(setError({error: 'something wrong'}));
      dispatch(setLoading(false));
    });
};
