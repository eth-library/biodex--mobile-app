import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Modal,
  View,
  StatusBar
} from 'react-native';
import * as ExpoImageManipulator from 'expo-image-manipulator';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';

import ImageCropOverlay from './ImageCropOverlay';
import Header from './Header';
import CropButton from './CropButton';

class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      cropMode: false,
      processing: false,
      zoomScale: 1,
      overlayPos: {
        left: null,
        top: null,
      },
      overlaySize: {
        width: 0,
        height: 0,
      },
      imageEditableSize: {
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
      convertedHeight: h,
    };
    const ratio = Math.min(1920 / w, 1080 / h);
    sizes.convertedWidth = Math.round(w * ratio);
    sizes.convertedHeight = Math.round(h * ratio);
    return sizes;
  };

  async onConvertImageToEditableSize() {
    const {
      photo: { uri: rawUri },
    } = this.props;
    Image.getSize(rawUri, async (imgW, imgH) => {
      const { convertedWidth, convertedHeight } = this.onGetCorrectSizes(imgW, imgH);
      const { uri, width, height } = await ExpoImageManipulator.manipulateAsync(rawUri, [
        {
          resize: {
            width: convertedWidth,
            height: convertedHeight,
          },
        },
      ]);
      this.setState({
        uri,
        imageEditableSize: {
          width,
          height,
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

        this.state.imageEditableSize.width = croppedWidth;
        this.state.imageEditableSize.height = croppedHeight;

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
      imageRatio < originalHeight / Dimensions.get('window').width ? Dimensions.get('window').width : originalHeight / imageRatio;
    const renderedImageHeight =
      imageRatio < originalHeight / Dimensions.get('window').width ? Dimensions.get('window').width * imageRatio : originalHeight;

    const renderedImageY = (originalHeight - renderedImageHeight) / 2.0;
    const renderedImageX = (Dimensions.get('window').width - renderedImageWidth) / 2.0;

    const renderImageObj = {
      left: renderedImageX,
      top: renderedImageY,
      width: renderedImageWidth,
      height: renderedImageHeight,
    };

    const cropOverlayObj = {
      left: this.state.overlayPos.left,
      top: this.state.overlayPos.top,
      width: this.state.overlaySize.width,
      height: this.state.overlaySize.height,
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
      const manipResult = await ExpoImageManipulator.manipulateAsync(
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
      overlaySize,
      overlayPos,
      imageEditableSize,
    } = this.state;

    const imageRatio = imageEditableSize.height / imageEditableSize.width ? imageEditableSize.height / imageEditableSize.width : 0;

    let originalHeight = Dimensions.get('window').height - 64;
    if (isIphoneX()) {
      originalHeight = Dimensions.get('window').height - 122;
    }

    const cropRatio = originalHeight / Dimensions.get('window').width;
    const cropWidth = imageRatio < cropRatio ? Dimensions.get('window').width : originalHeight / imageRatio;
    const cropHeight = imageRatio < cropRatio ? Dimensions.get('window').width * imageRatio : originalHeight;
    const cropInitialTop = (originalHeight - cropHeight) / 2.0;
    const cropInitialLeft = (Dimensions.get('window').width - cropWidth) / 2.0;

    if (overlaySize.width === 0 && cropMode) {
      overlaySize.width = Math.min(cropWidth, cropHeight);
      overlaySize.height = Math.min(cropWidth, cropHeight);
      overlayPos.top = cropInitialTop;
      overlayPos.left = cropInitialLeft;
    }

    const maxCropWidth = Math.min(cropWidth, cropHeight);

    return (
      <Modal
        animationType='slide'
        transparent
        visible={isVisible}
        hardwareAccelerated
      >
        <StatusBar hidden={this.props.statusBarHidden} />
        <Header onCropImage={this.onCropImage} onCancel={this.props.onCancel} processing={processing} btnTexts={btnTexts} />
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
              width={Dimensions.get('window').width}
              height={originalHeight}
            />
            {mounted && cropMode && (
              <ImageCropOverlay
                onLayoutChanged={(top, left, w, height) => {
                  this.setState({
                    overlaySize: {
                      width: w,
                      height: height,
                    },
                    overlayPos: {
                      top: top,
                      left: left,
                    },
                  });
                }}
                initialTop={cropInitialTop}
                initialLeft={cropInitialLeft}
                minSize={150}
                borderColor={borderColor}
                overlaySize={this.state.overlaySize}
                overlayPos={this.state.overlayPos}
                maxCropWidth={maxCropWidth}
              />
            )}
            <CropButton onCropImage={this.onCropImage} processing={processing} btnTexts={btnTexts} style={{ alignItems: 'center' }} />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statusBarHidden: state.statusBar.hidden
  };
};

export default connect(mapStateToProps)(ImageCropper);

ImageCropper.defaultProps = {
  borderColor: '#a4a4a4',
  btnTexts: {
    crop: 'CROP',
    rotate: 'Rotate',
    done: 'Done',
    processing: 'PROCESSING',
  },
  saveOptions: {
    compress: 1,
    format: ExpoImageManipulator.SaveFormat.PNG,
    base64: false,
  },
  fixedMask: null,
};

ImageCropper.propTypes = {
  borderColor: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  btnTexts: PropTypes.object,
  fixedMask: PropTypes.object,
  saveOptions: PropTypes.object,
  photo: PropTypes.object.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
