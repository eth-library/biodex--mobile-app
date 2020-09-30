import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useCallback, useReducer, useState } from 'react';
import { Alert, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Input from '../../../components/Input/index.js';
import Logo from '../../../components/Logo';
import TermsAndConditions from '../../../components/TermsAndConditions';
import { resetPasswordValidationAsyncAction } from '../../../store/actions/resetPassword';
import Theme from '../../../theme';
import formReducer from '../formReducer';
import { authStyles } from '../styles';


const ResetPasswordValidation = ({ navigation }) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      email: useSelector((state) => state.resetPassword.email),
      password: '',
      password_repeat: '',
      code: '',
    },
    validities: {
      email: true,
      password: false,
      password_repeat: false,
      code: false,
    },
    isValid: false,
    submitted: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state.resetPassword.error);
  const dispatch = useDispatch();
  const passwordRef = React.createRef();
  const passwordRepeatRef = React.createRef();
  const codeRef = React.createRef();

  const submitHandler = useCallback(async () => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }
    setIsLoading(true);
    const response = await dispatch(resetPasswordValidationAsyncAction(formState.values));
    setIsLoading(false);
    if (response && response.ok) navigation.navigate('Login');
  }, [formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: 'FORM_INPUT_UPDATE',
        name: inputIdentifier,
        value: inputValue,
        isValid: inputValidity,
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
        enableAutomaticScroll
        enableOnAndroid={true}
      >
        <Logo style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ETH Entomological Collection</Text>
          <Text style={styles.title}>Lepi Classification App</Text>
        </View>
        <View style={authStyles.form}>
          <Text style={authStyles.formTitle}>Password Reset Validation</Text>
          <Input
            name='email'
            placeholder={'Email'}
            value={formState.values.email}
            onInputChange={inputChangeHandler}
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            required
            email
            valid
            touched
            submitted={formState.submitted}
            errorText={error && error.email}
          />
          <Input
            name='password'
            placeholder={'Password'}
            value={formState.values.password}
            onInputChange={inputChangeHandler}
            secureTextEntry
            required
            autoCapitalize='none'
            returnKeyType='next'
            ref={passwordRef}
            onSubmitEditing={() => passwordRepeatRef.current.focus()}
            passwordCheck
            submitted={formState.submitted}
            errorText={error && error.password}
          />
          <Input
            name='password_repeat'
            placeholder={'Repeat Password'}
            value={formState.values.password_repeat}
            onInputChange={inputChangeHandler}
            secureTextEntry
            required
            autoCapitalize='none'
            returnKeyType='next'
            ref={passwordRepeatRef}
            onSubmitEditing={() => codeRef.current.focus()}
            errorText={
              formState.values.password_repeat === formState.values.password
                ? false
                : 'Passwords do not match'
            }
            submitted={formState.submitted}
          />
          <Input
            name='code'
            placeholder={'Code'}
            value={formState.values.code}
            onInputChange={inputChangeHandler}
            keyboardType='numeric'
            required
            autoCapitalize='none'
            returnKeyType='done'
            ref={codeRef}
            onSubmitEditing={() => Keyboard.dismiss()}
            submitted={formState.submitted}
            errorText={error && error.code}
          />
          <Button
            title='RESET'
            onPress={submitHandler}
            isLoading={isLoading}
            error={error && error.general}
          />
          <View style={authStyles.center}>
            <Text style={authStyles.text}>Remember your password?</Text>
            <Text style={authStyles.link} onPress={() => navigation.navigate('Login')}>
              Sign in!
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
    marginTop: Theme.space.vertical.medium,
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
  },
  stayLoggedInContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: Theme.space.vertical.xSmall,
  },
  switchContainer: {
    transform:
      Platform.OS === 'ios'
        ? [{ scaleX: 0.5 }, { scaleY: 0.5 }]
        : [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  link: {
    color: Theme.colors.link,
  },
});

export default ResetPasswordValidation;
