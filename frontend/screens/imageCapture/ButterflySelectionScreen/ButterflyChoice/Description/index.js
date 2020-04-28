import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Theme from '../../../../../theme';

const Description = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        To be added.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundAccent,
    padding: 10,
    width: '100%',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: Theme.colors.lightGrey
  },
  text: {
    fontFamily: Theme.fonts.primary
  }
});

export default Description;
