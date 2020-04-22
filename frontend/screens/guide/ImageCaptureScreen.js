import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import IntroContainer from './IntroContainer';
import Theme from '../../theme';

const ImageCaptureScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.container}>

        <View style={styles.block}>
          <Text style={styles.text}>To get started</Text>
        </View>

        <View style={styles.block}>
          <View style={styles.iconContainer}>
            <Ionicons name='md-camera' size={40} color={Theme.colors.accent} />
          </View>
          <Text style={{...styles.text, textAlign: 'left'}}>use the camera mode to photograph your specimen</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>or</Text>
        </View>

        <View style={styles.block}>
          <View style={styles.iconContainer}>
            <Ionicons name='md-images' size={40} color={Theme.colors.accent} />
          </View>
          <Text style={{...styles.text, textAlign: 'left'}}>
            access your gallery to select one of your existing pictures
          </Text>
        </View>

      </View>
    </IntroContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  block: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: Theme.colors.accent,
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
});

export default ImageCaptureScreen;
