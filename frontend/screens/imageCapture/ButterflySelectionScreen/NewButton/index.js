import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Theme from '../../../../theme';

const NewButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>NEW</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Theme.colors.white,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 20,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: 15,
    color: Theme.colors.white
  }
});

export default NewButton;
