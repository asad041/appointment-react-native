import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from './src/store';
import NavigationContainer from './src/components/navigation/NavigationContainer';
import Toast from './src/components/Toast';
import {setAuthToken} from './src/utils/axiosConfig';
import {loadUser} from './src/store/actions';

enableScreens(); // For navigation performance

const App: () => React$Node = () => {
  useEffect(() => {
    const token = AsyncStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      store.dispatch(loadUser());
    }
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer />
      <Toast />
    </Provider>
  );
};

export default App;
