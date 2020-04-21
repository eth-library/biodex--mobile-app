import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ onToggleModal, cropMode, setCropMode, onCropImage, processing }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingTop: 20,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'green'
      }}
    >
      {!cropMode ? (
        <Fragment>
          <TouchableOpacity
            onPress={onToggleModal}
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
            onPress={setCropMode}
            style={{
              marginLeft: 10,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={20} name='crop' color='white' />
          </TouchableOpacity>
        </Fragment>
      ) : (
        <Fragment>
          <TouchableOpacity
            onPress={setCropMode}
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
            onPress={onCropImage}
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
                {!processing ? 'Crop' : 'Processing'}
              </Text>
            </View>
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
  );
};

export default Header;
