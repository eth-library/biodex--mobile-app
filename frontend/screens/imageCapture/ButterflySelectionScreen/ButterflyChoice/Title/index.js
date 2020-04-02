import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Theme from '../../../../../theme';

const Title = ({ text, prob }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{ text }</Text>
      <Text style={styles.percentage}>{ Math.trunc(prob * 100) }%</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '24.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeXXS,
    textAlign: 'center',
  },
  percentage: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeXS
  }
});

export default Title;
