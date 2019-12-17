import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import Dashboard from '../../screens/dashboard';
import Seller from '../../screens/seller';

const noHeader = {headerStyle: {borderBottomWidth: 0, elevation: 0}};
const authStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: noHeader,
  },
  Register: {screen: Register, navigationOptions: noHeader},
});

const appStack = createStackNavigator({
  Dashboard: {screen: Dashboard, navigationOptions: {title: 'Dashboard'}},
  Seller: {screen: Seller, navigationOptions: {title: 'Seller Info'}},
});

const appSwitch = createSwitchNavigator({
  Auth: authStack,
  App: appStack,
});

const AppNavigation = createAppContainer(appSwitch);

export default AppNavigation;
