import React from 'react';
import {Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store/store';
import JobScreen from './src/screens/JobScreen/JobScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Navigation.registerComponentWithRedux(
  'JobScreen',
  () => JobScreen,
  Provider,
  store,
);

Navigation.registerComponent('Logo', () => Logo);

const bottomTabs = (icons) => ({
  id: 'BOTTOM_TABS_LAYOUT',
  children: [
    {
      stack: {
        id: 'JobScreen_TAB',
        children: [
          {
            component: {
              id: 'JobScreen_SCREEN',
              name: 'JobScreen',
            },
          },
        ],
        options: {
          bottomTab: BottoTabOptions(icons),
          topBar: TopBarOptions(icons),
        },
      },
    },
  ],
});

const BottoTabOptions = (icons) => ({
  icon: icons.calendar,
  selectedTextColor: '#de8a1d',
  selectedIconColor: '#de8a1d',
  selectedFontSize: 12,
});

const TopBarOptions = (icons) => ({
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

Navigation.events().registerAppLaunchedListener(async () => {
  const calendar = await Icon.getImageSource('calendar', 25);
  const accountHardHat = await Icon.getImageSource('account-hard-hat', 35);
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs({calendar, accountHardHat}),
    },
  });
});
