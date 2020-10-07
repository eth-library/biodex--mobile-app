import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, TextInput, StyleSheet, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Theme from '../../theme';
import { sendInvitationAsyncAction, removeErrorAction } from '../../store/actions/invitation';

const Invitation = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const error = useSelector(state => state.invitation.error);
  const dispatch = useDispatch();

  // Cleanup function
  useEffect(() => {
    const cleanup = navigation.addListener('blur', () => {
      setEmail('');
      setIsValid(false);
      setTouched(false);
      setIsLoading(false);
      setLocalError(null);
      dispatch(removeErrorAction());
    });
    return cleanup;
  }, [navigation]);

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
    if (response && response.ok) successHandler();
    setIsLoading(false);
  };

  const successHandler = () => {
    setLocalError(null);
    setTouched(false);
    setEmail('');
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
          <Logo style={styles.logo} />
          <Text style={styles.title}>BioDex</Text>
          <Text style={styles.subtitle}>ETH Library & Entomological Collection</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Theme.space.vertical.xSmall
  },
  logo: {
    resizeMode: 'center',
    marginBottom: Theme.space.vertical.xSmall
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    marginBottom: Theme.space.vertical.large
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black
  },
  subtitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    color: Theme.colors.black,
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
});

export default Invitation;
