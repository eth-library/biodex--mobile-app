import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Theme from '../../../../theme';

const Titles = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Family</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Subfamily</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Genus</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Species</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.accent,
    marginTop: Theme.space.vertical.xxSmall,
    borderBottomColor: Theme.colors.white,
    borderBottomWidth: 1
  },
  title: {
    width: '25%',
    alignItems: 'center',
    marginVertical: Theme.space.vertical.xxSmall
  },
  titleText: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.white
  },
});

export default Titles;
