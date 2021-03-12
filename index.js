import React from 'react';
import JobScreen from './src/screens/JobScreen/JobScreen';
import ProjectScreen from './src/screens/ProjectScreen/ProjectScreen';
import Payload from './src/screens/ProjectScreen/components/Payload/Payload';
import JobDetails from './src/screens/ProjectScreen/components/JobDetails/JobDetails';
import JobSites from './src/screens/ProjectScreen/components/JobSites/JobSites';
import MyTrucks from "./src/screens/ProjectScreen/components/MyTrucks/MyTrucks"
import {Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store/store';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

Navigation.registerComponent('Logo', () => Logo);

const Logo = () => {
  return (
    <Image
      source={require('./src/assets/logo.jpeg')}
      style={{width: 40, height: 40}}
    />
  );
};

const bottomTabs = (icons) => ({
  id: 'BOTTOM_TABS_LAYOUT',
  children: [
    {
      stack: {
        id: 'ProjectScreen_TAB',
        children: [
          {
            component: {
              id: 'Project_SCREEN',
              name: 'ProjectScreen',
            },
            component: {
              id: 'JobSites_SCREEN',
              name: 'JobSites',
            },
            component: {
              id: 'Payload_SCREEN',
              name: 'Payload',
            },
            component: {
              id: 'JobDetails_SCREEN',
              name: 'JobDetails',
            },
            component: {
              id: 'MyTrucks_SCREEN',
              name: 'MyTrucks',
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
        id: 'JobScreen_TAB',
        children: [
          {
            component: {
              id: 'Job_SCREEN',
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
    component: {
      name: 'Logo',
    },
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
  leftButtons: [
    {
      id: 'arrow-left',
      icon: icons.arrowLeft,
    },
  ],
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
