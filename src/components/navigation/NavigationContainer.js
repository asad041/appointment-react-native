import React, {useEffect, useRef} from 'react';
import {NavigationActions} from 'react-navigation';
import {useSelector} from 'react-redux';

import AppNavigation from './AppNavigation';

const NavigationContainer = () => {
  const navRef = useRef();
  const {isAuthenticated} = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [isAuthenticated]);

  return <AppNavigation ref={navRef} />;
};

export default NavigationContainer;
