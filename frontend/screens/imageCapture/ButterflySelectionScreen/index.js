import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  ImageBackground,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenOrientation } from 'expo';

import Theme from '../../../theme';
import HeaderTitle from './HeaderTitle';
import ButterflyChoice from './ButterflyChoice';
import Titles from './Titles';
import ImageModal from './ImageModal';
import NewButton from './NewButton';
import DeveloperInfo from './DeveloperInfo';
import { confirmPredictionAsyncAction, clearImagesState } from '../../../store/actions/images';
import imgPlaceholder from '../../../assets/imgNotFound.png';


const ButterflySelectionScreen = ({ navigation }) => {
  const [showUserImageModal, setShowUserImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [portrait, setPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width
  );
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  const screenOrientationHandler = () => {
    setPortrait(Dimensions.get('window').height > Dimensions.get('window').width);
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);
  };
  let listener = null;
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  const uploadedImage = useSelector((state) => state.images.uploadedImage);
  const predictions = useSelector((state) => state.images.predictions);
  const confirmedCase = useSelector((state) => Boolean(state.images.confirmedImage));
  const picMethod = useSelector((state) => state.images.picMethod);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle
          showDeveloperInfo={showDeveloperInfo}
          setShowDeveloperInfo={setShowDeveloperInfo}
        />
      ),
      headerRight: () => <NewButton onPress={startNewCase} />,
    });
  }, [navigation, setShowDeveloperInfo]);

  // On mount
  useEffect(() => {
    listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  }, []);
  // Cleanup function on navigation
  useEffect(() => {
    const cleanup = navigation.addListener('blur', () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    });
    return cleanup;
  }, [navigation]);
  // Cleanup function on unmount
  useEffect(() => {
    const cleanup = () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
      dispatch(clearImagesState());
    };
    return cleanup;
  }, []);

  const confirmationHandler = async (prediction) => {
    setIsLoading(true);
    try {
      await dispatch(confirmPredictionAsyncAction(prediction));
    } catch (e) {
      console.log('ERROR IN confirmationHandler', e.message);
    }
    setTimeout(() => startNewCase(), 1000);
  };

  const startNewCase = () => {
    navigation.navigate('ImageCapture', { method: picMethod })
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <DeveloperInfo
        visible={showDeveloperInfo}
        hideModalHandler={() => setShowDeveloperInfo(false)}
      />
      <ImageModal
        visible={showUserImageModal}
        hideModalHandler={() => setShowUserImageModal(false)}
        imageUri={uploadedImage}
      />

      <View style={styles.container}>
        <View style={styles.imagePreview}>
          <TouchableOpacity onPress={() => setShowUserImageModal(true)}>
            <ImageBackground
              source={uploadedImage ? { uri: uploadedImage } : imgPlaceholder}
              style={styles.imageContainer}
              imageStyle={styles.image}
            >
              <Text style={styles.imageDescription}>User's image</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.choicesContainer}>
          <Titles />
          <ScrollView>
            {predictions.map((el, index) => {
              return (
                <ButterflyChoice
                  data={el}
                  key={index}
                  confirmationHandler={confirmationHandler}
                  confirmedCase={confirmedCase}
                  navigation={navigation}
                  isLoading={isLoading}
                />
              );
            })}
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
      paddingTop: 2,
    },
    imagePreview: {
      height: 224,
      width: 224,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: Theme.colors.accent,
    },
    imageContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imageDescription: {
      fontFamily: Theme.fonts.primary,
      fontSize: Theme.fonts.sizeM,
      color: Theme.colors.accent,
      marginBottom: Theme.space.vertical.xxSmall,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%',
    },
    choicesContainer: {
      flex: 1,
    },
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: Theme.space.horizontal.xxSmall,
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
      resizeMode: 'cover',
    },
    imageDescription: {
      fontFamily: Theme.fonts.primary,
      fontSize: Theme.fonts.sizeM,
      color: Theme.colors.accent,
      marginBottom: Theme.space.vertical.xxSmall,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%',
    },
    choicesContainer: {
      width: '56%',
    },
    choices: {
      flex: 1,
    },
  });

export default ButterflySelectionScreen;
