import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import IntroContainer from './IntroContainer';
import ResultsGif from '../../assets/ResultsScreen.gif';
import Theme from '../../theme';

const ButterflySelectionScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ResultsGif} />
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>
            After a few seconds, a sorted list of the most similar species will be returned.
          </Text>
        </View>
      </View>
    </IntroContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '75%',
    height: '85%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.lightGrey
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  block: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: Theme.colors.accent,
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeM,
    flex: 1,
    textAlign: 'center',
  }
});

export default ButterflySelectionScreen;
