import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

import Theme from '../../theme';
import ButterflyChoice from '../../components/ButterflyChoice';

const ButterflySelectionScreen = ({ route }) => {
  const imageUri = route.params.imageUri;

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imagePreview}>
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <Text style={styles.imageDescription}>User's image</Text>
        </ImageBackground>
      </View>
      <View style={styles.titles}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Family</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Subfamily</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Genus</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Epithet</Text>
        </View>
      </View>
      <ScrollView style={styles.choicesContainer}>
        <ButterflyChoice />
        <ButterflyChoice />
        <ButterflyChoice />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: Theme.space.vertical.xxSmall
  },
  imagePreview: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.6,
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
  titles: {
    flexDirection: 'row'
  },
  title: {
    width: '25%',
    alignItems: 'center',
    marginVertical: Theme.space.vertical.xxSmall
  },
  titleText: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.accent
  },
  choicesContainer: {
    flex: 1
  }
});

export default ButterflySelectionScreen;
