import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './App';
import Icon from 'react-native-vector-icons/MaterialIcons';


Navigation.registerComponentWithRedux('HomeScreen', () => App, Provider, store);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'HomeScreen',
                    options: {
                      bottomTab: {
                        text: "MyJobs",
                      }
                    }
                  },
                },
              ],
              options: {
                bottomTab: {
                  selectedTextColor: '#de8a1d',
                  selectedIconColor: '#de8a1d',
                  selectedFontSize: 12,
                },
              },
            },
          },
        ],
      },
    },
  });
});
