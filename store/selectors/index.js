import {createSelector} from 'reselect';

export const getJobs = (state) => state.JobReducer.jobs;
