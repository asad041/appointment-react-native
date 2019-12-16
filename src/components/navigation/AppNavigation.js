import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../../screens/auth/Login';

const authStack = createStackNavigator({
  Login,
});

const appSwitch = createSwitchNavigator({
  Auth: authStack,
});

const AppNavigation = createAppContainer(appSwitch);

export default AppNavigation;
