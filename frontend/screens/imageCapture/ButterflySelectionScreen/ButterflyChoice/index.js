import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../../../theme';
import Button from '../../../../components/Button';
import Title from './Title';
import Description from './Description';
import ImageModal from '../ImageModal';
import withOrientation from '../../../../HOC/withOrientation';
import { portraitStyles, landscapeStyles } from './styles';

const ButterflyChoice = ({ data, confirmationHandler, confirmedCase, isLoading, portrait, width, height }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const styles = portrait ? portraitStyles(width, height) : landscapeStyles(width, height);

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
          <Title text={data.genus} prob={data.genus_prob} style={styles.italicTitle} />
          <Title text={data.species} prob={data.species_prob} style={styles.italicTitle} />
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.image} source={{ uri: data.image_url }} />
          </TouchableOpacity>
          <View style={styles.buttons}>
            {!confirmedCase && (
              <Button
                title='CONFIRM'
                disabled={confirmedCase}
                onPress={() => confirmationHandler(data)}
                isLoading={isLoading}
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

export default withOrientation(ButterflyChoice);
