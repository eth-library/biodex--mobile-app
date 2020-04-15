import React, { Component } from 'react';
import { View, PanResponder, Dimensions } from 'react-native';

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
    initialWidth: this.props.initialWidth,
    initialHeight: this.props.initialHeight,

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
    console.log('check')
  };

  render() {
    console.log('props', this.props.initialWidth, this.props.currentSize, this.props.currentPos)
    const {
      draggingTL,
      draggingTM,
      draggingTR,
      draggingML,
      draggingMM,
      draggingMR,
      draggingBL,
      draggingBM,
      draggingBR,
      initialTop,
      initialLeft,
      initialHeight,
      initialWidth,
      offsetTop,
      offsetLeft,
    } = this.state;
    const style = {};

    console.log('offset', offsetTop, offsetLeft)

    style.top = initialTop + (draggingTL || draggingTR || draggingMM ? offsetTop : 0);

    style.left =
      initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? offsetLeft : 0);
    style.width =
      initialWidth +
      (draggingTL || draggingML || draggingBL
        ? -offsetLeft
        : draggingTM || draggingMM || draggingBM
        ? 0
        : offsetLeft);
    style.height =
      initialHeight +
      (draggingTL || draggingTM || draggingTR
        ? -offsetTop
        : draggingML || draggingMM || draggingMR
        ? 0
        : offsetTop);

    if (style.width > this.props.initialWidth) {
      style.width = this.props.initialWidth;
    }
    if (style.width < this.props.minWidth) {
      style.width = this.props.minWidth;
    }
    if (style.height > this.props.initialHeight) {
      style.height = this.props.initialHeight;
    }
    if (style.height < this.props.minHeight) {
      style.height = this.props.minHeight;
    }
    const { borderColor } = this.props;
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
          },
          style,
        ]}
      >
        <TopRow draggintTL={this.state.draggingTL} draggintTM={this.state.draggingTM} draggintTR={this.state.draggingTR} />
        <MidRow draggintML={this.state.draggingML} draggintMM={this.state.draggingMM} draggintMR={this.state.draggingMR} />
        <BottomRow draggintBL={this.state.draggingBL} draggintBM={this.state.draggingBM} draggintBR={this.state.draggingBR} />
      </View>
    );
  }

  getTappedItem(x, y) {
    const { initialLeft, initialTop, initialWidth, initialHeight } = this.state;
    const xPos = parseInt((x - initialLeft) / (initialWidth / 3));
    const yPos = parseInt((y - initialTop - 64) / (initialHeight / 3));

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
  handleStartShouldSetPanResponder = (event) => true;

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = (event) => {
    // console.log(event.nativeEvent.locationX + ', ' + event.nativeEvent.locationY)

    const selectedItem = this.getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
    if (selectedItem == 'tl') {
      this.setState({ draggingTL: true });
    } else if (selectedItem == 'tm') {
      this.setState({ draggingTM: true });
    } else if (selectedItem == 'tr') {
      this.setState({ draggingTR: true });
    } else if (selectedItem == 'ml') {
      this.setState({ draggingML: true });
    } else if (selectedItem == 'mm') {
      this.setState({ draggingMM: true });
    } else if (selectedItem == 'mr') {
      this.setState({ draggingMR: true });
    } else if (selectedItem == 'bl') {
      this.setState({ draggingBL: true });
    } else if (selectedItem == 'bm') {
      this.setState({ draggingBM: true });
    } else if (selectedItem == 'br') {
      this.setState({ draggingBR: true });
    }
  };

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {
    // Keep track of how far we've moved in total (dx and dy)
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    });
  };

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    console.log('END')
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

  //   const state = {
  //     draggingTL: false,
  //     draggingTM: false,
  //     draggingTR: false,
  //     draggingML: false,
  //     draggingMM: false,
  //     draggingMR: false,
  //     draggingBL: false,
  //     draggingBM: false,
  //     draggingBR: false,
  //     offsetTop: 0,
  //     offsetLeft: 0,
  //   };

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

  //   this.setState(state);
  //   this.props.onLayoutChanged(
  //     state.initialTop,
  //     state.initialLeft,
  //     state.initialWidth,
  //     state.initialHeight
  //   );
  };
}

export default ImageCropOverlay;
