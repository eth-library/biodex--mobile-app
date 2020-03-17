import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Heteropterinae</Text>
      <Text style={styles.percentage}>50%</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fonts.sizeXS
  },
  percentage: {
    fontFamily: theme.fonts.primaryBold,
    fontSize: theme.fonts.sizeXS
  }
});

export default Title;
