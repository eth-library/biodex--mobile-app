import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';

import { SET_NOT_FIRST_TIME_USER } from '../../store/types';
import Button from '../../components/Button';

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
        <Text>You are ready to go!</Text>
        <Button title='Capture your first image' onPress={() => navigation.navigate('Image Capture')} />
      </View>
    );
  };

  return (
    <View style={{ ...style }}>
      <Text>You are ready to go!</Text>
      <Button title='Go to Login' onPress={firstTimeUseHandler} />
    </View>
  );
};

export default StartScreen;
