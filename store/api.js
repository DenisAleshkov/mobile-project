import {GLOBALS} from './constants';

export const JOB = {
  GET_JOBS: (page) => `${GLOBALS.BASE_URL}?page=${page}`,
};
