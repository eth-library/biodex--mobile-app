import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import Theme from '../../../../theme';

const DeveloperInfo = ({ visible, hideModalHandler }) => {
  const info = useSelector((state) => state.images.devInfo);

  return (
    <Modal animationType='slide' transparent={false} visible={visible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.closeIcon}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
              size={40}
              color={Theme.colors.primary}
              onPress={hideModalHandler}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Developer Information</Text>
            <Text style={styles.label}>Prediction execution time</Text>
            <Text style={styles.info}>{info.execTime}</Text>
            <Text style={styles.label}>Prediction model</Text>
            <Text style={styles.info}>{info.model}</Text>
            <Text style={styles.label}>Prediction status</Text>
            <Text style={styles.info}>{info.status}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Theme.colors.lightGrey,
  },
  closeIcon: {
    width: '80%',
    alignItems: 'flex-end',
  },
  textContainer: {
    width: '80%',
    height: '85%',
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeL,
    marginBottom: Theme.space.vertical.large,
  },
  label: {
    fontFamily: Theme.fonts.primaryBold,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xxSmall,
  },
  info: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.medium,
  },
});

export default DeveloperInfo;
