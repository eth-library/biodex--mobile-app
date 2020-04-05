import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import SnackBar from 'react-native-snackbar-component';

import Theme from '../../../theme';
import ButterflyChoice from './ButterflyChoice';
import Titles from './Titles';
import { confirmPredictionAsyncAction, clearImagesState } from '../../../store/actions/images';
import imgPlaceholder from '../../../assets/imgPlaceholder.png'

const ButterflySelectionScreen = ({ navigation }) => {
  const [portrait, setPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width
  );
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTimer, setSnackbarTimer] = useState(null);
  const screenOrientationHandler = () => {
    setPortrait(Dimensions.get('window').height > Dimensions.get('window').width);
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);
  };
  const listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const uploadedImage = useSelector(state => state.images.uploadedImage);
  const predictions = useSelector(state => state.images.predictions);
  const confirmedCase = useSelector(state => Boolean(state.images.confirmedImage));
  const dispatch = useDispatch();

  // Cleanup function
  useEffect(() => {
    const cleanup = navigation.addListener('blur', () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
      clearTimeout(snackbarTimer);
      dispatch(clearImagesState());
    });
    return cleanup;
  }, [navigation]);

  const confirmationHandler = async prediction => {
    try {
      const response = await dispatch(confirmPredictionAsyncAction(prediction));
      if (response.status === 200) {
        setShowSnackbar(true);
        setSnackbarTimer(setTimeout(() => {
          setShowSnackbar(false);
        }, 2000));
      }
    } catch (e) {
      console.log('ERROR IN confirmationHandler', e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />

      <View style={styles.container}>
        <View style={styles.imagePreview}>
          <ImageBackground
            source={ uploadedImage ? { uri: uploadedImage } : imgPlaceholder}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <Text style={styles.imageDescription}>User's image</Text>
          </ImageBackground>
        </View>

        <View style={styles.choicesContainer}>
          <Titles />
          <ScrollView>
            {predictions.map((el, index) => {
              return (
                <ButterflyChoice
                  style={styles.butterflyChoiceContainer}
                  data={el}
                  key={index}
                  confirmationHandler={confirmationHandler}
                  confirmedCase={confirmedCase}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <SnackBar
        visible={showSnackbar}
        backgroundColor={Theme.colors.confirm}
        textMessage='Your confirmation has been registered!'
        messageColor={Theme.colors.white}
      />
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
      height: 224,
      width: 224,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.accent
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
    choicesContainer: {
      flex: 1
    },
    butterflyChoiceContainer: {
      height: deviceHeight * 0.45
    }
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: Theme.space.horizontal.xxSmall
    },
    imagePreview: {
      width: '40%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: deviceHeight * 0.7,
      width: deviceHeight * 0.7,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.accent
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
