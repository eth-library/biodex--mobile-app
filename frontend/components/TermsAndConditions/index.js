import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Theme from '../../theme';

const TermsAndConditions = () => {
  const downloadTerms = () => {
    FileSystem.downloadAsync(
      'https://drive.google.com/file/d/1gsSL9kRH0Qf1cdjkvQQXwKBA-RFnUg4t/view',
      FileSystem.documentDirectory + 'TermsAndConditions-v0.01.pdf'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Text style={styles.terms}>
      By using this Mobile Application or its Services you confirm that you have read and agree to
      our{' '}
      <TouchableWithoutFeedback onPress={downloadTerms}>
        <Text style={styles.link}>Service Agreement</Text>
      </TouchableWithoutFeedback>{' '}
      and all its terms and conditions (last updated April 6, 2020).
    </Text>
  );
};

const styles = StyleSheet.create({
  terms: {
    fontSize: Theme.fonts.sizeXXS,
    color: Theme.colors.black,
    marginTop: Theme.space.vertical.xxSmall,
  },
  link: {
    color: Theme.colors.link,
  },
});

export default TermsAndConditions;
