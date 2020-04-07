import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Theme from '../../theme';

const TermsAndConditions = () => {
  const downloadTerms = async () => {
    await WebBrowser.openBrowserAsync(
      'https://drive.google.com/file/d/1gsSL9kRH0Qf1cdjkvQQXwKBA-RFnUg4t/view'
    );
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
