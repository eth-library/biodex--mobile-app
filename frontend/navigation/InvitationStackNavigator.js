import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import Invitation from '../screens/invitation';
import Theme from '../theme';

const Stack = createStackNavigator();

const IoniconsHeaderButton = props => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Theme.colors.white} />
);

const InvitationStackNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.accent },
        headerTintColor: Theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item
              title='search'
              iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
              onPress={() => props.navigation.openDrawer()}
            />
          </HeaderButtons>
        )
      }}
    >
      <Stack.Screen name='Invitation' component={Invitation} />
    </Stack.Navigator>
  );
};

export default InvitationStackNavigator;
