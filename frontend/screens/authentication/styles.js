import { Dimensions, StatusBar, Platform } from 'react-native';

import Theme from '../../theme';

console.log('height', StatusBar.currentHeight)

export const authStyles = {
  fullScreenContainer: {
    backgroundColor: Theme.colors.background,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    // On android if the status bar is small (24), Dimensions.get('window).height returns the height including that bar. If the status bar has a notch, it is calculated properly
    height: Platform.OS === 'android' && StatusBar.currentHeight === 24 ? Dimensions.get('window').height - 24 : Dimensions.get('window').height,
    // On android the content starts to be displayed inside the status bar, needs to be moved down
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  form: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formTitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xSmall
  },
  text: {
    color: Theme.colors.grey,
    width: '100%',
    textAlign: 'center'
  },
  link: {
    color: Theme.colors.link,
    width: '100%',
    textAlign: 'center',
    marginBottom: Theme.space.vertical.xxSmall
  },
  textInput: {
    height: 40,
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    borderRadius: Theme.borders.radius,
    marginBottom: Theme.space.vertical.xSmall
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  terms: {
    fontSize: Theme.fonts.sizeTC,
    color: Theme.colors.black
  }
};
