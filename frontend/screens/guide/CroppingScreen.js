import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import IntroContainer from './IntroContainer';
import CroppingGif from '../../assets/Cropping.gif';
import Theme from '../../theme';

const ImageCaptureScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={CroppingGif} />
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>
            Use the cropping tool to fill most of the square with your specimen.
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>Try to exclude any other specimens from view.</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>
            Confirm your selection to send the image to the online classifier.
          </Text>
        </View>
      </View>
    </IntroContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '75%',
    height: '70%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  block: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height > 700 ? Theme.space.vertical.xSmall : 5
  },
  text: {
    color: Theme.colors.accent,
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeM,
    flex: 1,
    textAlign: 'center',
  }
});

export default ImageCaptureScreen;
