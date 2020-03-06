import React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';

import Theme from '../../theme';

const CustomButton = props => {
  return (
    <View style={{...styles.container, ...props.style}}>
      <Button {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: Platform.OS === 'ios' ? Theme.colors.primary : null
  }
});

export default CustomButton;
