import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

const Toast = ({toasts}) =>
  toasts !== null &&
  toasts.length > 0 && (
    <View style={styles.container}>
      {toasts.map(toast => (
        <TouchableOpacity
          key={toast.id}
          style={styles.textWrap}
          onPress={() => {}}>
          <Text style={styles.text}>{toast.message}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height / 10, // 15 padding bottom
    left: width / 20,
    right: width / 20, // padding horizontal
    alignItems: 'center',
    zIndex: 9999,
  },
  textWrap: {
    backgroundColor: 'rgba(60,60,60,0.9)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  text: {
    color: '#FFFFFF',
  },
});

const mapStateToProps = state => ({
  toasts: state.toast,
});

export default connect(mapStateToProps)(Toast);
