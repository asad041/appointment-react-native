import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';

import InputField from '../../components/ui/InputField';
import DefaultButton from '../../components/ui/DefaultButton';
import BottomView from '../../components/ui/BottomView';
import {
  loginUser,
  FormReducer,
  LOG_IN_INPUTS,
  INPUT_UPDATE,
} from '../../store/actions';

const Login = ({navigation, loginUser, auth: {isAuthenticated}}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(FormReducer, LOG_IN_INPUTS);

  const inputChangedHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}]);
      setError(null);
    }
  }, [error]);

  if (isAuthenticated) {
    navigation.navigate({routeName: 'App'});
  }

  const authHandler = async () => {
    Keyboard.dismiss();
    if (formState.formIsValid) {
      setLoading(true);
      await loginUser({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      });
      setLoading(isAuthenticated);
    } else {
      setError('Please make sure your email or password is valid');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Appointment</Text>
          <Text style={styles.subTitle}>Welcome back!</Text>
        </View>
        <InputField
          id="email"
          label="Email address"
          placeholder="Email address"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="next"
          email
          required
          maxLength={255}
          autoCapitalize="none"
          initialValue=""
          errorText="Please make sure your email address is valid"
          onInputChange={inputChangedHandler}
        />
        <InputField
          id="password"
          label="Password"
          placeholder="Password"
          keyboardType="default"
          returnKeyType="done"
          password
          required
          secureTextEntry
          maxLength={25}
          autoCapitalize="none"
          initialValue=""
          errorText="Please make sure your password is valid"
          onInputChange={inputChangedHandler}
        />
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            formState.formIsValid && (
              <DefaultButton text="Login" onPress={authHandler} />
            )
          )}
        </View>
      </View>
      <BottomView
        text="Don't have an account?"
        onPress={() => {
          navigation.navigate({routeName: 'Register'});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  formContainer: {
    width: '100%',
  },
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loginUser})(Login);
