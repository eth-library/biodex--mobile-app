import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

import Theme from './theme';
import store from './store';
import MainNavigator from './navigation';

Sentry.init({
  dsn: 'https://309c9a72ae8d41689b69f8de6cfe390a@sentry.io/5187634',
  enableInExpoDevelopment: true,
  debug: true
});
Sentry.setRelease(Constants.manifest.revisionId);

enableScreens();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={Theme}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default App;
