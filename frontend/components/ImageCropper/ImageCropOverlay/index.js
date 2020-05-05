import React from 'react';
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
    initialLeft: this.props.initialLeft,
    currentTop: this.props.overlayPos.top,
    currentLeft: this.props.overlayPos.left,
    currentWidth: this.props.overlaySize.width,
    initialHeight: this.props.initialHeight,
    currentHeight: this.props.overlaySize.height,
    offsetTop: 0,
    offsetLeft: 0,
    previousX: null,
    previousY: null,
    panResponder: {}
  };

  componentDidMount(prevProps, prevState) {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
    this.setState({ panResponder });
  };

  render() {
    const {
      currentWidth,
      currentHeight,
      currentTop,
      currentLeft,
    } = this.state;

    // this.props.initialLeft = left border of image
    // this.props.initialTop = top border of image
    return (
      <View
        {...this.state.panResponder.panHandlers}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
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
    const xPos = parseInt((x - this.props.overlayPos.left) / (currentWidth / 3));
    const yPos = parseInt((y - this.props.overlayPos.top - 64) / (currentHeight / 3));

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
    const gestureActivatingZones = ['tl', 'tr', 'mm', 'bl', 'br'];
    const selected = this.getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
    return gestureActivatingZones.includes(selected);
  };

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = (event) => {
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
      initialLeft,
      currentTop,
      currentLeft,
      currentWidth,
      currentHeight,
      previousX,
      previousY
    } = this.state;

    const state = {};

    const y = gestureState.dy;
    const x = gestureState.dx;
    // Only biggest move, as the cropping should always be a square
    let biggestMove = Math.abs(y) > Math.abs(x) ? y : x;
    const biggestMoveX = x >= 0 ? Math.abs(biggestMove) : - Math.abs(biggestMove);
    const biggestMoveY = y >= 0 ? Math.abs(biggestMove) : - Math.abs(biggestMove);

    let gestureTopLeftToBottomRight;
    let gestureTopRightToBottomLeft;
    let gestureBottomLeftToTopRight;
    let gestureBottomRightToTopLeft;
    const diagonalMovement = y !== 0 && x !== 0
    if (previousX && previousY && diagonalMovement) {
      gestureTopLeftToBottomRight = diagonalMovement && y > previousY && x > previousX;
      gestureTopRightToBottomLeft = diagonalMovement && y > previousY && x < previousX;
      gestureBottomLeftToTopRight = diagonalMovement && y < previousY && x > previousX;
      gestureBottomRightToTopLeft = diagonalMovement && y < previousY && x < previousX;
      state.previousX = x;
      state.previousY = y;
    } else if (diagonalMovement) {
      gestureTopLeftToBottomRight = diagonalMovement && y > 0 && x > 0;
      gestureTopRightToBottomLeft = diagonalMovement && y > 0 && x < 0;
      gestureBottomLeftToTopRight = diagonalMovement && y < 0 && x > 0;
      gestureBottomRightToTopLeft = diagonalMovement && y < 0 && x < 0;
      state.previousX = x;
      state.previousY = y;
    }

    let originalHeight = Dimensions.get('window').height - 64;
    if (isIphoneX()) {
      originalHeight = Dimensions.get('window').height - 122;
    }
    const maxHeight = originalHeight - initialTop
    let maxWidth = initialLeft + this.props.maxCropWidth;

    // # If movement is from the middle square
    if (draggingMM) {
      // Check that next position is between top and bottom of the image
      if (this.props.overlayPos.top + y >= initialTop && this.props.overlayPos.top + this.props.overlaySize.height + y <= maxHeight) {
        state.currentTop = this.props.overlayPos.top + y;
      } else {
        // If overlay would be out of the top of the image, set the overlay top to top of the image
        if (this.props.overlayPos.top + y <= initialTop) {
          state.currentTop = initialTop;
          // If overlay would be out of the bottom of the image, set the overlay bottom to bottom of the image
        } else if (this.props.overlayPos.top + this.props.overlaySize.height + y >= maxHeight) {
          state.currentTop = originalHeight - this.props.overlaySize.height - initialTop;
        }
      }
      // Check that next position is between left and right of the image
      if (this.props.overlayPos.left + x >= initialLeft && this.props.overlayPos.left + currentWidth + x <= maxWidth) {
          state.currentLeft = this.props.overlayPos.left + x
      } else {
        // If overlay would be out of the left of the image, set the overlay left to left of the image
        if (this.props.overlayPos.left + x <= initialLeft) {
          state.currentLeft = initialLeft
          // If overlay would be out of the right of the image, set the overlay left to the right side of the image minus the current cropoverlay width
        } else if (this.props.overlayPos.left + currentWidth + x >= maxWidth) {
          state.currentLeft = maxWidth - currentWidth
        }
      }
    }

    // # If movement is from the bottom right square
    if (draggingBR) {
      const willOverlapRight = this.props.overlayPos.left + this.props.overlaySize.width + biggestMove > maxWidth;
      const willOverlapBottom = this.props.overlayPos.top + this.props.overlaySize.height + biggestMove > maxHeight;
      const respectsMinSize = this.props.overlaySize.width + biggestMove >= this.props.minSize;

      if (gestureTopLeftToBottomRight)
        // If next position won't be out of the right and bottom of the image
        if (!willOverlapRight && !willOverlapBottom) {
          state.currentWidth = this.props.overlaySize.width + biggestMove > this.props.minSize ? this.props.overlaySize.width + biggestMove : this.props.minSize;
          state.currentHeight = this.props.overlaySize.height + biggestMove > this.props.minSize ? this.props.overlaySize.height + biggestMove : this.props.minSize;
          // If next position would be out of the right side and the bottom of the image
        } else if (willOverlapRight && willOverlapBottom) {
          const maxPossibleWidth = maxWidth - this.props.overlayPos.left;
          const maxPossibleHeight = maxHeight - this.props.overlayPos.top;
          const newSize = maxPossibleHeight <= maxPossibleWidth ? maxPossibleHeight : maxPossibleWidth;
          state.currentWidth = newSize > this.props.minSize ? newSize : this.props.minSize;
          state.currentHeight = newSize  > this.props.minSize ? newSize : this.props.minSize;
          // If next position would be out of the right side of the image
        } else if (willOverlapRight && !willOverlapBottom) {
          const maxPossibleWidth = maxWidth - this.props.overlayPos.left;
          state.currentWidth = maxPossibleWidth > this.props.minSize ? maxPossibleWidth : this.props.minSize;
          state.currentHeight = maxPossibleWidth > this.props.minSize ? maxPossibleWidth : this.props.minSize;
          // If next position would be out of the right side of the image
        } else if (!willOverlapRight && willOverlapBottom) {
          const maxPossibleHeight = maxHeight - this.props.overlayPos.top;
          state.currentWidth = maxPossibleHeight > this.props.minSize ? maxPossibleHeight : this.props.minSize;
          state.currentHeight = maxPossibleHeight > this.props.minSize ? maxPossibleHeight : this.props.minSize;
        }

      // If movement is from top left to bottom right and the next position won't be out of the screen
      if (gestureBottomRightToTopLeft) {
        if (!willOverlapRight && !willOverlapBottom && respectsMinSize) {
          state.currentWidth = this.props.overlaySize.width + biggestMove;
          state.currentHeight = this.props.overlaySize.height + biggestMove;
        }
      }
    }

    // # If movement is from the top left square
    if (draggingTL) {
      const willOverlapTop = this.props.overlayPos.top + biggestMove < initialTop;
      const willOverlapLeft = this.props.overlayPos.left + biggestMove < initialLeft;
      const maxUpMovement = this.props.overlayPos.top - initialTop;
      const maxLeftMovement = this.props.overlayPos.left - initialLeft;
      const respectsMinSize = this.props.overlaySize.width - biggestMove >= this.props.minSize;

      if (gestureTopLeftToBottomRight) {
        // move left and top as long as they respect minsize
        if (!willOverlapTop && !willOverlapLeft && respectsMinSize) {
          state.currentTop = this.props.overlayPos.top + biggestMove
          state.currentLeft = this.props.overlayPos.left + biggestMove
          state.currentWidth = this.props.overlaySize.width - biggestMove;
          state.currentHeight = this.props.overlaySize.height - biggestMove;
        }
      }

      if (gestureBottomRightToTopLeft) {
        // If next position won't be out of the top and left of the image
        if (!willOverlapTop && !willOverlapLeft && respectsMinSize) {
          state.currentTop = this.props.overlayPos.top + biggestMove
          state.currentLeft = this.props.overlayPos.left + biggestMove
          state.currentWidth = this.props.overlaySize.width - biggestMove;
          state.currentHeight = this.props.overlaySize.height - biggestMove;
        } else if (willOverlapTop && willOverlapLeft) {
          // set top or left to 0, respecting square and minsize
          const smallestMove =  maxUpMovement < maxLeftMovement ? maxUpMovement : maxLeftMovement;
          state.currentTop = this.props.overlayPos.top - smallestMove
          state.currentLeft = this.props.overlayPos.left - smallestMove
          state.currentWidth = this.props.overlaySize.width + smallestMove;
          state.currentHeight = this.props.overlaySize.height + smallestMove;
        } else if (willOverlapTop && !willOverlapLeft) {
          // set top to initialTop, respecting square and minsize
          state.currentTop = this.props.overlayPos.top - maxUpMovement;
          state.currentLeft = this.props.overlayPos.left - maxUpMovement;
          state.currentWidth = this.props.overlaySize.width + maxUpMovement;
          state.currentHeight = this.props.overlaySize.height + maxUpMovement;
        } else if (!willOverlapTop && willOverlapLeft) {
          // set left to 0, respecting square and minsize
          state.currentTop = this.props.overlayPos.top - maxLeftMovement;
          state.currentLeft = this.props.overlayPos.left - maxLeftMovement;
          state.currentWidth = this.props.overlaySize.width + maxLeftMovement;
          state.currentHeight = this.props.overlaySize.height + maxLeftMovement;
        }
      }
    }

    // # If movement is from bottom left square
    if (draggingBL) {
      const respectsSquare = biggestMoveX - biggestMoveY !== 0;
      const respectsMinSize = this.props.overlaySize.width - biggestMoveX >= this.props.minSize && this.props.overlaySize.height + biggestMoveY >= this.props.minSize;
      if (gestureTopRightToBottomLeft && respectsSquare) {
        const willOverlapBottom = this.props.overlayPos.top + this.props.overlaySize.height + biggestMoveY > maxHeight;
        const willOverlapLeft = this.props.overlayPos.left + biggestMoveX < initialLeft;
        const maxPossibleLeft = this.props.overlayPos.left - initialLeft;
        const maxPossibleDown = maxHeight - this.props.overlayPos.top - this.props.overlaySize.height;
        if (!willOverlapBottom && !willOverlapLeft && respectsMinSize) {
          state.currentLeft = this.props.overlayPos.left + biggestMoveX;
          state.currentWidth = this.props.overlaySize.width - biggestMoveX;
          state.currentHeight = this.props.overlaySize.height + biggestMoveY;
        } else if (willOverlapBottom && willOverlapLeft) {
          // possible movement to bottom and to left, smalles should be applied
          const biggestPossibleMove = maxPossibleLeft < maxPossibleDown ? maxPossibleLeft : maxPossibleDown;
          state.currentLeft = this.props.overlayPos.left - biggestPossibleMove;
          state.currentWidth = this.props.overlaySize.width + biggestPossibleMove;
          state.currentHeight = this.props.overlaySize.height + biggestPossibleMove;
        } else if (willOverlapBottom && !willOverlapLeft) {
          // size should be maxPossibleHeight
          state.currentLeft = this.props.overlayPos.left - maxPossibleDown;
          state.currentWidth = this.props.overlaySize.width + maxPossibleDown;
          state.currentHeight = this.props.overlaySize.height + maxPossibleDown;
        } else if (!willOverlapBottom && willOverlapLeft) {
          // size should be maxPossibleWidth
          state.currentLeft = this.props.overlayPos.left - maxPossibleLeft;
          state.currentWidth = this.props.overlaySize.width + maxPossibleLeft;
          state.currentHeight = this.props.overlaySize.height + maxPossibleLeft;
        }
      }
      
      if (gestureBottomLeftToTopRight && respectsSquare && respectsMinSize) {
        const willOverlapBottom = currentTop + currentHeight + Math.abs(biggestMove) > maxHeight;
        const willOverlapLeft = currentLeft >= initialLeft && currentLeft - biggestMoveY < initialLeft;
        const respectsMinSize = this.props.overlaySize.width - biggestMove >= this.props.minSize;
        if (!willOverlapBottom && !willOverlapLeft && respectsMinSize) {
          state.currentLeft = this.props.overlayPos.left + biggestMoveX;
          state.currentWidth = this.props.overlaySize.width - biggestMoveX;
          state.currentHeight = this.props.overlaySize.height + biggestMoveY;
        }
      }
    }

    // # If movement is from top right square
    if (draggingTR) {
      const willOverlapTop = this.props.overlayPos.top + biggestMoveY <= initialTop;
      const willOverlapRight = this.props.overlayPos.left + this.props.overlaySize.width + biggestMoveX >= maxWidth;
      const respectsMinSize = this.props.overlaySize.width + biggestMoveX >= this.props.minSize && this.props.overlaySize.height - biggestMoveY >= this.props.minSize;
      const respectsSquare = biggestMoveX - biggestMoveY !== 0;
      const maxPossibleUp = this.props.overlayPos.top - initialTop;
      const maxPossibleRight = maxWidth - this.props.overlayPos.left - this.props.overlaySize.width; 
      if (gestureBottomLeftToTopRight && respectsSquare) {
        // If next position won't be out of the top and right of the image
        if (!willOverlapTop && !willOverlapRight && respectsMinSize) {
          state.currentTop = this.props.overlayPos.top + biggestMoveY;
          state.currentWidth = this.props.overlaySize.width + biggestMoveX;
          state.currentHeight = this.props.overlaySize.height - biggestMoveY;
          // If next position would be out of the top and the right side of the image
        } else if (willOverlapTop && willOverlapRight) {
          const biggestPossibleMove = maxPossibleUp < maxPossibleRight ? maxPossibleUp : maxPossibleRight;
          state.currentTop = this.props.overlayPos.top - biggestPossibleMove;
          state.currentWidth = this.props.overlaySize.width + biggestPossibleMove;
          state.currentHeight = this.props.overlaySize.height + biggestPossibleMove;
          // If next position would be out of the right side of the image
        } else if (willOverlapTop && !willOverlapRight) {
          state.currentTop = this.props.overlayPos.top - maxPossibleUp;
          state.currentWidth = this.props.overlaySize.width + maxPossibleUp;
          state.currentHeight = this.props.overlaySize.height + maxPossibleUp;
          // If next position would be out of the top of the image
        } else if (!willOverlapTop && willOverlapRight) {
          state.currentTop = this.props.overlayPos.top - maxPossibleRight;
          state.currentWidth = this.props.overlaySize.width + maxPossibleRight;
          state.currentHeight = this.props.overlaySize.height + maxPossibleRight;
        }
      }

      if (gestureTopRightToBottomLeft && respectsSquare) {
        if (!willOverlapTop && !willOverlapRight && respectsMinSize) {
          state.currentTop = this.props.overlayPos.top + biggestMoveY;
          state.currentWidth = this.props.overlaySize.width + biggestMoveX;
          state.currentHeight = this.props.overlaySize.height - biggestMoveY;
        }
      }
    }

    this.setState(state);
  };

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
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
      previousX: null,
      previousY: null
    };

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
