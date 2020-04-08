import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import Theme from '../../../../theme';
import Button from '../../../../components/Button';
import Title from './Title';
import Description from './Description';
import ImageModal from './ImageModal';

const ButterflyChoice = ({ navigation, data, confirmationHandler, confirmedCase }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
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
  let listener = null;
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  
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
    };
    return cleanup;
  }, []);

  return (
    <View style={styles.container}>
      <ImageModal
        visible={modalVisible}
        hideModalHandler={() => setModalVisible(false)}
        imageUri={data.image_url}
      />
      <View style={styles.butterflyContainer}>
        <View style={styles.titles}>
          <Title text={data.family} prob={data.family_prob} />
          <Title text={data.subfamily} prob={data.subfamily_prob} />
          <Title text={data.species} prob={data.species_prob} />
          <Title text={data.species} prob={data.species_prob} />
        </View>

        <View
          style={
            confirmedCase
              ? data.confirmed
                ? styles.imageContainer
                : styles.imageContainerNoButton
              : styles.imageContainer
          }
        >
          <ImageBackground style={styles.image} source={{ uri: data.image_url }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-expand' : 'md-expand'}
                size={20}
                color={Theme.colors.primary}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.buttons}>
            {!confirmedCase && (
              <Button
                title='CONFIRM'
                disabled={confirmedCase}
                onPress={() => confirmationHandler(data)}
              />
            )}
            {confirmedCase && data.confirmed && (
              <Button title='CONFIRMED' disabled={confirmedCase} style={styles.confirmedButton} />
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.description}
          onPress={() => setShowDescription(!showDescription)}
        >
          <Ionicons
            name={
              Platform.OS === 'ios'
                ? showDescription
                  ? 'ios-arrow-up'
                  : 'ios-arrow-down'
                : showDescription
                ? 'md-arrow-dropup'
                : 'md-arrow-dropdown'
            }
            size={32}
            color={Theme.colors.primary}
          />
          <Text style={styles.text}>Description</Text>
        </TouchableOpacity>
      </View>
      {showDescription && <Description />}
    </View>
  );
};

const portraitStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: Theme.space.vertical.xxSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    butterflyContainer: {
      width: '100%',
      height: deviceWidth * 0.8,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent,
    },
    imageContainer: {
      width: '98%',
      height: deviceWidth * 0.8 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: Theme.space.horizontal.xxSmall,
    },
    imageContainerNoButton: {
      width: '98%',
      height: deviceWidth * 0.8 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: Theme.space.horizontal.xxSmall,
    },
    image: {
      resizeMode: 'cover',
      height: deviceWidth * 0.8 - 50 - 30,
      width: deviceWidth * 0.8 - 50 - 30,
      padding: 10,
      alignItems: 'flex-end',
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
    },
    confirmedButton: {
      backgroundColor: Platform.OS === 'ios' ? Theme.colors.primary : Theme.colors.backgroundAccent,
    },
    description: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall,
    },
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: Theme.space.vertical.xxSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    butterflyContainer: {
      width: '100%',
      height: deviceWidth * 0.4,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent,
    },
    imageContainer: {
      width: '98%',
      height: deviceWidth * 0.4 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall,
    },
    imageContainerNoButton: {
      width: '98%',
      height: deviceHeight * 0.45 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall,
    },
    image: {
      resizeMode: 'cover',
      height: deviceWidth * 0.39 - 50 - 30,
      width: deviceWidth * 0.39 - 50 - 30,
      padding: 10,
      alignItems: 'flex-end',
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
    },
    confirmedButton: {
      backgroundColor: Platform.OS === 'ios' ? Theme.colors.primary : Theme.colors.backgroundAccent,
    },
    description: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall,
    },
  });

export default ButterflyChoice;
