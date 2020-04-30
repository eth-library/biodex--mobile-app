import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import About from '../screens/about';
import Theme from '../theme';

const Stack = createStackNavigator();

const IoniconsHeaderButton = props => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Theme.colors.white} />
);

const AboutStackNavigator = props => {
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
        ),
        gestureEnabled: false
      }}
    >
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  );
};

export default AboutStackNavigator;
