import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';

import { SET_NOT_FIRST_TIME_USER } from '../../store/types';
import Button from '../../components/Button';
import Theme from '../../theme';

const StartScreen = ({ style, navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const firstTimeUseHandler = async () => {
    await AsyncStorage.setItem('used', 'true');
    dispatch({
      type: SET_NOT_FIRST_TIME_USER
    })
  };

  if (isAuthenticated) {
    return (
      <View style={{ ...style }}>
        <Text style={styles.text}>You're ready to go!</Text>
        <Button title='Capture Your First Image' onPress={() => navigation.navigate('Image Capture')} />
      </View>
    );
  };

  return (
    <View style={{ ...style }}>
      <Text style={styles.text}>You're ready to go!</Text>
      <Button title='Go to Login' onPress={firstTimeUseHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.darkGrey,
    fontFamily: Theme.fonts.primaryBoldItalic,
    fontSize: Theme.fonts.sizeL,
    textAlign: 'center',
  }
});

export default StartScreen;
