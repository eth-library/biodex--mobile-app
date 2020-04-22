import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Theme from '../../theme';
import Logo from '../../components/Logo';

const IntroContainer = ({ style, children }) => {
  return (
    <View style={{ ...style, ...styles.container }}>
        <Logo style={styles.logo} />
        <View style={styles.contentContainer}>
          {children}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  logo: {
    marginTop: Theme.space.vertical.medium,
    marginBottom: Theme.space.vertical.xSmall
  },
  contentContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.7,
    width: '100%',
    paddingHorizontal: Theme.space.horizontal.small,
  }
});

export default IntroContainer;
