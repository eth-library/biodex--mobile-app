import React, { useReducer, useState, useCallback, Fragment } from 'react';
import { Text, View, Platform, Picker, StyleSheet, Alert, TouchableOpacity, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenOrientation } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { authStyles } from '../styles';
import Theme from '../../../theme';
import formReducer from '../formReducer';
import { userRegistrationValidationAsyncAction } from '../../../store/actions/registration';

const Registration = ({ navigation }) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      fullName: '',
      email: '',
      userType: 'Student',
      code: '',
      password: '',
      passwordRepeat: ''
    },
    validities: {
      fullName: false,
      email: false,
      userType: false,
      code: false,
      password: false,
      passwordRepeat: false,
      showIosPicker: false
    },
    isValid: false,
    submitted: false
  });
  const [showIosPicker, setShowIosPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector(state => state.registration.error);
  const dispatch = useDispatch();
  const emailRef = React.createRef();
  const codeRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordRepeatRef = React.createRef();

  const submitHandler = useCallback(async () => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }
    setIsLoading(true);
    const response = await dispatch(userRegistrationValidationAsyncAction(formState.values));
    setIsLoading(false);
    if (response.status === 200) navigation.navigate('Login');
  }, [formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue) => {
      dispatchFormState({
        type: 'FORM_INPUT_UPDATE',
        name: inputIdentifier,
        value: inputValue,
        isValid: true
      });
    },
    [dispatchFormState]
  );

  return (
    <Fragment>
      {!showIosPicker && (
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={authStyles.fullScreenContainer}
            scrollEnabled
            enableOnAndroid={true}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create an account</Text>
              <Text style={styles.inviteHint}>You need to get invited to receive a validation code and join Lepi.</Text>
            </View>
            <View style={{ ...authStyles.form, ...styles.form }}>
              <Input
                name='fullName'
                placeholder={'Full Name'}
                value={formState.values.fullName}
                onInputChange={inputChangeHandler}
                returnKeyType='next'
                onSubmitEditing={() => emailRef.current.focus()}
                required
                submitted={formState.submitted}
                errorText={error && error.full_name}
              />
              <Input
                name='email'
                placeholder={'Email'}
                value={formState.values.email}
                onInputChange={inputChangeHandler}
                keyboardType='email-address'
                ref={emailRef}
                returnKeyType='next'
                onSubmitEditing={() => codeRef.current.focus()}
                autoCapitalize='none'
                required
                submitted={formState.submitted}
                errorText={error && error.email}
              />
              <Input
                name='code'
                placeholder={'Validation code'}
                value={formState.values.code}
                onInputChange={inputChangeHandler}
                keyboardType='number-pad'
                ref={codeRef}
                returnKeyType='next'
                onSubmitEditing={() => setShowIosPicker(!showIosPicker)}
                autoCapitalize='none'
                required
                submitted={formState.submitted}
                errorText={error && error.code}
              />
              {Platform.OS === 'android' && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formState.values.userType}
                    style={styles.picker}
                    itemStyle={styles.pickerItems} // works only for IOS
                    onValueChange={(itemValue, itemIndex) =>
                      inputChangeHandler('userType', itemValue)
                    }
                    mode='dropdown'
                  >
                    <Picker.Item label='Student' value='Student' />
                    <Picker.Item label='Expert' value='Expert' />
                  </Picker>
                </View>
              )}
              {Platform.OS === 'ios' && !showIosPicker && (
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() => setShowIosPicker(!showIosPicker)}
                >
                  <Input
                    editable={false}
                    pointerEvents='none'
                    placeholder={formState.values.userType}
                    placeholderTextColor={Theme.colors.grey}
                    value={formState.values.userType}
                    onInputChange={() => {}}
                  />
                </TouchableOpacity>
              )}
              <Input
                name='password'
                placeholder={'Password'}
                value={formState.values.password}
                onInputChange={inputChangeHandler}
                secureTextEntry
                ref={passwordRef}
                returnKeyType='next'
                onSubmitEditing={() => passwordRepeatRef.current.focus()}
                autoCapitalize='none'
                required
                passwordCheck
                submitted={formState.submitted}
              />
              <Input
                name='passwordRepeat'
                placeholder={'Repeat Password'}
                value={formState.values.passwordRepeat}
                onInputChange={inputChangeHandler}
                secureTextEntry
                ref={passwordRepeatRef}
                returnKeyType='done'
                onSubmitEditing={() => Keyboard.dismiss()}
                autoCapitalize='none'
                required
                errorText={
                  formState.values.passwordRepeat === formState.values.password
                    ? false
                    : 'Passwords do not match'
                }
                submitted={formState.submitted}
              />
              <Button
                title={'Create your Account'}
                isLoading={isLoading}
                onPress={submitHandler}
                error={error && error.global}
              />
              <View style={authStyles.center}>
                <Text style={authStyles.text}>Already have an account?</Text>
                <Text style={authStyles.link} onPress={() => navigation.navigate('Login')}>
                  Sign in!
                </Text>
              </View>
              <Text style={authStyles.terms}>
                By using this App, You, the user of the App, confirm your acceptance of the App
                terms of use ('App Terms'). If you do not agree to these App Terms, you must
                immediately uninstall the App and discontinue its use. These App Terms should be
                read alongside our <Text style={authStyles.termLink}>Privacy Policy</Text> and{' '}
                <Text style={authStyles.termLink}>Cookie Policy</Text>.
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
      {Platform.OS === 'ios' && showIosPicker && (
        <Picker
          selectedValue={formState.values.userType}
          style={styles.picker}
          itemStyle={styles.pickerItems}
          onValueChange={(itemValue, itemIndex) => {
            setShowIosPicker(false);
            inputChangeHandler('userType', itemValue, itemValue !== 'userType');
          }}
        >
          <Picker.Item label='Student' value='Student' />
          <Picker.Item label='Expert' value='Expert' />
        </Picker>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
    marginBottom: Theme.space.vertical.xxSmall
  },
  inviteHint: {
    textAlign: 'center',
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeXS,
    color: Theme.colors.black,
    width: 200
  },
  form: {
    flex: 1
  },
  pickerContainer: {
    height: 40,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    borderRadius: Theme.borders.radius,
    marginBottom: Theme.space.vertical.xSmall
  },
  picker: {
    color: Theme.colors.grey,
    height: '100%',
    width: '100%',
    borderRadius: Theme.borders.radius,
    fontFamily: Theme.fonts.fontFamily,
    fontSize: Theme.fonts.sizeM,
    justifyContent: 'center'
  },
  pickerItems: {
    fontFamily: Theme.fonts.fontFamily
  }
});

export default Registration;
