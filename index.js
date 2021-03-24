import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import JobScreen from './src/screens/JobScreen/JobScreen';
import ProjectScreen from './src/screens/ProjectScreen/ProjectScreen';
import CreateProject from './src/screens/ProjectScreen/CreateProject';
import Payload from './src/screens/ProjectScreen/components/Payload/Payload';
import JobDetails from './src/screens/ProjectScreen/components/JobDetails/JobDetails';
import JobSites from './src/screens/ProjectScreen/components/JobSites/JobSites';
import MyTrucks from './src/screens/ProjectScreen/components/MyTrucks/MyTrucks';
import Haulers from './src/screens/ProjectScreen/components/Haulers/Haulers';
import StepperContainer from './src/screens/ProjectScreen/StepperContainer';
import DropOffModal from './src/screens/ProjectScreen/components/JobSites/components/DropOffModal';
import PickUpModal from './src/screens/ProjectScreen/components/JobSites/components/PickUpModal';
import HaulersModal from './src/screens/ProjectScreen/components/Haulers/components/HaulersModal';
import MyTrucksModal from './src/screens/ProjectScreen/components/MyTrucks/components/MyTrucksModal';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store/store';

Navigation.registerComponentWithRedux(
  'MyTrucksModal',
  () => MyTrucksModal,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'HaulersModal',
  () => HaulersModal,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'DropOffModal',
  () => DropOffModal,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'PickUpModal',
  () => PickUpModal,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'CreateProject',
  () => CreateProject,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'StepperContainer',
  () => StepperContainer,
  Provider,
  store,
);
Navigation.registerComponentWithRedux(
  'Payload',
  () => Payload,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'MyTrucks',
  () => MyTrucks,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'Haulers',
  () => Haulers,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'JobDetails',
  () => JobDetails,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'JobSites',
  () => JobSites,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'JobScreen',
  () => JobScreen,
  Provider,
  store,
);

Navigation.registerComponentWithRedux(
  'ProjectScreen',
  () => ProjectScreen,
  Provider,
  store,
);

const bottomTabs = (icons) => ({
  id: 'BOTTOM_TABS_LAYOUT',
  children: [
    {
      stack: {
        id: 'PROJECT_SCREEN_TAB',
        children: [
          {
            component: {
              id: 'HAULERS_SCREEN',
              name: 'Haulers',
            },
            component: {
              id: 'MYTRUCKS_SCREEN',
              name: 'MyTrucks',
            },
            component: {
              id: 'JOBSITES_SCREEN',
              name: 'JobSites',
            },
            component: {
              id: 'JOBDETAILS_SCREEN',
              name: 'JobDetails',
            },
            component: {
              id: 'PAYLOAD_SCREEN',
              name: 'Payload',
            },
            component: {
              id: 'CREATEPROJECT_SCREEN',
              name: 'CreateProject',
            },
            component: {
              id: 'PROJECT_SCREEN',
              name: 'ProjectScreen',
            },
          },
        ],
        options: {
          bottomTab: ProjectScreenBottoTabOptions(icons),
          topBar: ProjectScreenTopBarOptions(icons),
        },
      },
    },
    {
      stack: {
        id: 'JOB_SCREEN_TAB',
        children: [
          {
            component: {
              id: 'JOB_SCREEN',
              name: 'JobScreen',
            },
          },
        ],
        options: {
          bottomTab: JobScreenBottoTabOptions(icons),
          topBar: JobScreenTopBarOptions(icons),
        },
      },
    },
  ],
});

const JobScreenBottoTabOptions = (icons) => ({
  icon: icons.calendar,
  selectedTextColor: '#de8a1d',
  selectedIconColor: '#de8a1d',
  selectedFontSize: 12,
});

const JobScreenTopBarOptions = (icons) => ({
  title: {
    alignment: 'center',
    text: 'Logo',
  },
  rightButtons: [
    {
      id: 'account-hard-hat',
      icon: icons.accountHardHat,
      color: '#737171',
    },
  ],
});

const ProjectScreenBottoTabOptions = (icons) => ({
  icon: icons.calendarText,
  text: 'Projects',
  selectedTextColor: '#de8a1d',
  selectedIconColor: '#de8a1d',
  selectedFontSize: 12,
});

const ProjectScreenTopBarOptions = (icons) => ({
  title: {
    text: 'DISPATCH JOB',
    fontSize: 23,
    fontWeight: '300',
  },
  backButton: {
    id: 'arrow-left',
    icon: icons.arrowLeft,
  },
  rightButtons: [
    {
      id: 'account-hard-hat',
      icon: icons.accountHardHat,
      color: '#737171',
    },
  ],
});

Navigation.events().registerAppLaunchedListener(async () => {
  const calendar = await Icon.getImageSource('calendar', 25);
  const calendarText = await Icon.getImageSource('calendar-text', 25);
  const accountHardHat = await Icon.getImageSource('account-hard-hat', 35);
  const arrowLeft = await Icon.getImageSource('arrow-left', 35);
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs({
        calendar,
        accountHardHat,
        calendarText,
        arrowLeft,
      }),
    },
  });
});
