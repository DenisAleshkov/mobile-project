
import {
  SET_PICKUP_SITES,
  SET_DROPOF_SITES,
  SET_JOB_DETAILS,
  SET_TRUCKS,
  SET_HAULERS,
  SET_CREATED_PROJECT,
  SET_ACTIVE_ERROR
} from './../constants';

export const setPickUpSites = (payload) => ({type: SET_PICKUP_SITES, payload});
export const setDropOfSites = (payload) => ({type: SET_DROPOF_SITES, payload});
export const setJobDetails = (payload) => ({type: SET_JOB_DETAILS, payload});
export const setTrucks = (payload) => ({type: SET_TRUCKS, payload});
export const setHaulers = (payload) => ({type: SET_HAULERS, payload});
export const setCreatedProject = payload => ({type: SET_CREATED_PROJECT, payload})
export const setActiveError = payload => ({type: SET_ACTIVE_ERROR, payload})
