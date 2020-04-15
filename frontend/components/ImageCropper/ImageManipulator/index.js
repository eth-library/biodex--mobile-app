import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, Image, ScrollView, Modal, View, Text, TouchableOpacity } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { isIphoneX } from 'react-native-iphone-x-helper';

import Header from './Header';
import ImageCropOverlay from '../ImageCropOverlay/indexold.js';

const { width, height } = Dimensions.get('window');

const ExpoImageManipulator = (props) => {
  const [cropMode, setCropMode] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [uri, setUri] = useState(props.photo.uri);
  const [actualSize, setActualSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    console.log('did mount');
    onConvertImageToEditableSize();
  }, [])

  const onToggleModal = () => {
    props.onToggleModal();
    setCropMode(false);
  };

  const onGetCorrectSizes = (w, h) => {
    const sizes = {
      convertedWidth: w,
      convertedheight: h,
    };
    const ratio = Math.min(1920 / w, 1080 / h);
    sizes.convertedWidth = Math.round(w * ratio);
    sizes.convertedheight = Math.round(h * ratio);
    return sizes;
  };

  const onConvertImageToEditableSize = async () => {
    const { photo: { uri: rawUri } } = props;
    Image.getSize(rawUri, async (imgW, imgH) => {
      const { convertedWidth, convertedheight } = onGetCorrectSizes(imgW, imgH);
      const { uri, width: w, height } = await ImageManipulator.manipulateAsync(rawUri, [
        {
          resize: {
            width: convertedWidth,
            height: convertedheight,
          },
        },
      ]);
      console.log('new size', w, height)
      setUri(uri);
      setActualSize({ width: w, height: height });
    });
  };

  const onCropImage = () => {
    setProcessing(true);
    console.log('cropping');
    Image.getSize(uri, async (actualWidth, actualHeight) => {
      console.log(actualWidth, actualHeight)
      // const cropObj = this.getCropBounds(actualWidth, actualHeight);
      // if (cropObj.height > 0 && cropObj.width > 0) {
      //   let uriToCrop = uri;
      //   const {
      //     uri: uriCroped,
      //     base64,
      //     width: croppedWidth,
      //     height: croppedHeight,
      //   } = await this.crop(cropObj, uriToCrop);

      //   this.actualSize.width = croppedWidth;
      //   this.actualSize.height = croppedHeight;

      //   this.setState({
      //     uri: uriCroped,
      //     base64,
      //     cropMode: false,
      //     processing: false,
      //   });
      // } else {
      //   this.setState({ cropMode: false, processing: false });
      });
  };

  const getCropBounds = (actualWidth, actualHeight) => {
    console.log('get crop bounds');
    // const imageRatio = actualHeight / actualWidth;
    // let originalHeight = Dimensions.get('window').height - 64;
    // if (isIphoneX()) {
    //   originalHeight = Dimensions.get('window').height - 122;
    // }
    // const renderedImageWidth =
    //   imageRatio < originalHeight / width ? width : originalHeight / imageRatio;
    // const renderedImageHeight =
    //   imageRatio < originalHeight / width ? width * imageRatio : originalHeight;

    // const renderedImageY = (originalHeight - renderedImageHeight) / 2.0;
    // const renderedImageX = (width - renderedImageWidth) / 2.0;

    // const renderImageObj = {
    //   left: renderedImageX,
    //   top: renderedImageY,
    //   width: renderedImageWidth,
    //   height: renderedImageHeight,
    // };
    // const cropOverlayObj = {
    //   left: this.currentPos.left,
    //   top: this.currentPos.top,
    //   width: this.currentSize.width,
    //   height: this.currentSize.height,
    // };

    // let intersectAreaObj = {};

    // const x = Math.max(renderImageObj.left, cropOverlayObj.left);
    // const num1 = Math.min(
    //   renderImageObj.left + renderImageObj.width,
    //   cropOverlayObj.left + cropOverlayObj.width
    // );
    // const y = Math.max(renderImageObj.top, cropOverlayObj.top);
    // const num2 = Math.min(
    //   renderImageObj.top + renderImageObj.height,
    //   cropOverlayObj.top + cropOverlayObj.height
    // );
    // if (num1 >= x && num2 >= y) {
    //   intersectAreaObj = {
    //     originX: (x - renderedImageX) * (actualWidth / renderedImageWidth),
    //     originY: (y - renderedImageY) * (actualWidth / renderedImageWidth),
    //     width: (num1 - x) * (actualWidth / renderedImageWidth),
    //     height: (num2 - y) * (actualWidth / renderedImageWidth),
    //   };
    // } else {
    //   intersectAreaObj = {
    //     originX: x - renderedImageX,
    //     originY: y - renderedImageY,
    //     width: 0,
    //     height: 0,
    //   };
    // }
    // return intersectAreaObj;
  };

  const crop = async (cropObj, uri) => {
    console.log('crop');
    // const { saveOptions } = this.props;
    // if (cropObj.height > 0 && cropObj.width > 0) {
    //   const manipResult = await ImageManipulator.manipulateAsync(
    //     uri,
    //     [
    //       {
    //         crop: cropObj,
    //       },
    //     ],
    //     saveOptions
    //   );
    //   return manipResult;
    // }
    // return {
    //   uri: null,
    //   base64: null,
    // };
  };

  const { isVisible } = props;

  // const imageRatio = this.actualSize.height / this.actualSize.width;
  // let originalHeight = Dimensions.get('window').height - 64;
  // if (isIphoneX()) {
  //   originalHeight = Dimensions.get('window').height - 122;
  // }

  // const cropRatio = originalHeight / width;

  // const cropWidth = imageRatio < cropRatio ? width : originalHeight / imageRatio;
  // const cropHeight = imageRatio < cropRatio ? width * imageRatio : originalHeight;

  // const cropInitialTop = (originalHeight - cropHeight) / 2.0;
  // const cropInitialLeft = (width - cropWidth) / 2.0;

  // if (this.currentSize.width === 0 && cropMode) {
  //   this.currentSize.width = cropWidth;
  //   this.currentSize.height = cropHeight;

  //   this.currentPos.top = cropInitialTop;
  //   this.currentPos.left = cropInitialLeft;
  // }
  return (
    <Modal
      animationType='slide'
      transparent
      visible={isVisible}
      hardwareAccelerated
      onRequestClose={onToggleModal}
    >
      <Header onToggleModal={onToggleModal} cropMode={cropMode} setCropMode={setCropMode} onCropImage={onCropImage} processing={processing} />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', width: Dimensions.get('window').width }}>
          <Image
            style={{ backgroundColor: 'red' }}
            source={{ uri }}
            resizeMode='contain'
            width={width}
            height={height - 50} // 50 = header height
          />
          {cropMode && (
            <ImageCropOverlay
              onLayoutChanged={(top, left, w, height) => {
                console.log('layoutchange');
                // this.currentSize.width = w;
                // this.currentSize.height = height;
                // this.currentPos.top = top;
                // this.currentPos.left = left;
              }}
              initialWidth={width}
              initialHeight={width}
              initialTop={(height - width) / 2}
              initialLeft={0}
              minHeight={150}
              minWidth={150}
            />
          )}
      </View>
    </Modal>
  );
};

export default ExpoImageManipulator;
