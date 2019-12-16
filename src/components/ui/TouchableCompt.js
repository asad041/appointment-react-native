import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const TouchableCompt = props => {
  let Compt = TouchableOpacity;

  // if (Platform.OS === 'android' && Platform >= 21) {
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Compt = TouchableNativeFeedback;
  }

  return <Compt {...props} />;
};

export default TouchableCompt;
