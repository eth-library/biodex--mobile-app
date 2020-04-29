import { StyleSheet } from 'react-native';

import Theme from '../../theme';

export const portraitStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Theme.colors.background,
    },
    imagePreview: {
      height: deviceWidth * 0.9,
      width: deviceWidth * 0.9,
    },
    bottomContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      height: deviceHeight * 0.22,
    },
    infoTitle: {
      fontFamily: Theme.fonts.primaryBold,
      fontSize: Theme.fonts.sizeXS,
      color: Theme.colors.primary,
    },
    infoText: {
      fontFamily: Theme.fonts.primary,
      fontSize: Theme.fonts.sizeXS,
      color: Theme.colors.primary,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: deviceWidth,
    },
  });

export const landscapeStyles = (deviceWidth, deviceHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: Theme.colors.background,
    },
    imagePreview: {
      height: deviceHeight * 0.7,
      width: deviceHeight * 0.7,
    },
    bottomContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: deviceWidth * 0.4,
    },
    infoContainer: {
      height: deviceHeight * 0.3,
    },
    infoTitle: {
      fontFamily: Theme.fonts.primaryBold,
      fontSize: Theme.fonts.sizeXS,
      color: Theme.colors.primary,
    },
    infoText: {
      fontFamily: Theme.fonts.primaryBold,
      fontSize: Theme.fonts.sizeXS,
      color: Theme.colors.primary,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
  });