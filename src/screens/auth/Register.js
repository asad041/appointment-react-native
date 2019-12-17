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
  registerUser,
  FormReducer,
  REGISTER_INPUTS,
  INPUT_UPDATE,
} from '../../store/actions';

const Register = ({navigation, registerUser, auth: {isAuthenticated}}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(
    FormReducer,
    REGISTER_INPUTS,
  );

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

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate({routeName: 'App'});
    }
  }, [isAuthenticated]);

  const authHandler = async () => {
    Keyboard.dismiss();
    if (formState.formIsValid) {
      setLoading(true);
      await registerUser({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
        name: formState.inputValues.name,
      });
      setLoading(isAuthenticated);
    } else {
      setError('Please make sure all fields are filled up');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Appointment</Text>
          <Text style={styles.subTitle}>Register now!</Text>
        </View>
        <InputField
          id="name"
          label="Fullname"
          placeholder="Fullname"
          keyboardType="default"
          returnKeyType="next"
          required
          minLength={2}
          maxLength={255}
          autoCapitalize="none"
          initialValue=""
          errorText="Please make sure your fullname is valid"
          onInputChange={inputChangedHandler}
        />
        <InputField
          id="email"
          label="Email address"
          placeholder="Email address"
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
          returnKeyType="next"
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
              <DefaultButton text="Register" onPress={authHandler} />
            )
          )}
        </View>
      </View>
      <BottomView
        text="Already have an account?"
        onPress={() => {
          navigation.navigate({routeName: 'Login'});
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

export default connect(mapStateToProps, {registerUser})(Register);
