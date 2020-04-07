import React from 'react';
import { useSelector } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import Theme from '../../theme';

const NetworkSnackbar = () => {
  const error = useSelector((state) => state.network.error);
  const success = useSelector((state) => state.network.success);
  const successText = useSelector((state) => state.network.successText);

  return (
    <SnackBar
      visible={error || success}
      textMessage={error ? 'Ups, something went wrong!' : successText}
      backgroundColor={error ? Theme.colors.red : success ? Theme.colors.confirm : Theme.colors.background}
      messageColor={Theme.colors.white}
    />
  );
};

export default NetworkSnackbar;
