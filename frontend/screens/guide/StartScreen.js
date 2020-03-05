import React from 'react';
import { View, Text } from 'react-native';

function StartScreen({ style }) {
  return (
    <View style={{ ...style }}>
      <Text>You are ready to go!</Text>
    </View>
  );
};

export default StartScreen;
