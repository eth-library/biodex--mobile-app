import React from 'react';
import { View, TextInput } from 'react-native';

const Input = props => {
  return (
    <View>
      <TextInput {...props} />
    </View>
  );
};

export default Input;
