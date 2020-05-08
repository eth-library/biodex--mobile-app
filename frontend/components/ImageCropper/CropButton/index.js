import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CropButton = ({ onCropImage, processing, btnTexts, style }) => {
  return (
    <View style={{ ...styles.container, ...style.container }}>
      <TouchableOpacity onPress={() => onCropImage()} style={{ ...styles.button, ...style.button }}>
        <View style={{ flexDirection: 'row' }}>
          {processing && (
            <MaterialIcon
              style={styles.icon}
              size={24}
              name='access-time'
              color='white'
            />
          )}
          <Text style={styles.text}>
            {!processing ? btnTexts.crop : btnTexts.processing}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'flex-end',
    flex: 1,
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    fontWeight: '500', 
    color: 'white', 
    fontSize: 18 
  },
  icon: {
    flexDirection: 'row', 
    marginRight: 10
  }
});

export default CropButton;
