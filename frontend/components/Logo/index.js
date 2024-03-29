import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Theme from '../../theme';

// Guide on how to use SVG in React Native with Expo / Why it was implemented like this
// https://medium.com/@briworkman9/how-to-use-svgs-in-react-native-with-expo-ec34f085f5e0

const Logo = ({ style }) => {
  const logoSvg = `<svg
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 248.09332 90.706665"
  height="90.706665"
  width="248.09332"
  xml:space="preserve"
  id="svg2"
  version="1.1"><metadata
    id="metadata8"><rdf:RDF><cc:Work
        rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
          rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs
    id="defs6" /><g
    transform="matrix(1.3333333,0,0,-1.3333333,0,90.706667)"
    id="g10"><g
      transform="scale(0.1)"
      id="g12"><path
        id="path14"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1091.8,287.27 c -8.1,-40.165 -39.13,-42.211 -45.28,-42.211 -17.52,0 -27.97,10.121 -27.97,27.046 0,3.86 0.57,9.122 1.55,14.387 l 19.19,95.617 0.09,0.368 h -22.68 l -19.552,-98.047 -0.257,-1.403 c -0.84,-4.429 -1.625,-8.629 -1.625,-14.078 0,-26.344 17.294,-44.019 43.084,-44.019 18.86,0 34.01,6.187 45.07,18.41 l -2.94,-16.152 -0.07,-0.383 h 22.35 l 30.88,155.304 0.07,0.368 h -23 L 1091.8,287.27" /><path
        id="path16"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1246.35,384.363 c -17.52,0 -33.04,-7.16 -42.81,-19.734 l 3.51,17.48 0.06,0.368 h -22.35 l -30.89,-155.289 -0.07,-0.383 h 22.69 l 18.91,95.246 c 4.83,24.449 23.6,42.176 44.65,42.176 9.04,0 16.16,-3.563 21.76,-10.872 l 0.21,-0.285 18.41,16.489 -0.19,0.238 c -8.5,9.82 -19.6,14.566 -33.89,14.566" /><path
        id="path18"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 871.492,362.73 -0.066,-0.386 h 77.359 l -102.992,-116.446 -0.055,-0.058 -3.883,-19.035 h 109.782 l 3.906,20.144 h -82.066 l 103.308,116.449 0.051,0.067 3.871,19.012 H 875.336 l -3.844,-19.747" /><path
        id="path20"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1283.32,227.188 -0.08,-0.383 h 22.67 l 30.93,155.672 h -22.29 l -31.23,-155.289" /><path
        id="path22"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1590.72,384.355 c -18.65,0 -33.21,-5.714 -44.4,-17.496 l 17.59,86.688 h -22.68 l -45.56,-226.762 h 22.68 l 18.91,95.258 c 8.1,40.148 39.41,42.18 45.59,42.18 17.34,0 27.69,-10.114 27.69,-27.039 0,-3.84 -0.59,-9.079 -1.58,-14.403 l -19.24,-95.996 h 22.65 l 19.89,98.086 c 0.95,5.219 1.59,9.621 1.59,15.469 0,26.332 -17.36,44.015 -43.13,44.015" /><path
        id="path24"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1440.41,384.363 c -41.13,0 -70,-28.972 -79.23,-79.492 -1.66,-8.461 -2.23,-17.922 -2.23,-23.969 0,-34.519 20.95,-55.972 54.71,-55.972 19.63,0 37.55,7.527 51.81,21.773 l 0.2,0.215 -13.07,15.953 -0.24,0.281 -0.24,-0.265 c -12.03,-12.657 -22.81,-17.828 -37.21,-17.828 -16.09,0 -33.3,9.578 -33.3,36.48 0,8.418 1,15.375 2.49,23.215 2.43,13.199 7.9,31.641 20.05,44.469 9.66,9.957 21.11,15.004 34.06,15.004 13.52,0 21.98,-4.809 30.22,-17.149 l 0.19,-0.305 16.64,14.063 0.24,0.195 -0.18,0.254 c -11.36,15.969 -25.22,23.078 -44.91,23.078" /><path
        id="path26"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1322.96,425.199 h 22.72 l 5.65,28.348 h -22.64 l -5.73,-28.348" /><path
        id="path28"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1102.49,425.199 h 22.73 l 5.62,28.348 h -22.61 l -5.74,-28.348" /><path
        id="path30"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="m 1042.03,425.199 h 22.72 l 5.64,28.348 h -22.62 l -5.74,-28.348" /><path
        id="path32"
        style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
        d="M 739.102,365.68 H 688.086 L 706,453.547 H 272.355 L 226.813,226.785 h 172.898 l 11.324,56.68 H 308.949 l 6.192,31.183 h 102.05 l 10.274,51.032 H 325.391 l 6.179,31.183 h 161.805 l -34.16,-170.078 h 70.867 l 34.156,170.078 h 59.496 L 589.578,226.785 h 70.883 l 17.488,87.863 h 51.004 l -17.488,-87.863 h 70.863 l 45.563,226.762 H 757.02 L 739.102,365.68" /></g></g></svg>`;

  const LogoComponent = () => (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.subContainer}>
        <SvgXml xml={logoSvg} width={'100%'} height={'100%'} />
      </View>
    </View>
  );
  return <LogoComponent />;
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: 200,
    height: 60,
  },
});

export default Logo;
