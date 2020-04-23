import React from 'react';
import { View } from 'react-native';

const activeColor = 'rgba(52, 52, 52, 0.5)';
import Theme from '../../../../theme';

const BottomRow = ({ draggingBL, draggingBM, draggingBR }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        flex: 1 / 3,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: Theme.colors.primary,
      }}
    >
      <View
        style={{
          backgroundColor: draggingBL ? activeColor : 'transparent',
          flex: 1 / 3,
          height: '100%',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 5,
            bottom: 5,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            height: 35,
            width: 35,
            borderColor: Theme.colors.primary,
            borderStyle: 'solid',
          }}
        />
      </View>
      <View
        style={{
          borderColor: Theme.colors.primary,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          backgroundColor: draggingBM ? 'transparent' : 'transparent',
          flex: 1 / 3,
          height: '100%',
        }}
      />
      <View
        style={{
          backgroundColor: draggingBR ? activeColor : 'transparent',
          flex: 1 / 3,
          height: '100%',
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: 5,
            bottom: 5,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            height: 35,
            width: 35,
            borderColor: Theme.colors.primary,
            borderStyle: 'solid',
          }}
        />
      </View>
    </View>
  );
};
export default BottomRow;
