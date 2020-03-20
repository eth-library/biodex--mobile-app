import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';

import Theme from '../../../theme';
import ButterflyChoice from '../../../components/ButterflyChoice';
import Titles from './Titles';

const ButterflySelectionScreen = ({ route }) => {
  const [portrait, setPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width
  );
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const screenOrientationHandler = () => {
    setPortrait(Dimensions.get('window').height > Dimensions.get('window').width);
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);
  };
  const listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  useEffect(() => () => ScreenOrientation.removeOrientationChangeListener(listener), []);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const imageUri = route.params.imageUri;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />

      <View style={styles.container}>
        <View style={styles.imagePreview}>
          <ImageBackground
            source={{ uri: imageUri }}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <Text style={styles.imageDescription}>User's image</Text>
          </ImageBackground>
        </View>

        <View style={styles.choicesContainer}>
          <Titles />
          <ScrollView style={styles.choices}>
            <ButterflyChoice style={styles.butterflyChoiceContainer} />
            <ButterflyChoice style={styles.butterflyChoiceContainer} />
            <ButterflyChoice style={styles.butterflyChoiceContainer} />
            <ButterflyChoice style={styles.butterflyChoiceContainer} />
            <ButterflyChoice style={styles.butterflyChoiceContainer} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const portraitStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      paddingTop: Theme.space.vertical.xxSmall
    },
    imagePreview: {
      height: deviceWidth * 0.6,
      width: deviceWidth * 0.6,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.accent,
    },
    imageContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    imageDescription: {
      fontFamily: Theme.fonts.primary,
      fontSize: Theme.fonts.sizeM,
      color: Theme.colors.accent,
      marginBottom: Theme.space.vertical.xxSmall
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%'
    },
    choices: {
      flex: 1
    },
    butterflyChoiceContainer: {
      height: deviceHeight * 0.4
    }
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    imagePreview: {
      width: '40%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: deviceHeight * 0.7,
      width: deviceHeight * 0.7,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.accent,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    imageDescription: {
      fontFamily: Theme.fonts.primary,
      fontSize: Theme.fonts.sizeM,
      color: Theme.colors.accent,
      marginBottom: Theme.space.vertical.xxSmall
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%'
    },
    choicesContainer: {
      width: '56%'
    },
    choices: {
      flex: 1
    },
    butterflyChoiceContainer: {
      height: deviceWidth * 0.4
    }
  });

export default ButterflySelectionScreen;
