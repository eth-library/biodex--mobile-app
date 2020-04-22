import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  horizontal: {
    xxSmall: width * 0.0125,
    xSmall: width * 0.025,
    small: width * 0.0375,
    medium: width * 0.05,
    large: width * 0.075,
    xLarge: width * 0.09
  },
  vertical: {
    xxSmall: height * 0.0125,
    xSmall: height * 0.025,
    small: height * 0.0375,
    medium: height * 0.05,
    normal: height * 0.065,
    large: height * 0.075,
    xLarge: height * 0.09
  }
};
