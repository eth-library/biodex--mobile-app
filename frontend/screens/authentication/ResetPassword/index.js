import React, { useState, useReducer, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import formReducer from '../formReducer';
import Theme from '../../../theme';
import { authStyles } from '../styles';
import Logo from '../../../assets/logo.jpg';
import Button from '../../../components/Button';
import Input from '../../../components/Input/index.js';
import TermsAndConditions from '../../../components/TermsAndConditions';
import { resetPasswordAsyncAction } from '../../../store/actions/resetPassword';

const ResetPassword = ({ navigation }) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      email: ''
    },
    validities: {
      email: false
    },
    isValid: false,
    submitted: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector(state => state.resetPassword.error);
  const dispatch = useDispatch();
  
  const submitHandler = useCallback(async () => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }
    setIsLoading(true);
    const response = await dispatch(resetPasswordAsyncAction(formState.values.email));
    setIsLoading(false);
    if (response.ok) navigation.navigate('ResetPasswordValidation');
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={authStyles.fullScreenContainer}
        scrollEnabled
        enableOnAndroid={true}
      >
        <Image style={styles.logo} source={Logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ETH Entomological Collection</Text>
          <Text style={styles.title}>Lepi Classification App</Text>
        </View>
        <View style={authStyles.form}>
          <Text style={authStyles.formTitle}>Reset Password</Text>
          <Input
            name='email'
            placeholder={'Email'}
            value={formState.values.email}
            onInputChange={inputChangeHandler}
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='done'
            onSubmitEditing={() => Keyboard.dismiss()}
            required
            email
            submitted={formState.submitted}
          />
          <Button title='SEND' onPress={submitHandler} isLoading={isLoading} error={error && error.email}/>
          <View style={authStyles.center}>
            <Text style={authStyles.text}>Remember your password?</Text>
            <Text style={authStyles.link} onPress={() => navigation.navigate('Login')}>
              Go back to login
            </Text>
            <Text style={authStyles.text}>Already have a token?</Text>
            <Text
              style={authStyles.link}
              onPress={() => navigation.navigate('ResetPasswordValidation')}
            >
              Go to password reset validation
            </Text>
          </View>
          <TermsAndConditions />
        </View>
      </KeyboardAwareScrollView>
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
  link: {
    color: Theme.colors.link
  }
});

export default ResetPassword;
