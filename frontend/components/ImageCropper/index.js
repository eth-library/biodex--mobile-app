import React, { useState, useEffect } from 'react';
import { Dimensions, View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import ImageManipulator from './ImageManipulator/';
import HybridTouch from './HybridTouch';

const noImage = require('./assets/no_image.png');

const ImageCropper = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [uri, setUri] = useState(null);

  const pickGalleryImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setUri(result.uri);
        setIsVisible(true);
      }
    }
  };

  const pickCameraImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setUri(result.uri);
        setIsVisible(true);
      }
    }
  };

  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Image
        resizeMode='contain'
        style={{
          width: 224,
          height: 224,
          marginBottom: 40,
          backgroundColor: 'grey',
        }}
        source={uri ? { uri } : noImage}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#2c98fd',
          width,
          position: 'absolute',
          bottom: 0,
          padding: 20,
        }}
      >
        <HybridTouch style={{ flex: 1, alignItems: 'center' }} onPress={() => pickGalleryImage()}>
          <View style={{ alignItems: 'center' }}>
            <Icon size={30} name='photo' color='white' />
            <Text style={{ color: 'white', fontSize: 18 }}>Gallery</Text>
          </View>
        </HybridTouch>
        <HybridTouch style={{ flex: 1, alignItems: 'center' }} onPress={() => pickCameraImage()}>
          <View style={{ alignItems: 'center' }}>
            <Icon size={30} name='photo-camera' color='white' />
            <Text style={{ color: 'white', fontSize: 18 }}>Camera</Text>
          </View>
        </HybridTouch>
      </View>

      {uri && <ImageManipulator
        photo={{ uri }}
        isVisible={isVisible}
        chosenPicture={(data) => setUri(data.uri)}
        onToggleModal={() => setIsVisible(!isVisible)}
        saveOptions={{
          compress: 1,
          format: 'jpeg',
          base64: true,
        }}
      />}
      
    </SafeAreaView>
  );
};

export default ImageCropper;
