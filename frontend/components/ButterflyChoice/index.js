import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../theme';
import Button from '../Button';
import Title from './Title';
import Description from './Description';

const ButterflyChoice = ({ style, data }) => {
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={{...styles.butterflyContainer, ...style}}>
        <View style={styles.titles}>
          <Title text={data.family} prob={data.family_prob} />
          <Title text={data.subfamily} prob={data.subfamily_prob} />
          <Title text={data.species} prob={data.species_prob} />
          <Title text={data.species} prob={data.species_prob} />
        </View> 
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.example_image_0 }} />
          <View style={styles.buttons}>
            <Button title='CONFIRM' onPress={() => console.log(data)} />
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
    height: 224,
    width: 224
  },
  titles: {
    width: '100%',
    flexDirection: 'row',
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
