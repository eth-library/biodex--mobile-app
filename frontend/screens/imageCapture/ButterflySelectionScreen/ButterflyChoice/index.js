import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
  const listener = ScreenOrientation.addOrientationChangeListener(screenOrientationHandler);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);
  // Cleanup function
  useEffect(() => {
    const cleanup = navigation.addListener('blur', () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    });
    return cleanup;
  }, [navigation]);

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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.image} source={{ uri: data.image_url }} />
          </TouchableOpacity>
          <View style={styles.buttons}>
            <Button
              title={data.confirmed ? 'CONFIRMED' : 'CONFIRM'}
              disabled={confirmedCase}
              onPress={() => confirmationHandler(data)}
            />
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
      alignItems: 'center'
    },
    butterflyContainer: {
      width: '100%',
      height: deviceHeight * 0.45,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent
    },
    imageContainer: {
      width: '98%',
      height: deviceHeight * 0.45 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall
    },
    image: {
      resizeMode: 'cover',
      height: deviceHeight * 0.44 - 50 - 30,
      width: deviceHeight * 0.44 - 50 - 30
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25
    },
    description: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall
    }
  });

const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: Theme.space.vertical.xxSmall,
      justifyContent: 'center',
      alignItems: 'center'
    },
    butterflyContainer: {
      width: '100%',
      height: deviceWidth * 0.4,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent
    },
    imageContainer: {
      width: '98%',
      height: deviceWidth * 0.4 - 50 - 30,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall
    },
    image: {
      resizeMode: 'cover',
      height: deviceWidth * 0.39 - 50 - 30,
      width: deviceWidth * 0.39 - 50 - 30
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25
    },
    description: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall
    }
  });

export default ButterflyChoice;
