import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import Logo from '../../assets/logo.png';
import Butterflies from '../../assets/butterflies.jpg';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Space from '../../constants/Space';

function HomeScreen({ style }) {
  return (
    <View style={{ ...style, ...styles.container }}>
      <View style={styles.contentContainer}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title}>to the</Text>
          <Text style={styles.title}>ETH Leipdoptera Classifier</Text>
        </View>
        <Image style={styles.img} source={Butterflies} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  contentContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.7
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'center',
    marginTop: Space.vertical.medium
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: Fonts.primaryBold,
    fontSize: Fonts.sizeL,
    color: Colors.black
  },
  img: {
    width: 200,
    height: 200
  }
});

export default HomeScreen;
