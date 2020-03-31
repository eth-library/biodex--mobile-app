import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, TextInput, StyleSheet, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import SnackBar from 'react-native-snackbar-component';

import Button from '../../components/Button';
import Logo from '../../assets/logo.png';
import Theme from '../../theme';
import { sendInvitationAsyncAction } from '../../store/actions/invitation';

const Invitation = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);
  const error = useSelector(state => state.invitation.error);
  const dispatch = useDispatch();

  const checkValidities = text => {
    let validity = true;
    let errorText = null;
    // check for valid email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(text.toLowerCase())) {
      validity = false;
      errorText = 'Please enter a valid email address';
    }
    // check for required fields
    if (text.trim().length === 0) {
      validity = false;
      errorText = 'This field is required';
    }
    setIsValid(validity);
    setLocalError(errorText);
  };

  const onBlurHandler = () => {
    checkValidities(email);
    setTouched(true);
  };

  const submitHandler = async () => {
    if (!touched) {
      checkValidities(email);
      setTouched(true);
    }
    if (!isValid) {
      Alert.alert('Invalid input', 'Please check the errors in the form', [{ text: 'OK' }]);
      return;
    }
    setIsLoading(true);
    const response = await dispatch(sendInvitationAsyncAction(email));
    if (response.status === 200) successHandler();
    setIsLoading(false);
  };

  const successHandler = () => {
    setSuccess(true);
    setLocalError(null);
    setTouched(false);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled
        enableOnAndroid={true}
      >
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.title}>ETH Entomological Collection</Text>
          <Text style={styles.title}>Lepi Classification App</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Send invitation to new user</Text>
          <TextInput
            name='email'
            placeholder={'Email'}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='done'
            onSubmitEditing={() => Keyboard.dismiss()}
            style={styles.input}
            onBlur={onBlurHandler}
          />
          {localError && touched && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{localError}</Text>
            </View>
          )}
          <Button
            title='SEND'
            onPress={submitHandler}
            isLoading={isLoading}
            error={error && error.email}
          />
        </View>
      </KeyboardAwareScrollView>
      <SnackBar
        visible={success}
        textMessage='Your invitation has been sent!'
        backgroundColor={Theme.colors.confirm}
        messageColor={Theme.colors.white}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'center',
    marginBottom: Theme.space.vertical.xSmall
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
  form: {
    height: 225,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    borderRadius: Theme.borders.radius
  },
  formTitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xxSmall
  },
  errorContainer: {
    marginVertical: Theme.space.vertical.xxSmall
  },
  errorText: {
    fontFamily: Theme.fonts.primary,
    color: 'red',
    fontSize: Theme.fonts.sizeTC
  },
  successText: {
    fontFamily: Theme.fonts.primary,
    color: Theme.colors.confirm,
    fontSize: Theme.fonts.sizeM,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default Invitation;
