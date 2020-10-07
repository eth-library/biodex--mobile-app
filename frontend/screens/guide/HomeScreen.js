import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import ExamplePic from '../../assets/app_example_use.jpg';
import Theme from '../../theme';
import IntroContainer from './IntroContainer';

const HomeScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.titleBold}>BioDex</Text>
        <Text style={styles.subtitle}>the automated species identifier from</Text>
        <Text style={styles.subtitle}>ETH Library and Entomological Collection</Text>
      </View>
      <Image style={styles.img} source={ExamplePic} />
    </IntroContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.space.vertical.large,
  },
  titleBold: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
    lineHeight: 40,
  },
  title: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
  },
  subtitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    color: Theme.colors.black,
  },
  img: {
    width: 260,
    height: 260,
    marginBottom: Theme.space.vertical.small
  },
});

export default HomeScreen;
