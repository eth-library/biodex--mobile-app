// import React, { useEffect, useState } from 'react';
// import { View, Dimensions, Platform, StyleSheet } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

// const SafeAreaView = props => {
//   const [portrait, setPortrait] = useState(
//     Dimensions.get('window').width < Dimensions.get('window').height
//   );
//   const [styles, setStyles] = useState({});

//   useEffect(() => {
//     const updateLayout = () => {
//       setPortrait(!portrait);
//     };

//     Dimensions.addEventListener('change', () => updateLayout);
//     return () => {
//       Dimensions.removeEventListener('change', updateLayout);
//     };
//   }, [portrait]);

//   useEffect(() => {
//     setStyles(layout(portrait, Dimensions.get('window').width, Dimensions.get('window').height));
//   }, [portrait]);

//   return <View style={{ ...styles, ...props.style }}>{props.children}</View>;
// };

// const layout = (isPortrait, width, height) => {
//   const portrait = StyleSheet.create({
//     container: {
//       width: Dimensions.get('window').width,
//       ...Platform.select({
//         // heights based on https://stackoverflow.com/questions/46376860/what-is-the-safe-region-for-iphone-x-in-pixels-that-factors-the-top-notch-an
//         ios: {
//           height:
//             getStatusBarHeight() === 20
//               ? Dimensions.get('window').height - getStatusBarHeight()
//               : Dimensions.get('window').height - getStatusBarHeight() - 34
//         },
//         // On android if the status bar is small (24), Dimensions.get('window).height returns the height including that bar. If the status bar has a notch, it is calculated properly
//         android: {
//           height:
//             getStatusBarHeight() === 24
//               ? Dimensions.get('window').height - 24
//               : Dimensions.get('window').height - 28
//         }
//       }),
//       top: getStatusBarHeight(),
//       backgroundColor: 'orange'
//     }
//   });

//   const landscape = StyleSheet.create({
//     container: {
//       width: Dimensions.get('window').width,
//       ...Platform.select({
//         // heights based on https://stackoverflow.com/questions/46376860/what-is-the-safe-region-for-iphone-x-in-pixels-that-factors-the-top-notch-an
//         ios: {
//           height:
//             getStatusBarHeight() === 20
//               ? Dimensions.get('window').height - getStatusBarHeight()
//               : Dimensions.get('window').height - getStatusBarHeight() - 34
//         },
//         // On android if the status bar is small (24), Dimensions.get('window).height returns the height including that bar. If the status bar has a notch, it is calculated properly
//         android: {
//           height:
//             getStatusBarHeight() === 24
//               ? Dimensions.get('window').height - 24
//               : Dimensions.get('window').height - 28
//         }
//       }),
//       top: getStatusBarHeight(),
//       backgroundColor: 'green'
//     }
//   });

//   return isPortrait ? portrait : landscape;
// };

// export default SafeAreaView;
