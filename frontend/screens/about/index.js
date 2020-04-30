import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Logo from '../../components/Logo';
import Theme from '../../theme';

const SubTitle = ({ text }) => <Text style={styles.subTitle}>{text}</Text>
const Link = ({ text, onPress }) => <Text style={styles.link} onPress={onPress}>{text}</Text>;

const About = () => {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Logo style={styles.logo} />

        <Text style={styles.title}>ABOUT THIS APP</Text>

        <View style={styles.descriptionContainer}>
    
          <Text style={styles.description}>
            This project is a collaboration between <Link text='ETH Library Lab' onPress={() => Linking.openURL('https://www.librarylab.ethz.ch/')} /> and{' '}
            <Link text='ETH Entomological Collection' onPress={() => Linking.openURL('https://usys.ethz.ch/en/research/collections/entomological-collection.html')}/>.
          </Text>
    

        <View style={styles.paragraph}>
          <SubTitle text='How It Works' />
          <Text style={styles.paragraphText}>
            Pictures from your phone are uploaded to our online prediction API. A Neural Network
            calculates the top species predictions.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <SubTitle text='Contact' />
          <Text style={styles.paragraphText}>
            If you are interested in learning more about the project or are interested in
            contributing, please contact us via <Link text='email' onPress={() => Linking.openURL('mailto:barry.sunderland@librarylab.ethz.ch')} />
          </Text>
        </View>

        <View style={styles.paragraph}>
          <SubTitle text='Version' />
          <Text style={styles.paragraphText}>App version: <Text style={styles.version}>v0.01</Text></Text>
        </View>
        </View>

        <View style={styles.developmentInfoContainer}>
          <Text style={styles.developmentInfo}>Prediction API developed by</Text>
          <Text style={styles.developmentInfo}>ETH Library and ETH Library Lab</Text>

          <Text style={styles.propulsion}>Native App development by</Text>
          <Text style={styles.propulsionLink} onPress={() => Linking.openURL('https://propulsion.academy/')}>Propulsion Academy</Text>
        </View>

        <View style={styles.footer}>
          <Link text='Term of Use' onPress={() => Linking.openURL('https://drive.google.com/open?id=1gsSL9kRH0Qf1cdjkvQQXwKBA-RFnUg4t')}/>
          <Text style={styles.copyright}>© 2020 ETH Zürich</Text>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  logo: {
    width: 130,
    height: Dimensions.get('window').height >= 700 ? 50 : 40,
    marginTop: Theme.space.vertical.xxSmall
  },
  title: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.accent,
    textAlign: 'left',
    width: '90%',
    marginBottom: Theme.space.vertical.xxSmall
  },
  subTitle: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.accent,
    textDecorationLine: 'underline',
    textDecorationColor: Theme.colors.accent
  },
  descriptionContainer: {
    width: '90%'
  },
  description: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.accent,
  },
  paragraph: {
    marginTop: Dimensions.get('window').height >= 700 ? Theme.space.vertical.medium : Theme.space.vertical.xSmall
  },
  paragraphText: {
    fontFamily: Theme.fonts.primary,
    color: Theme.colors.accent,
  },
  version: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.accent,
  },
  developmentInfoContainer: {
    width: '90%',
  },
  developmentInfo: {
    fontFamily: Theme.fonts.primaryItalic,
    color: Theme.colors.darkGrey,
  },
  propulsion: {
    fontFamily: Theme.fonts.primaryItalic,
    color: Theme.colors.darkGrey,
    marginTop: Dimensions.get('window').height >= 700 ? Theme.space.vertical.small : Theme.space.vertical.xxSmall
  },
  propulsionLink: {
    fontFamily: Theme.fonts.primaryBoldItalic,
    color: Theme.colors.darkGrey,
    textDecorationLine: 'underline',
    textDecorationColor: Theme.colors.darkGrey
  },
  footer: {
    width: '90%',
    marginVertical: Theme.space.vertical.xxSmall
  },
  link: {
    fontFamily: Theme.fonts.primary,
    color: Theme.colors.primary,
    textDecorationLine: 'underline',
    textDecorationColor: Theme.colors.primary
  },
  linkBold: {
    fontFamily: Theme.fonts.primaryBold,
    color: Theme.colors.primary,
  },
  copyright: {
    marginTop: Dimensions.get('window').height >= 700 ? Theme.space.vertical.xSmall : Theme.space.vertical.xxSmall
  }
});

export default About;
