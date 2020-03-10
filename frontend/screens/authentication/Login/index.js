import React, { useReducer, useCallback } from 'react';
import { View, Image, Text, StyleSheet, Switch, Platform, Alert } from 'react-native';
import { ScreenOrientation } from 'expo';

import formReducer from '../formReducer';
import Theme from '../../../theme';
import { authStyles } from '../styles';
import Logo from '../../../assets/logo.png';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input/index.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = props => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      email: '',
      password: ''
    },
    validities: {
      email: false,
      password: false
    },
    isValid: false,
    submitted: false
  });

  const submitHandler = useCallback(() => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'OK' }]);
      return;
    }
    console.log('SUBMIT');
  }, [formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: 'FORM_INPUT_UPDATE',
        name: inputIdentifier,
        value: inputValue,
        isValid: inputValidity
      });
    },
    [dispatchFormState]
  );

  return (
    <SafeAreaView style={authStyles.fullScreenContainer}>
      <Image style={styles.logo} source={Logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ETH Entomological Collection</Text>
        <Text style={styles.title}>Lepi Classification App</Text>
      </View>
      <View style={authStyles.form}>
        <Text style={authStyles.formTitle}>Login</Text>
        <Input
          name='email'
          placeholder={'Email'}
          value={formState.values.email}
          onInputChange={inputChangeHandler}
          keyboardType='email-address'
          autoCapitalize='none'
          returnKeyType='next'
          required
          email
          submitted={formState.submitted}
        />
        <Input
          name='password'
          placeholder={'Password'}
          value={formState.values.password}
          onInputChange={inputChangeHandler}
          secureTextEntry
          required
          autoCapitalize='none'
          returnKeyType='send'
          submitted={formState.submitted}
        />
        <View style={styles.stayLoggedInContainer}>
          <View style={styles.switchContainer}>
            <Switch />
          </View>
          <Text>Stay Logged In</Text>
        </View>
        <Button
          title={'LOGIN'}
          color={Platform.OS === 'ios' ? Theme.colors.white : Theme.colors.primary}
          onPress={submitHandler}
          style={{ marginBottom: Theme.space.vertical.xSmall }}
        />
        <View style={authStyles.center}>
          <Text style={authStyles.text}>Don't have an account?</Text>
          <Text style={authStyles.link} onPress={() => props.navigation.navigate('Registration')}>
            Sign up here
          </Text>
        </View>
        <Text style={authStyles.link} onPress={() => props.navigation.navigate('ResetPassword')}>
          Reset Password
        </Text>
        <Text style={authStyles.terms}>
          By using this App, You, the user of the App, confirm your acceptance of the App terms of
          use ('App Terms'). If you do not agree to these App Terms, you must immediately uninstall
          the App and discontinue its use. These App Terms should be read alongside our{' '}
          <Text style={styles.link}>Privacy Policy</Text> and{' '}
          <Text style={styles.link}>Cookie Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'center',
    marginTop: Theme.space.vertical.medium
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black
  },
  stayLoggedInContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: Theme.space.vertical.xSmall
  },
  switchContainer: {
    transform:
      Platform.OS === 'ios'
        ? [{ scaleX: 0.5 }, { scaleY: 0.5 }]
        : [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  },
  link: {
    color: Theme.colors.link
  }
});

export default Login;
