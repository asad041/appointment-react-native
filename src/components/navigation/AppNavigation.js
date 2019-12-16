import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Dashboard from '../../screens/dashboard';

const authStack = createStackNavigator({
  Login,
  Register,
});

const appStack = createStackNavigator({
  Dashboard,
});

const appSwitch = createSwitchNavigator({
  Auth: authStack,
  App: appStack,
});

const AppNavigation = createAppContainer(appSwitch);

export default AppNavigation;
