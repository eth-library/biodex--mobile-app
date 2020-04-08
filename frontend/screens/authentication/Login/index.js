import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Switch,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useSelector, useDispatch } from 'react-redux';

import formReducer from '../formReducer';
import Theme from '../../../theme';
import { authStyles } from '../styles';
import Logo from '../../../assets/logo.jpg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import TermsAndConditions from '../../../components/TermsAndConditions';
import { userLoginAsyncAction } from '../../../store/actions/auth';

const initialState = {
  values: {
    email: '',
    password: '',
  },
  validities: {
    email: false,
    password: false,
  },
  isValid: false,
  submitted: false,
};

const Login = ({ navigation }) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const passwordRef = React.createRef();

  const submitHandler = useCallback(async () => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }
    setIsLoading(true);
    await dispatch(userLoginAsyncAction(formState.values, stayLoggedIn));
    setIsLoading(false);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            <Text style={authStyles.formTitle}>Login</Text>
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
              returnKeyType='done'
              onSubmitEditing={() => Keyboard.dismiss()}
              ref={passwordRef}
              submitted={formState.submitted}
            />
            <View style={styles.stayLoggedInContainer}>
              <View style={styles.switchContainer}>
                <Switch
                  value={stayLoggedIn}
                  onValueChange={setStayLoggedIn}
                  thumbColor={
                    Platform.OS === 'android' && stayLoggedIn
                      ? Theme.colors.accent
                      : Theme.colors.white
                  }
                />
              </View>
              <Text>Stay Logged In</Text>
            </View>
            <Button
              title='LOGIN'
              onPress={submitHandler}
              isLoading={isLoading}
              error={error && error.general}
            />
            <View style={authStyles.center}>
              <Text style={authStyles.text}>Don't have an account?</Text>
              <Text style={authStyles.link} onPress={() => navigation.navigate('Registration')}>
                Sign up here
              </Text>
            </View>
            <Text style={authStyles.link} onPress={() => navigation.navigate('ResetPassword')}>
              Reset Password
            </Text>
            <TermsAndConditions />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'center',
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

export default Login;
