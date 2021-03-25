import update from 'immutability-helper';
import {SET_JOBS, LOAD_JOBS, REQUEST_ERROR, SET_HAS_MORE} from './../constants';

const initialState = {
  jobs: [
    {
      id: 150296803,
      companyName: 'fgjkt',
      projectName: '5',
      dropOffSites: 'sdf',
    },
    {
      id: 168967893,
      companyName: '4314',
      projectName: '34',
      dropOffSites: 'qfe',
    },
    {
      id: 220678963,
      companyName: 'rqw',
      projectName: '1',
      dropOffSites: 'sdasvasdvf',
    },
    {
      id: 124098923,
      companyName: 'ncxcvb',
      projectName: '43sd',
      dropOffSites: 'sasdvasdvdf',
    },
    {
      id: 102345301,
      companyName: 'fsg',
      projectName: '4311',
      dropOffSites: 'sdzxcvf',
    },
    {
      id: 123498533,
      companyName: 'erer',
      projectName: '1234',
      dropOffSites: 'sd4543f',
    },
    {
      id: 120384130,
      companyName: 'asdf',
      projectName: 'd134asd',
      dropOffSites: 'sdf1234',
    },
    {
      id: 110235423,
      companyName: 'jrtyrty',
      projectName: 'dsadasd',
      dropOffSites: 'sdgwergf',
    },
    {
      id: 123214363,
      companyName: '765434',
      projectName: 'ds1234d',
      dropOffSites: 'sd341f',
    },
    {
      id: 120103463,
      companyName: '235',
      projectName: 'dsadasd',
      dropOffSites: 'sfdsgsdfgdf',
    },
    {
      id: 512123043,
      companyName: 'sdfg',
      projectName: 'ds1234adasd',
      dropOffSites: 'ssdfgdf',
    },
    {
      id: 185276343,
      companyName: 'fgsdfgjkt',
      projectName: 'dsadasd',
      dropOffSites: 'sdsfgf',
    },
    {
      id: 112304245,
      companyName: '542',
      projectName: '432dasd',
      dropOffSites: 'bvcxbv',
    },
    {
      id: 124513003,
      companyName: '234',
      projectName: '234',
      dropOffSites: 'sdbcxcvbf',
    },
    {
      id: 122241033,
      companyName: 'sdf4',
      projectName: 'dsad234asd',
      dropOffSites: 'sxcvbdf',
    },
    {
      id: 125567503,
      companyName: '356',
      projectName: '34',
      dropOffSites: 'sdf5',
    },
    {
      id: 110023023,
      companyName: '14',
      projectName: '1234',
      dropOffSites: 's245df',
    },
    {
      id: 121567343,
      companyName: 'fgjkt',
      projectName: 'd3d',
      dropOffSites: 'sdf42',
    },
    {
      id: 120567812,
      companyName: '6345',
      projectName: 'ds32sd',
      dropOffSites: 'sd45f',
    },
  ],
  page: 1,
  perPage: null,
  error: '',
  hasMore: true,
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return update(state, {
        jobs: {$set: action.payload.jobs},
        page: {$set: action.payload.page},
        perPage: {$set: action.payload.perPage},
      });
    case LOAD_JOBS:
      return update(state, {
        jobs: {$push: action.payload.jobs},
        page: {$set: action.payload.page},
        perPage: {$set: action.payload.perPage},
      });
    case REQUEST_ERROR:
      return update(state, {
        error: {$set: action.payload.error},
      });
    case SET_HAS_MORE:
      return update(state, {
        hasMore: {$set: action.payload},
      });
    default:
      return state;
  }
};

export default JobReducer;
