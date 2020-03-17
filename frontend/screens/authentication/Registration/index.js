import React, { useReducer, useState, useCallback, Fragment } from 'react';
import {
  Text,
  View,
  Platform,
  Picker,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { authStyles } from '../styles';
import Theme from '../../../theme';
import formReducer from '../formReducer';

const Registration = props => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      fullName: '',
      email: '',
      userType: 'userType',
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

  const submitHandler = useCallback(() => {
    dispatchFormState({ type: 'SUBMITTED' });
    if (!formState.isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
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
            </View>
            <View style={{ ...authStyles.form, ...styles.form }}>
              <Input
                name='fullName'
                placeholder={'Full Name'}
                value={formState.values.fullName}
                onInputChange={inputChangeHandler}
                returnKeyType='next'
                required
                submitted={formState.submitted}
              />
              <Input
                name='email'
                placeholder={'Email'}
                value={formState.values.email}
                onInputChange={inputChangeHandler}
                keyboardType='email-address'
                returnKeyType='next'
                required
                submitted={formState.submitted}
              />
              <Input
                name='code'
                placeholder={'Validation code'}
                value={formState.values.code}
                onInputChange={inputChangeHandler}
                keyboardType='number-pad'
                returnKeyType='next'
                required
                submitted={formState.submitted}
              />
              {Platform.OS === 'android' && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formState.values.userType}
                    style={styles.picker}
                    itemStyle={styles.pickerItems} // works only for IOS
                    onValueChange={(itemValue, itemIndex) =>
                      inputChangeHandler('userType', itemValue, itemValue !== 'userType')
                    }
                    mode='dropdown'
                  >
                    <Picker.Item label='User Type' value='userType'></Picker.Item>
                    <Picker.Item label='Student' value='student' />
                    <Picker.Item label='Expert' value='expert' />
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
                returnKeyType='next'
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
                returnKeyType='next'
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
                color={Platform.OS === 'ios' ? Theme.colors.white : Theme.colors.primary}
                onPress={submitHandler}
              />
              <View style={authStyles.center}>
                <Text style={authStyles.text}>Already have an account?</Text>
                <Text style={authStyles.link} onPress={() => props.navigation.navigate('Login')}>
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
          <Picker.Item label='User Type' value='userType'></Picker.Item>
          <Picker.Item label='Student' value='student' />
          <Picker.Item label='Expert' value='expert' />
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
    color: Theme.colors.black
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
