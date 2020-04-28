import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import Theme from '../../../../theme';

const IoniconsHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Theme.colors.white} />
);

const HeaderTitle = ({ showDeveloperInfo, setShowDeveloperInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title='info'
          iconName={
            Platform.OS === 'ios'
              ? 'ios-information-circle-outline'
              : 'md-information-circle-outline'
          }
          onPress={() => setShowDeveloperInfo(!showDeveloperInfo)}
        />
      </HeaderButtons>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: Theme.colors.white,
    fontSize: 18
  },
});

export default HeaderTitle;
