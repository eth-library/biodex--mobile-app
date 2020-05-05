import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CropButton = ({ onCropImage, processing, btnTexts, style }) => {
  return (
    <TouchableOpacity onPress={() => onCropImage()} style={{ ...styles.container, ...style }}>
      <View style={{ flexDirection: 'row' }}>
        {processing && <MaterialIcon
          style={{ flexDirection: 'row', marginRight: 10 }}
          size={24}
          name='access-time'
          color='white'
        />}
        <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>
          {!processing ? btnTexts.crop : btnTexts.processing}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'flex-end',
    flex: 1,
  },
});

export default CropButton;
