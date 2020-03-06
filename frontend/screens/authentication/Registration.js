import React, { useState, Fragment } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Platform,
  Picker,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import SafeAreaView from '../../components/UI/SafeAreaView';
import Button from '../../components/UI/Button';
import { authStyles } from './styles';
import Theme from '../../theme';

const Registration = props => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [language, setLanguage] = useState('userType');
  const [showIosPicker, setShowIosPicker] = useState(false);

  const onSubmitHandler = () => {
    console.log('submitted', email, fullName, code, password, passwordRepeat);
  };

  return (
    <Fragment>
      {!showIosPicker && (
        <SafeAreaView>
          <KeyboardAvoidingView
            style={authStyles.fullScreenContainer}
            behavior='padding'
            enabled
            keyboardVerticalOffset={20}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create an account</Text>
            </View>
            <View style={{ ...authStyles.form, ...styles.form }}>
              <TextInput
                placeholder={'Full Name'}
                value={fullName}
                onChangeText={setFullName}
                style={authStyles.textInput}
              />
              <TextInput
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
                style={authStyles.textInput}
                keyboardType='email-address'
              />
              <TextInput
                placeholder={'Validation code'}
                value={code}
                onChangeText={setCode}
                style={authStyles.textInput}
                keyboardType='number-pad'
              />
              {Platform.OS === 'android' && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={language}
                    style={styles.picker}
                    itemStyle={styles.pickerItems} // works only for IOS
                    onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
                    mode='dropdown'
                  >
                    <Picker.Item label='User Type' value='userType'></Picker.Item>
                    <Picker.Item label='Java' value='java' />
                    <Picker.Item label='JavaScript' value='js' />
                  </Picker>
                </View>
              )}
              {Platform.OS === 'ios' && !showIosPicker && (
                <TouchableOpacity
                  style={{ width: '100%' }}
                  onPress={() => setShowIosPicker(!showIosPicker)}
                >
                  <TextInput
                    editable={false}
                    pointerEvents='none'
                    style={authStyles.textInput}
                    placeholder='User Type'
                    autoCapitalize='none'
                    placeholderTextColor={Theme.colors.grey}
                    value={language}
                  />
                </TouchableOpacity>
              )}
              <TextInput
                placeholder={'Password'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={authStyles.textInput}
              />
              <TextInput
                placeholder={'Repeat Password'}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                secureTextEntry
                style={authStyles.textInput}
              />
              <Button
                title={'Create your Account'}
                color={Platform.OS === 'ios' ? Theme.colors.white : Theme.colors.primary}
                onPress={onSubmitHandler}
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
          </KeyboardAvoidingView>
          </SafeAreaView>
      )}
      {Platform.OS === 'ios' && showIosPicker && (
        <Picker
          selectedValue={language}
          style={styles.picker}
          itemStyle={styles.pickerItems}
          onValueChange={(itemValue, itemIndex) => {
            setShowIosPicker(false);
            setLanguage(itemValue);
          }}
        >
          <Picker.Item label='User Type' value='userType'></Picker.Item>
          <Picker.Item label='Java' value='java' />
          <Picker.Item label='JavaScript' value='js' />
        </Picker>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
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
