import React, {useEffect, useRef} from 'react';
import {NavigationActions} from 'react-navigation';
import {useSelector} from 'react-redux';

import AppNavigation from './AppNavigation';

const NavigationContainer = () => {
  const navRef = useRef();
  const auth = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!auth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [auth]);

  return <AppNavigation ref={navRef} />;
};

export default NavigationContainer;
