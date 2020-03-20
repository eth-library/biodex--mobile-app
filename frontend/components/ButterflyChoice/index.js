import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../theme';
import Button from '../Button';
import Butterfly from '../../assets/butterfly.jpg';
import Title from './Title';
import Description from './Description';

const ButterflyChoice = props => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{...styles.butterflyContainer, ...props.style}}>
        <View style={styles.titles}>
          <Title />
          <Title />
          <Title />
          <Title />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={Butterfly} />
          <View style={styles.buttons}>
            <Button title='CONFIRM' />
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Theme.space.vertical.xxSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butterflyContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundAccent,
  },
  imageContainer: {
    width: '98%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: Theme.space.vertical.xxSmall,
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    width: '70%'
  },
  titles: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    flexDirection: 'row',
  },
  text: {
    fontFamily: Theme.fonts.primary,
    marginLeft: Theme.space.horizontal.xSmall
  }
});

export default ButterflyChoice;
