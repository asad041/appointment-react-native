import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/color';

const BottomView = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textWrap} onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height / 10,
    left: width / 20,
    right: width / 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  textWrap: {
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.blur,
  },
  textLink: {},
});

export default BottomView;
