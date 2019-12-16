import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App: () => React$Node = () => {
  // SplashScreen.hide();
  return (
    <View style={styles.screen}>
      <Text>Appointment App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
