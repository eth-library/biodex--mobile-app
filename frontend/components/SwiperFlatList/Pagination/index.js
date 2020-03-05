import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes, Text, Dimensions } from 'react-native';

import { colors, vertical, horizontal } from '../themes';
import Theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginVertical: vertical.xxSmall,
    alignItems: 'center',
    bottom: Dimensions.get('window').height * 0.15,
    width: '100%'
  },
  text: {
    color: Theme.colors.grey,
    fontFamily: Theme.fonts.primary,
    marginBottom: vertical.xxSmall
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  paginationContainer: {
    flexDirection: 'row'
  }
});

const Pagination = ({
  size,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
  paginationStyle,
  paginationStyleItem
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>swipe</Text>
      <View style={{...styles.paginationContainer, ...paginationStyle}}>
        {Array.from({ length: size }).map((_, index) => (
          <TouchableOpacity
            style={[
              styles.pagination,
              paginationStyleItem,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor }
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
  paginationStyleItem: ViewPropTypes.style
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {}
};

export default Pagination;
