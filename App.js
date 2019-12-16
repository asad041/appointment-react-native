import React from 'react';
import {Text} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './src/store';
import AppNavigation from './src/components/navigation/AppNavigation';
import Toast from './src/components/Toast';

enableScreens(); // For navigation performance

const App: () => React$Node = () => {
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <AppNavigation />
      <Toast />
    </Provider>
  );
};

export default App;
