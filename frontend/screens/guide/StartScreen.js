import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { SET_NOT_FIRST_TIME_USER } from '../../store/types';
import Button from '../../components/Button';
import Theme from '../../theme';
import { showStatusBarAction } from '../../store/actions/statusBar';
import IntroContainer from './IntroContainer';
import LogoBiodex from '../../components/LogoBiodex';

const StartScreen = ({ style, navigation }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const firstTimeUseHandler = async () => {
    await AsyncStorage.setItem('used', 'true');
    dispatch({
      type: SET_NOT_FIRST_TIME_USER,
    });
  };

  const navigationHandler = () => {
    dispatch(showStatusBarAction());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <IntroContainer style={style}>
 
      <View style={{ ...style }}>
        <LogoBiodex ></LogoBiodex>
        <Text style={styles.title }>BioDex</Text>
        <Text style={styles.text}>You're ready to go!</Text>
        <View style={styles.buttonContainer}>
          {isAuthenticated ? (
            <Button title='Capture Your First Image' onPress={navigationHandler} />
          ) : (
            <Button title='Go to Login' onPress={firstTimeUseHandler} />
          )}
        </View>
      </View>
    </IntroContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.darkGrey,
    fontFamily: Theme.fonts.primaryBoldItalic,
    fontSize: Theme.fonts.sizeL,
    textAlign: 'center',
    marginTop: Theme.space.vertical.medium
  },  
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.accent,
    textAlign: 'center',
    width: '100%',
    marginBottom: Theme.space.vertical.xxSmall
  },
  buttonContainer: {
    width: '65%',
    marginTop: Theme.space.vertical.xSmall,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  logo: {
    marginBottom: Theme.space.vertical.xSmall,
    alignSelf: 'flex-start',
     marginHorizontal: Theme.space.vertical.small,
  },
});

export default StartScreen;
