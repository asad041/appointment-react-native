import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import Colors from '../../constants/color';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputField = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangedHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)[0-9a-zA-Z]{5,20}$/;
    const usernameRegex = /^([a-zA-Z](([\._\-][a-zA-Z0-9])|[a-zA-Z0-9])*[a-z0-9])$/;
    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.maxLength != null && text.length > props.maxLength) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.password && !passwordRegex.test(text)) {
      isValid = false;
    }
    if (props.username && !usernameRegex.test(text)) {
      isValid = false;
    }

    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View style={styles.inputContainer}>
      {inputState.value !== '' && props.label !== '' && (
        <Text style={styles.label}>{props.label}</Text>
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            borderBottomColor:
              !inputState.isValid && inputState.touched
                ? Colors.red
                : Colors.border,
          },
        ]}
        value={inputState.value}
        onChangeText={textChangedHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && props.errorText !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 11,
    color: Colors.blur,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    width: '100%',
    fontSize: 11,
    color: Colors.red,
    textAlign: 'right',
  },
});

export default InputField;
