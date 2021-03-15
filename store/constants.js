export const GLOBALS = {
  BASE_URL: 'https://test-api.truckit.com/api/2/job-orders',
  AUTH_TOKEN: '9d174b2b68106811b0c8f544fe5592faf2db032e',
};

export const SET_JOBS = 'SET_JOBS';

export const SET_LOADING = 'SET_LOADING';
export const SET_REFRESHING = "SET_REFRESHING"
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const SET_PICKUP_SITES = 'SET_PICKUP_SITES';
export const SET_DROPOF_SITES = 'SET_DROPOF_SITES';
export const SET_JOB_DETAILS = 'SET_JOB_DETAILS';
export const SET_TRUCKS = 'SET_TRUCKS';
export const SET_HAULERS = 'SET_HAULERS';

export const SET_STEP = 'SET_STEP';

export const LOAD_JOBS = 'LOAD_JOBS';

export const firstStep = [
  {
    fillCircle: true,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: false,
    label: 'Payload',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Job Details',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Job Sites',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'My Trucks',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Haulers',
  },
];

export const secondStep = [
  {
    fillCircle: true,
    renderIcon: true,
    fillLabel: true,
    filLine: true,
    renderLine: false,
    label: 'Payload',
  },
  {
    fillCircle: true,
    renderIcon: false,
    fillLabel: false,
    filLine: true,
    renderLine: true,
    label: 'Job Details',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Job Sites',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'My Trucks',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Haulers',
  },
];

export const thirdStep = [
  {
    fillCircle: true,
    renderIcon: true,
    fillLabel: true,
    filLine: true,
    renderLine: false,
    label: 'Payload',
  },
  {
    fillCircle: true,
    renderIcon: true,
    fillLabel: true,
    filLine: true,
    renderLine: true,
    label: 'Job Details',
  },
  {
    fillCircle: true,
    renderIcon: false,
    fillLabel: false,
    filLine: true,
    renderLine: true,
    label: 'Job Sites',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'My Trucks',
  },
  {
    fillCircle: false,
    renderIcon: false,
    fillLabel: false,
    filLine: false,
    renderLine: true,
    label: 'Haulers',
  },
];
