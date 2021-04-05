import {SET_LOADING, SET_REFRESHING} from './../constants';

export const setLoading = (payload) => ({type: SET_LOADING, payload});
export const setRefreshing = (payload) => ({type: SET_REFRESHING, payload});
