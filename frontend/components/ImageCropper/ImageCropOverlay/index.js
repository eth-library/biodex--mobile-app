import React, { Component } from 'react';
import { View, PanResponder, Dimensions } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import TopRow from './TopRow';
import MidRow from './MidRow';
import BottomRow from './BottomRow';

class ImageCropOverlay extends React.Component {
  state = {
    draggingTL: false,
    draggingTM: false,
    draggingTR: false,
    draggingML: false,
    draggingMM: false,
    draggingMR: false,
    draggingBL: false,
    draggingBM: false,
    draggingBR: false,
    initialTop: this.props.initialTop,
    currentTop: this.props.currentPos.top,
    initialLeft: this.props.initialLeft,
    currentLeft: this.props.currentPos.left,
    initialWidth: this.props.initialWidth,
    currentWidth: this.props.currentSize.width,
    initialHeight: this.props.initialHeight,
    currentHeight: this.props.currentSize.height,

    offsetTop: 0,
    offsetLeft: 0,
  };
  panResponder = {};

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  checkCollision = () => {
    console.log(
      'initialTop',
      this.state.initialTop,
      '\n',
      'initialLeft',
      this.state.initialLeft,
      '\n',
      'initialWidth',
      this.state.initialWidth,
      '\n',
      'initialHeight',
      this.state.initialHeight,
      '\n',
      'offsetTop',
      this.state.offsetTop,
      '\n',
      'offsetLeft',
      this.state.offsetLeft,
      '\n',
      'currentSize',
      this.props.currentSize,
      '\n',
      'currentPos',
      this.props.currentPos,
      '\n'
    );
    // Only biggest move, as the cropping should always be a square
    // const biggestMove = y > x ? y : x;
    // const topHasSpace = initialTop - biggestMove >= 0;
    // const rightHasSpace =
    //   initialLeft + initialWidth + biggestMove <= Dimensions.get('window').width;
    // const bottomHasSpace =
    //   initialTop + initialHeight + biggestMove <= Dimensions.get('window').height;
    // const leftHasSpace = initialLeft - biggestMove >= 0;
    // // Moving the whole square around
    // if (selectedItem == 'mm') {
    //   setOffsetTop(gestureState.dy);
    //   setOffsetLeft(gestureState.dx);
    //   // If movement is from bottom left to top right, selected item is top right or bottom left and it will not go out of the screen
    // } else if (
    //   y < 0 &&
    //   x > 0 &&
    //   ['tr', 'bl'].includes(selectedItem) &&
    //   topHasSpace &&
    //   rightHasSpace
    // ) {
    //   setOffsetTop(-biggestMove);
    //   setOffsetLeft(biggestMove);
    //   // If movement is from top right to bottom left, selected item is top right or bottom left and it will not go out of the screen
    // } else if (
    //   y > 0 &&
    //   x < 0 &&
    //   ['tr', 'bl'].includes(selectedItem) &&
    //   leftHasSpace &&
    //   bottomHasSpace
    // ) {
    //   setOffsetTop(biggestMove);
    //   setOffsetLeft(-biggestMove);
    //   // Movement from bottom right to top left
    // } else if (
    //   y < 0 &&
    //   x < 0 &&
    //   ['tl', 'br'].includes(selectedItem) &&
    //   leftHasSpace &&
    //   topHasSpace
    // ) {
    //   setOffsetTop(biggestMove);
    //   setOffsetLeft(biggestMove);
    //   // Movement top left to bottom right
    // } else if (
    //   y > 0 &&
    //   x > 0 &&
    //   ['tl', 'br'].includes(selectedItem) &&
    //   rightHasSpace &&
    //   bottomHasSpace
    // ) {
    //   setOffsetTop(-biggestMove);
    //   setOffsetLeft(-biggestMove);
    // }
  };

  render() {
    const {
      initialWidth,
      currentWidth,
      initialHeight,
      currentHeight,
      initialTop,
      currentTop,
      initialLeft,
      currentLeft,
    } = this.state;
    return (
      <View
        {...this.panResponder.panHandlers}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: 'red',
            backgroundColor: 'rgb(0,0,0,0.5)',
            width: currentWidth,
            height: currentHeight,
            top: currentTop,
            left: currentLeft,
          },
        ]}
      >
        <TopRow
          draggingTL={this.state.draggingTL}
          draggingTM={this.state.draggingTM}
          draggingTR={this.state.draggingTR}
        />
        <MidRow
          draggingML={this.state.draggingML}
          draggingMM={this.state.draggingMM}
          draggingMR={this.state.draggingMR}
        />
        <BottomRow
          draggingBL={this.state.draggingBL}
          draggingBM={this.state.draggingBM}
          draggingBR={this.state.draggingBR}
        />
      </View>
    );
  }

  getTappedItem(x, y) {
    const { currentWidth, currentHeight } = this.state;
    const xPos = parseInt((x - this.props.currentPos.left) / (currentWidth / 3));
    const yPos = parseInt((y - this.props.currentPos.top - 64) / (currentHeight / 3));

    const index = yPos * 3 + xPos;
    if (index == 0) {
      return 'tl';
    }
    if (index == 1) {
      return 'tm';
    }
    if (index == 2) {
      return 'tr';
    }
    if (index == 3) {
      return 'ml';
    }
    if (index == 4) {
      return 'mm';
    }
    if (index == 5) {
      return 'mr';
    }
    if (index == 6) {
      return 'bl';
    }
    if (index == 7) {
      return 'bm';
    }
    if (index == 8) {
      return 'br';
    }
    return '';
  }

  // Should we become active when the user presses down on the square?
  handleStartShouldSetPanResponder = (event) => {
    return true;
  };

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = (event) => {
    // console.log(event.nativeEvent.locationX + ', ' + event.nativeEvent.locationY)

    const selectedItem = this.getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
    if (selectedItem == 'tl') {
      this.setState({ draggingTL: true });
    } else if (selectedItem == 'tr') {
      this.setState({ draggingTR: true });
    } else if (selectedItem == 'mm') {
      this.setState({ draggingMM: true });
    } else if (selectedItem == 'bl') {
      this.setState({ draggingBL: true });
    } else if (selectedItem == 'br') {
      this.setState({ draggingBR: true });
    }
  };

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {
    const {
      draggingTL,
      draggingTR,
      draggingMM,
      draggingBL,
      draggingBR,
      initialTop,
      currentInitialTop,
      currentTop,
      initialLeft,
      currentInitialLeft,
      currentLeft,
      initialHeight,
      initialWidth,
      currentWidth,
      offsetTop,
      offsetLeft,
    } = this.state;

    const y = gestureState.dy;
    const x = gestureState.dx;
    // Only biggest move, as the cropping should always be a square
    const biggestMove = y > x ? y : x;

    // TODO: If moving in one direction and then in the other direction, these checks will be wrong. need to compare with the previous y and x. to be fixed!
    const gestureTopLeftToBottomRight = y > 0 && x > 0
    const gestureTopRightToBottomLeft = y > 0 && x < 0
    const gestureBottomLeftToTopRight = y < 0 && x > 0
    const gestureBottomRightToTopLeft = y < 0 && x < 0

    let originalHeight = Dimensions.get('window').height - 64;
    if (isIphoneX()) {
      originalHeight = Dimensions.get('window').height - 122;
    }
    const maxHeight = originalHeight - initialTop
    let maxWidth = Dimensions.get('window').width;

    // console.log(
    //   '\n\nXXXXXXXXXXX\n',
    //   'initialTop',
    //   this.state.initialTop,
    //   '\n',
    //   'currentTop',
    //   this.state.currentTop,
    //   '\n',
    //   'initialLeft',
    //   this.state.initialLeft,
    //   '\n',
    //   'currentLeft',
    //   this.state.currentLeft,
    //   '\n',
    //   'biggestMove',
    //   biggestMove,
    //   '\n',
    //   'y',
    //   y,
    //   '\n',
    //   'x',
    //   x,
    //   '\n',
    //   'initialWidth',
    //   this.state.initialWidth,
    //   '\n',
    //   'initialHeight',
    //   this.state.initialHeight,
    //   '\n',
    //   'offsetTop',
    //   this.state.offsetTop,
    //   '\n',
    //   'offsetLeft',
    //   this.state.offsetLeft,
    //   '\n',
    //   'originalHeight',
    //   originalHeight,
    //   '\n',
    //   'currentSize',
    //   this.props.currentSize,
    //   '\n',
    //   'currentPos',
    //   this.props.currentPos,
    //   '\n'
    // );

    const state = {};

    // # If movement is from the middle square and the next position of the crop overlay won't be out of the image
    if (draggingMM) {
      // Check that next position is between top and bottom of the image
      if (this.props.currentPos.top + y >= initialTop && this.props.currentPos.top + this.props.currentSize.height + y <= maxHeight) {
        state.currentTop = this.props.currentPos.top + y;
      } else {
        // If overlay would be out of the top of the image, set the overlay top to top of the image
        if (this.props.currentPos.top + y <= initialTop) {
          state.currentTop = initialTop;
          // If overlay would be out of the bottom of the image, set the overlay bottom to bottom of the image
        } else if (this.props.currentPos.top + this.props.currentSize.height + y >= maxHeight) {
          state.currentTop = originalHeight - this.props.currentSize.height - initialTop;
        }
      }
      // Check that next position is between left and right of the image
      if (this.props.currentPos.left + x >= 0 && this.props.currentPos.left + currentWidth + x <= maxWidth) {
          state.currentLeft = this.props.currentPos.left + x
      } else {
        // If overlay would be out of the left of the image, set the overlay left to left of the image
        if (this.props.currentPos.left + x <= 0) {
          state.currentLeft = 0
          // If overlay would be out of the top of the image, set the overlay top to top of the image
        } else if (this.props.currentPos.left + currentWidth + x >= maxWidth) {
          state.currentLeft = maxWidth - currentWidth
        }
      }
    }

    
    // # If movement is from top right to bottom left and the dragging is done on the top right or bottom left square and the next position won't be out of the screen
    if (draggingBR) {
      if (gestureTopLeftToBottomRight && this.props.currentPos.left + this.props.currentSize.width + biggestMove <= maxWidth && this.props.currentPos.top + this.props.currentSize.height + biggestMove <= maxHeight) {
        console.log('down', x, y, biggestMove)
        state.currentWidth = this.props.currentSize.width + biggestMove;
        state.currentHeight = this.props.currentSize.height + biggestMove;
      } else if (gestureTopLeftToBottomRight && !this.props.currentPos.left + this.props.currentSize.width + biggestMove <= maxWidth && this.props.currentPos.top + this.props.currentSize.height + biggestMove <= maxHeight) {
        console.log('why')
        state.currentWidth = maxWidth - this.props.currentPos.left
        state.currentHeight = maxWidth - this.props.currentPos.left
      } else if (gestureTopLeftToBottomRight && this.props.currentPos.left + this.props.currentSize.width + biggestMove <= maxWidth && !this.props.currentPos.top + this.props.currentSize.height + biggestMove <= maxHeight) {
        console.log('what')
      }


      if (gestureBottomRightToTopLeft && this.props.currentPos.left + this.props.currentSize.width + biggestMove >= this.props.minSize) {
        console.log('up', x, y, biggestMove)
        state.currentWidth = this.props.currentSize.width + biggestMove;
        state.currentHeight = this.props.currentSize.height + biggestMove;
      }
    }

    // # If movement is from the top left square and the next position of the crop overlay won't be out of the image

    // # If movement is from bottom left to top right and the dragging is done on the bottom left or top right square and the next position won't be out of the screen
    if (draggingTL || draggingBR) {
    }
    // # If movement is from bottom right to top left and the dragging is done on the top left or bottom right square and the next position won't be out of the screen
    if (draggingTL || draggingBR) {
    }

    // Keep track of how far we've moved in total (dx and dy)
    // this.setState({
    //   currentWidth: 30,
    //   offsetTop: gestureState.dy,
    //   offsetLeft: gestureState.dx,
    // });
    this.setState(state);
  };

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    console.log('END');
    //   const {
    //     initialTop,
    //     initialLeft,
    //     initialWidth,
    //     initialHeight,
    //     draggingTL,
    //     draggingTM,
    //     draggingTR,
    //     draggingML,
    //     draggingMM,
    //     draggingMR,
    //     draggingBL,
    //     draggingBM,
    //     draggingBR,
    //   } = this.state;

    const state = {
      draggingTL: false,
      draggingTM: false,
      draggingTR: false,
      draggingML: false,
      draggingMM: false,
      draggingMR: false,
      draggingBL: false,
      draggingBM: false,
      draggingBR: false,
      offsetTop: 0,
      offsetLeft: 0,
    };

    //   state.initialTop =
    //     initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? gestureState.dy : 0);
    //   state.initialLeft =
    //     initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? gestureState.dx : 0);
    //   state.initialWidth =
    //     initialWidth +
    //     (draggingTL || draggingML || draggingBL
    //       ? -gestureState.dx
    //       : draggingTM || draggingMM || draggingBM
    //       ? 0
    //       : gestureState.dx);
    //   state.initialHeight =
    //     initialHeight +
    //     (draggingTL || draggingTM || draggingTR
    //       ? -gestureState.dy
    //       : draggingML || draggingMM || draggingMR
    //       ? 0
    //       : gestureState.dy);

    //   if (state.initialWidth > this.props.initialWidth) {
    //     state.initialWidth = this.props.initialWidth;
    //   }
    //   if (state.initialWidth < this.props.minWidth) {
    //     state.initialWidth = this.props.minWidth;
    //   }
    //   if (state.initialHeight > this.props.initialHeight) {
    //     state.initialHeight = this.props.initialHeight;
    //   }
    //   if (state.initialHeight < this.props.minHeight) {
    //     state.initialHeight = this.props.minHeight;
    //   }
    this.setState(state);
    this.props.onLayoutChanged(
      this.state.currentTop,
      this.state.currentLeft,
      this.state.currentWidth,
      this.state.currentHeight
    );
  };
}

export default ImageCropOverlay;
