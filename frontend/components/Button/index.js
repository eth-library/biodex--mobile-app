import React from 'react';
import { View, Text, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native';

import Theme from '../../theme';

const CustomButton = ({ isLoading, title, onPress, error, style, color }) => {
  return (
    <View style={{...styles.container, ...style}}>
      {isLoading ? (
        <ActivityIndicator color={Theme.colors.primary} size='small' />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title={title}
            color={color || Theme.colors.primary}
            onPress={onPress}
            style={styles.button}
          />
        </View>
      )}
      {error && !isLoading && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    marginBottom: Theme.space.vertical.xSmall,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '100%'
  },
  button: {
    width: '80%'
  },
  errorText: {
    color: 'red',
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeTC,
    marginTop: Theme.space.vertical.xxSmall
  }
});

export default CustomButton;
