import React from 'react';
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
    selectedItem: null,
    panResponder: {}
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      panResponder: PanResponder.create({
        onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
        onPanResponderGrant: this.handlePanResponderGrant,
        onPanResponderMove: this.handlePanResponderMove,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd,
      })
    }) 
  }

  render() {
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

    style.top = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? offsetTop : 0);
    style.left = initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? offsetLeft : 0);
    style.width = initialWidth + (draggingTL || draggingML || draggingBL ? -offsetLeft : draggingTM || draggingMM || draggingBM ? 0 : offsetLeft);
    style.height = initialHeight + (draggingTL || draggingTM || draggingTR ? -offsetTop : draggingML || draggingMM || draggingMR ? 0 : offsetTop);

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

    return (
      <View
        {...this.state.panResponder.panHandlers}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          style,
        ]}
      >
          <TopRow draggingTL={this.state.draggingTL} draggingTM={this.state.draggingTM} draggingTR={this.state.draggingTR} />
          <MidRow draggingML={this.state.draggingML} draggingMM={this.state.draggingMM} draggingMR={this.state.draggingMR} />
          <BottomRow draggingBL={this.state.draggingBL} draggingBM={this.state.draggingBM} draggingBR={this.state.draggingBR} />
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
  handleStartShouldSetPanResponder = (event) => {
    const gestureActivatingZones = ['tl', 'tr', 'mm', 'bl', 'br'];
    const selectedItem = this.getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
    console.log('selected', selectedItem)
    this.state.selectedItem = selectedItem;
    return gestureActivatingZones.includes(selectedItem);
  };

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = () => {
    const selectedItem = this.state.selectedItem;
    if (selectedItem == 'tl') {
      console.log('will be true')
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
  handlePanResponderMove = (event, gestureState) => {
    console.log('move')
    const { selectedItem, initialTop, initialLeft, initialWidth, initialHeight } = this.state;
    const y = gestureState.dy;
    const x = gestureState.dx;
    // Only biggest move, as the cropping should always be a square
    const biggestMove = y > x ? y : x;
    const topHasSpace = initialTop - biggestMove >= 0;
    const rightHasSpace = initialLeft + initialWidth + biggestMove <= Dimensions.get('window').width;
    const bottomHasSpace = initialTop + initialHeight + biggestMove <= Dimensions.get('window').height;
    const leftHasSpace = initialLeft - biggestMove >= 0;
    // Moving the whole square around
    if (selectedItem == 'mm') {
      this.setState({
        offsetTop: gestureState.dy,
        offsetLeft: gestureState.dx,
      });
    // If movement is from bottom left to top right, selected item is top right or bottom left and it will not go out of the screen
    } else if ((y < 0 && x > 0) && (['tr', 'bl'].includes(selectedItem)) && topHasSpace && rightHasSpace) {
      this.setState({
        offsetTop: -biggestMove,
        offsetLeft: biggestMove,
      });
    // If movement is from top right to bottom left, selected item is top right or bottom left and it will not go out of the screen
    } else if ((y > 0 && x < 0) && (['tr', 'bl'].includes(selectedItem)) && leftHasSpace && bottomHasSpace) {
    this.setState({
        offsetTop: biggestMove,
        offsetLeft: -biggestMove,
    });
    // Movement from bottom right to top left
    } else if ((y < 0 && x < 0) && (['tl', 'br'].includes(selectedItem)) && leftHasSpace && topHasSpace) {
    this.setState({
        offsetTop: biggestMove,
        offsetLeft: biggestMove,
    });
    // Movement top left to bottom right
    } else if ((y > 0 && x > 0) && (['tl', 'br'].includes(selectedItem)) && rightHasSpace && bottomHasSpace) {
    this.setState({
        offsetTop: -biggestMove,
        offsetLeft: -biggestMove,
    });
    }
  };

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    const {
      initialTop,
      initialLeft,
      initialWidth,
      initialHeight,
      draggingTL,
      draggingTM,
      draggingTR,
      draggingML,
      draggingMM,
      draggingMR,
      draggingBL,
      draggingBM,
      draggingBR,
    } = this.state;

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
      selectedItem: null,
    };

    state.initialTop = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? gestureState.dy : 0);
    state.initialLeft = initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? gestureState.dx : 0);
    state.initialWidth = initialWidth + (draggingTL || draggingML || draggingBL ? -gestureState.dx : draggingTM || draggingMM || draggingBM ? 0 : gestureState.dx);
    state.initialHeight = initialHeight + (draggingTL || draggingTM || draggingTR ? -gestureState.dy : draggingML || draggingMM || draggingMR ? 0 : gestureState.dy);

    if (state.initialWidth > this.props.initialWidth) {
      state.initialWidth = this.props.initialWidth;
    }
    if (state.initialWidth < this.props.minWidth) {
      state.initialWidth = this.props.minWidth;
    }
    if (state.initialHeight > this.props.initialHeight) {
      state.initialHeight = this.props.initialHeight;
    }
    if (state.initialHeight < this.props.minHeight) {
      state.initialHeight = this.props.minHeight;
    }

    this.setState(state);
    this.props.onLayoutChanged(
      state.initialTop,
      state.initialLeft,
      state.initialWidth,
      state.initialHeight
    );
  };
}

export default ImageCropOverlay;
