import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import ExamplePic from '../../assets/app_example_use.jpg';
import Theme from '../../theme';
import IntroContainer from './IntroContainer';

const HomeScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleBold}>Welcome</Text>
        <Text style={styles.title}>to the</Text>
        <Text style={styles.titleBold}>ETH Lepidoptera Classifier</Text>
      </View>
      <Image style={styles.img} source={ExamplePic} />
    </IntroContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  contentContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.75,
  },
  logo: {
    marginTop: Theme.space.vertical.medium,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.space.vertical.large,
  },
  titleBold: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
  },
  title: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeL,
    color: Theme.colors.black,
  },
  img: {
    width: 260,
    height: 260,
  },
});

export default HomeScreen;
