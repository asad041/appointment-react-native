import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import TouchableCompt from './TouchableCompt';
import Colors from '../../constants/color';

const DefaultButton = ({onPress, buttonStyle, textStyle, text}) => {
  return (
    <TouchableCompt onPress={onPress}>
      <View style={{...styles.button, ...buttonStyle}}>
        <Text style={{...styles.buttonText, ...textStyle}}>{text}</Text>
      </View>
    </TouchableCompt>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    backgroundColor: Colors.primary,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: Colors.border,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
  },
});

export default DefaultButton;
