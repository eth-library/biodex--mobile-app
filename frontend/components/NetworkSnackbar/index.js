import React from 'react';
import { useSelector } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';
import {useNetInfo} from "@react-native-community/netinfo";

import Theme from '../../theme';

const NetworkSnackbar = () => {
  const error = useSelector((state) => state.network.error);
  const success = useSelector((state) => state.network.success);
  const successText = useSelector((state) => state.network.successText);
  const netInfo = useNetInfo();

  if (netInfo.isInternetReachable) {
    return (
      <SnackBar
        visible={error || success}
        textMessage={error ? 'Ups, something went wrong!' : successText}
        backgroundColor={error ? Theme.colors.red : success ? Theme.colors.confirm : Theme.colors.background}
        messageColor={Theme.colors.white}
      />
    );
  }
  
  return (
    <SnackBar
      visible={true}
      textMessage={'No internet connection!'}
      backgroundColor={Theme.colors.red}
      messageColor={Theme.colors.white}
    />
  );
};

export default NetworkSnackbar;
