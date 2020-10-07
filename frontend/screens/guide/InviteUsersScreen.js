import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import IntroContainer from './IntroContainer';
import Theme from '../../theme';

const InviteUsersScreen = ({ style }) => {
  return (
    <IntroContainer style={style}>
      <View style={styles.container}>

        <View style={styles.block}>
          <Text style={styles.text}>Using this app is free, but needs an invite code from an existing user</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>To invite your favourite Lepidopterist, Taxonomist or Collection Worker...</Text>
        </View>

        <View style={styles.block}>
          <View style={styles.iconContainer}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
                size={40}
                color={Theme.colors.primary}
              />
          </View>
          <Text style={{...styles.text, textAlign: 'left'}}>tap the invite button in the menu & enter their email</Text>
        </View>

        {/* <View style={styles.block}>
          <Text style={styles.text}>enter their email address to send them a sign-up code</Text>
        </View> */}

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

export default InviteUsersScreen;
