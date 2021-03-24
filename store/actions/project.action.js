import {
  SET_PICKUP_SITES,
  SET_DROPOF_SITES,
  SET_TRUCKS,
  SET_HAULERS,
  SET_CREATED_PROJECT,
} from './../constants';

export const setPickUpSites = (payload) => ({type: SET_PICKUP_SITES, payload});
export const setDropOfSites = (payload) => ({type: SET_DROPOF_SITES, payload});
export const setTrucks = (payload) => ({type: SET_TRUCKS, payload});
export const setHaulers = (payload) => ({type: SET_HAULERS, payload});
export const setCreatedProject = (payload) => ({
  type: SET_CREATED_PROJECT,
  payload,
});
