import React from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CropButton from '../CropButton';

const Header = ({ onCancel, onCropImage, processing, btnTexts }) => {
  return (
    <SafeAreaView
      style={{
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}
    >
      <ScrollView
        scrollEnabled={false}
        horizontal
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 15,
          height: 35,
          alignItems: 'flex-end',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => onCancel()}
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} name='arrow-left' color='white' />
          </TouchableOpacity>
          <CropButton onCropImage={onCropImage} processing={processing} btnTexts={btnTexts} style={styles}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
  }
});

export default Header;
