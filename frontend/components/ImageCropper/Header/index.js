import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const Header = ({ onCancel, onCropImage, processing, btnTexts }) => {
  return (
    <SafeAreaView
      style={{
        width,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}
    >
      <StatusBar hidden barStyle='light-content' />
      <ScrollView
        scrollEnabled={false}
        horizontal
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 15,
          height: 44,
          alignItems: 'center',
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
          <TouchableOpacity
            onPress={() => onCropImage()}
            style={{
              marginRight: 10,
              alignItems: 'flex-end',
              flex: 1,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcon
                style={{ flexDirection: 'row', marginRight: 10 }}
                size={24}
                name={!processing ? 'done' : 'access-time'}
                color='white'
              />
              <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>
                {!processing ? btnTexts.crop : btnTexts.processing}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Header;
