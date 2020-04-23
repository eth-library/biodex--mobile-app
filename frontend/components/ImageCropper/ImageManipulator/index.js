import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Modal,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { isIphoneX } from 'react-native-iphone-x-helper';
import ImageCropOverlay from '../ImageCropOverlay';

const { width } = Dimensions.get('window');

class ExpoImageManipulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      cropMode: false,
      processing: false,
      zoomScale: 1,
      // position of the cropoverlay
      currentPos: {
        left: null,
        top: null,
      },
      // size of the cropoverlay
      currentSize: {
        width: 0,
        height: 0,
      },
      // image editable size
      actualSize: {
        width: 0,
        height: 0,
      },
    };

    this.scrollOffset = 0;
  }

  async componentDidMount() {
    await this.onConvertImageToEditableSize();
    this.setState({ mounted: true });
  }

  onGetCorrectSizes = (w, h) => {
    const sizes = {
      convertedWidth: w,
      convertedheight: h,
    };
    const ratio = Math.min(1920 / w, 1080 / h);
    sizes.convertedWidth = Math.round(w * ratio);
    sizes.convertedheight = Math.round(h * ratio);
    return sizes;
  };

  async onConvertImageToEditableSize() {
    const {
      photo: { uri: rawUri },
    } = this.props;
    Image.getSize(rawUri, async (imgW, imgH) => {
      const { convertedWidth, convertedheight } = this.onGetCorrectSizes(imgW, imgH);
      const { uri, width: w, height } = await ImageManipulator.manipulateAsync(rawUri, [
        {
          resize: {
            width: convertedWidth,
            height: convertedheight,
          },
        },
      ]);
      this.setState({
        uri,
        actualSize: {
          width: w,
          height: height,
        },
        cropMode: true,
      });
    });
  }

  onCropImage = () => {
    this.setState({ processing: true });
    const { uri } = this.state;
    Image.getSize(uri, async (actualWidth, actualHeight) => {
      const cropObj = this.getCropBounds(actualWidth, actualHeight);
      if (cropObj.height > 0 && cropObj.width > 0) {
        let uriToCrop = uri;
        const {
          uri: uriCroped,
          base64,
          width: croppedWidth,
          height: croppedHeight,
        } = await this.crop(cropObj, uriToCrop);

        this.state.actualSize.width = croppedWidth;
        this.state.actualSize.height = croppedHeight;

        this.props.chosenPicture({ uri: uriCroped, base64 });
        this.props.onToggleModal();
      } else {
        this.setState({ cropMode: false, processing: false });
      }
    });
  };

  onHandleScroll = (event) => {
    this.scrollOffset = event.nativeEvent.contentOffset.y;
  };

  getCropBounds = (actualWidth, actualHeight) => {
    const imageRatio = actualHeight / actualWidth;
    let originalHeight = Dimensions.get('window').height - 64;
    if (isIphoneX()) {
      originalHeight = Dimensions.get('window').height - 122;
    }
    const renderedImageWidth =
      imageRatio < originalHeight / width ? width : originalHeight / imageRatio;
    const renderedImageHeight =
      imageRatio < originalHeight / width ? width * imageRatio : originalHeight;

    const renderedImageY = (originalHeight - renderedImageHeight) / 2.0;
    const renderedImageX = (width - renderedImageWidth) / 2.0;

    const renderImageObj = {
      left: renderedImageX,
      top: renderedImageY,
      width: renderedImageWidth,
      height: renderedImageHeight,
    };

    const cropOverlayObj = {
      left: this.state.currentPos.left,
      top: this.state.currentPos.top,
      width: this.state.currentSize.width,
      height: this.state.currentSize.height,
    };

    let intersectAreaObj = {};

    const x = Math.max(renderImageObj.left, cropOverlayObj.left);
    const num1 = Math.min(
      renderImageObj.left + renderImageObj.width,
      cropOverlayObj.left + cropOverlayObj.width
    );
    const y = Math.max(renderImageObj.top, cropOverlayObj.top);
    const num2 = Math.min(
      renderImageObj.top + renderImageObj.height,
      cropOverlayObj.top + cropOverlayObj.height
    );
    if (num1 >= x && num2 >= y) {
      intersectAreaObj = {
        originX: (x - renderedImageX) * (actualWidth / renderedImageWidth),
        originY: (y - renderedImageY) * (actualWidth / renderedImageWidth),
        width: (num1 - x) * (actualWidth / renderedImageWidth),
        height: (num2 - y) * (actualWidth / renderedImageWidth),
      };
    } else {
      intersectAreaObj = {
        originX: x - renderedImageX,
        originY: y - renderedImageY,
        width: 0,
        height: 0,
      };
    }
    return intersectAreaObj;
  };

  crop = async (cropObj, uri) => {
    const { saveOptions } = this.props;
    if (cropObj.height > 0 && cropObj.width > 0) {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            crop: cropObj,
          },
        ],
        saveOptions
      );
      return manipResult;
    }
    return {
      uri: null,
      base64: null,
    };
  };

  render() {
    const { isVisible, borderColor, btnTexts } = this.props;
    const {
      uri,
      cropMode,
      mounted,
      processing,
      currentSize,
      currentPos,
      actualSize,
    } = this.state;

    const imageRatio =
      actualSize.height / actualSize.width ? actualSize.height / actualSize.width : 0;

    let originalHeight = Dimensions.get('window').height - 64;
    if (isIphoneX()) {
      originalHeight = Dimensions.get('window').height - 122;
    }

    const cropRatio = originalHeight / width;

    const cropWidth = imageRatio < cropRatio ? width : originalHeight / imageRatio;
    const cropHeight = imageRatio < cropRatio ? width * imageRatio : originalHeight;
    const cropInitialTop = (originalHeight - cropHeight) / 2.0;
    const cropInitialLeft = (width - cropWidth) / 2.0;

    if (currentSize.width === 0 && cropMode) {
      currentSize.width = Math.min(cropWidth, cropHeight);
      currentSize.height = Math.min(cropWidth, cropHeight);
      currentPos.top = cropInitialTop;
      currentPos.left = cropInitialLeft;
    }

    return (
      <Modal
        animationType='slide'
        transparent
        visible={isVisible}
        hardwareAccelerated
      >
        <SafeAreaView
          style={{
            width,
            flexDirection: 'row',
            backgroundColor: 'black',
            justifyContent: 'space-between',
          }}
        >
          <StatusBar hidden />
          <ScrollView
            scrollEnabled={false}
            horizontal
            contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 15,
              height: 44,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.onCancel();
                }}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} name='arrow-left' color='white' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onCropImage()}
                style={{
                  marginRight: 10,
                  alignItems: 'flex-end',
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcon
                    style={{ flexDirection: 'row', marginRight: 10 }}
                    size={24}
                    name={!processing ? 'done' : 'access-time'}
                    color='white'
                  />
                  <Text style={{ fontWeight: '500', color: 'white', fontSize: 18 }}>
                    {!processing ? btnTexts.crop : btnTexts.processing}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={{ flex: 1, backgroundColor: 'black', width: Dimensions.get('window').width }}>
          <ScrollView
            style={{ position: 'relative', flex: 1 }}
            contentContainerStyle={{ backgroundColor: 'black' }}
            maximumZoomScale={5}
            minimumZoomScale={0.5}
            onScroll={this.onHandleScroll}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={(c) => {
              this.scrollView = c;
            }}
            scrollEventThrottle={16}
            scrollEnabled={false}
            pinchGestureEnabled={false}
          >
            <Image
              style={{ backgroundColor: 'black' }}
              source={{ uri }}
              resizeMode={imageRatio >= 1 ? 'contain' : 'contain'}
              width={width}
              height={originalHeight}
            />
            {mounted && cropMode && (
              <ImageCropOverlay
                onLayoutChanged={(top, left, w, height) => {
                  this.setState({
                    currentSize: {
                      width: w,
                      height: height,
                    },
                    currentPos: {
                      top: top,
                      left: left,
                    },
                  });
                }}
                initialTop={cropInitialTop}
                initialLeft={cropInitialLeft}
                minSize={150}
                borderColor={borderColor}
                currentSize={this.state.currentSize}
                currentPos={this.state.currentPos}
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default ExpoImageManipulator;

ExpoImageManipulator.defaultProps = {
  borderColor: '#a4a4a4',
  btnTexts: {
    crop: 'Crop',
    rotate: 'Rotate',
    done: 'Done',
    processing: 'Processing',
  },
  saveOptions: {
    compress: 1,
    format: ImageManipulator.SaveFormat.PNG,
    base64: false,
  },
  fixedMask: null,
};

ExpoImageManipulator.propTypes = {
  borderColor: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  btnTexts: PropTypes.object,
  fixedMask: PropTypes.object,
  saveOptions: PropTypes.object,
  photo: PropTypes.object.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
