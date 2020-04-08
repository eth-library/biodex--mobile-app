import React from 'react';
import { Modal, View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import Theme from '../../../../theme';

const DeveloperInfo = ({ visible, hideModalHandler }) => {
  const info = useSelector((state) => state.images.devInfo);

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Developer Information</Text>
            <View style={styles.closeIcon}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                size={40}
                color={Theme.colors.primary}
                onPress={hideModalHandler}
              />
            </View>
          </View>
          <Text style={styles.label}>Prediction execution time</Text>
          <Text style={styles.info}>{info.execTime}</Text>
          <Text style={styles.label}>Prediction model</Text>
          <Text style={styles.info}>{info.model}</Text>
          <Text style={styles.label}>Prediction status</Text>
          <Text style={styles.info}>{info.status}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Theme.colors.lightGrey,
  },
  closeIcon: {
    height: 40,
    width: 40,
    alignItems: 'flex-end',
  },
  textContainer: {
    width: '80%',
    height: '85%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    marginBottom: Theme.space.vertical.medium,
    paddingTop: 10,
  },
  label: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xxSmall,
  },
  info: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.small,
  },
});

export default DeveloperInfo;
