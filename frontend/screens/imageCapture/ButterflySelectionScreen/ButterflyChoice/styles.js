import { StyleSheet } from 'react-native';

import Theme from '../../../../theme';

export const portraitStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: Theme.space.vertical.xxSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    butterflyContainer: {
      width: '100%',
      height: deviceWidth * 0.85,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent,
    },
    imageContainer: {
      width: '98%',
      height: deviceWidth * 0.85 - 50 - 40, // deviceWidth * 0.8 = container, titles height = 50, description button height = 30
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: Theme.space.horizontal.xxSmall,
    },
    imageContainerNoButton: {
      width: '98%',
      height: deviceWidth * 0.85 - 50 - 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: Theme.space.horizontal.xxSmall,
    },
    image: {
      resizeMode: 'cover',
      height: deviceWidth * 0.85 - 50 - 40,
      width: deviceWidth * 0.85 - 50 - 40,
      padding: 10,
      alignItems: 'flex-end',
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    italicTitle: {
      fontFamily: Theme.fonts.primaryBoldItalic,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
    },
    confirmedButton: {
      backgroundColor: Platform.OS === 'ios' ? Theme.colors.primary : Theme.colors.backgroundAccent,
    },
    description: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall,
    },
  });

export const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: Theme.space.vertical.xxSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    butterflyContainer: {
      width: '100%',
      height: deviceWidth * 0.45,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Theme.colors.backgroundAccent,
    },
    imageContainer: {
      width: '98%',
      height: deviceWidth * 0.45 - 50 - 40,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall,
    },
    imageContainerNoButton: {
      width: '98%',
      height: deviceHeight * 0.5 - 50 - 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: Theme.space.vertical.xxSmall,
    },
    image: {
      resizeMode: 'cover',
      height: deviceWidth * 0.44 - 50 - 40,
      width: deviceWidth * 0.44 - 50 - 40,
      padding: 10,
      alignItems: 'flex-end',
    },
    titles: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
    },
    confirmedButton: {
      backgroundColor: Platform.OS === 'ios' ? Theme.colors.primary : Theme.colors.backgroundAccent,
    },
    description: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontFamily: Theme.fonts.primary,
      marginLeft: Theme.space.horizontal.xSmall,
    },
  });
