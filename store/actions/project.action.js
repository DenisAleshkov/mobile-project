import {
  SET_PICKUP_SITES,
  SET_DROPOF_SITES,
  SET_JOB_DETAILS,
  SET_TRUCKS,
  SET_HAULERS,
} from './../constants';

export const setPickUpSites = (payload) => ({type: SET_PICKUP_SITES, payload});
export const setDropOfSites = (payload) => ({type: SET_DROPOF_SITES, payload});
export const setJobDetails = (payload) => ({type: SET_JOB_DETAILS, payload});
export const setTrucks = (payload) => ({type: SET_TRUCKS, payload});
export const setHaulers = (payload) => ({type: SET_HAULERS, payload});
