import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Theme from '../../../theme';

const Description = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Mauris cursus euismod libero, a finibus tellus molestie id. Cras vitae ex sem. Aenean
        fermentum felis vel tortor dictum vehicula. Quisque cursus tincidunt magna, sed maximus
        augue imperdiet nec. Maecenas feugiat venenatis ex sed egestas. Mauris condimentum venenatis
        convallis. Duis quis ipsum lacus. Proin molestie, metus vel lobortis pellentesque, lorem
        magna tincidunt odio, eu bibendum massa lorem eget lacus. Sed mauris eros, varius sed auctor
        nec, mollis ut lectus. Phasellus eu vestibulum urna, at aliquet velit. Nunc auctor feugiat
        arcu id pulvinar. Duis lacus sapien, interdum sed arcu vel, fermentum luctus dui.{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundAccent,
    padding: 10,
  },
  text: {
    fontFamily: Theme.fonts.primary
  }
});

export default Description;
