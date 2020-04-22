import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, vertical, horizontal } from '../themes';
import Theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginVertical: vertical.xxSmall,
    alignItems: 'center',
    bottom: Dimensions.get('window').height * 0.05,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: Theme.space.vertical.xxSmall,
    alignItems: 'center',
    height: 30,
  },
  text: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.primaryItalic,
    marginRight: Theme.space.horizontal.xSmall,
  },
  iconContainer: {
    alignSelf: 'flex-end'
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  paginationContainer: {
    flexDirection: 'row',
  },
});

const Pagination = ({
  size,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
  paginationStyle,
  paginationStyleItem,
}) => {
  return (
    <View style={styles.container}>
      {paginationIndex === 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>swipe</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-forward'}
              size={30}
              color={Theme.colors.black}
              backgroundColor='orange'
            />
          </View>
        </View>
      )}
      <View style={{ ...styles.paginationContainer, ...paginationStyle }}>
        {Array.from({ length: size }).map((_, index) => (
          <TouchableOpacity
            style={[
              styles.pagination,
              paginationStyleItem,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor },
            ]}
            key={index}
            onPress={() => scrollToIndex({ index })}
          />
        ))}
      </View>
    </View>
  );
};
Pagination.propTypes = {
  scrollToIndex: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  paginationIndex: PropTypes.number,
  paginationActiveColor: PropTypes.string,
  paginationDefaultColor: PropTypes.string,
  paginationStyle: ViewPropTypes.style,
  paginationStyleItem: ViewPropTypes.style,
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {},
};

export default Pagination;
