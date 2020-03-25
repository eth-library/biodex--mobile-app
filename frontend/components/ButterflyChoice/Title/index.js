import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../../../theme';

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
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fonts.sizeXXS,
    textAlign: 'center',
  },
  percentage: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fonts.sizeXS
  }
});

export default Title;
