import React, { useState, useMemo, useEffect } from 'react';
import { View, PanResponder, Dimensions } from 'react-native';

import TopRow from './TopRow';
import MidRow from './MidRow';
import BottomRow from './BottomRow';

const ImageCropOverlay = (props) => {
  const [draggingTL, setDraggingTL] = useState(false);
  const [draggingTM, setDraggingTM] = useState(false);
  const [draggingTR, setDraggingTR] = useState(false);
  const [draggingML, setDraggingML] = useState(false);
  const [draggingMM, setDraggingMM] = useState(false);
  const [draggingMR, setDraggingMR] = useState(false);
  const [draggingBL, setDraggingBL] = useState(false);
  const [draggingBM, setDraggingBM] = useState(false);
  const [draggingBR, setDraggingBR] = useState(false);
  const [initialTop, setInitialTop] = useState(props.initialTop);
  const [initialLeft, setInitialLeft] = useState(props.initialLeft);
  const [initialWidth, setInitialWidth] = useState(props.initialWidth);
  const [initialHeight, setInitialHeight] = useState(props.initialHeight);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [panResponder, setPanResponder] = useState({});

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
        onPanResponderGrant: handlePanResponderGrant,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderEnd,
        onPanResponderTerminate: handlePanResponderEnd,
      })
    );
  }, []);

  const getTappedItem = (x, y) => {
    console.log('get tapped');
    const xPos = parseInt((x - initialLeft) / (initialWidth / 3));
    const yPos = parseInt((y - initialTop - 50) / (initialHeight / 3));

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
    return null;
  };

  // Should we become active when the user presses down on the square?
  const handleStartShouldSetPanResponder = (event) => {
    const gestureActivatingZones = ['tl', 'tr', 'mm', 'bl', 'br'];
    const selected = getTappedItem(event.nativeEvent.pageX, event.nativeEvent.pageY);
    console.log('selected start', selected);
    setSelectedItem(selected);
    return gestureActivatingZones.includes(selected);
  };

  // The gesture has started. Show visual feedback so the user knows what is happening
  const handlePanResponderGrant = () => {
    console.log('selected', selectedItem)
    if (selectedItem == 'tl') {
      setDraggingTL(true);
    } else if (selectedItem == 'tr') {
      setDraggingTR(true);
    } else if (selectedItem == 'mm') {
      setDraggingMM(true);
    } else if (selectedItem == 'bl') {
      setDraggingBL(true);
    } else if (selectedItem == 'br') {
      setDraggingBR(true);
    }
  };

  // Every time the touch/mouse moves - if moving rapidly, it will jump some values
  const handlePanResponderMove = (event, gestureState) => {
    console.log('move');
    const y = gestureState.dy;
    const x = gestureState.dx;
    // Only biggest move, as the cropping should always be a square
    const biggestMove = y > x ? y : x;
    const topHasSpace = initialTop - biggestMove >= 0;
    const rightHasSpace =
      initialLeft + initialWidth + biggestMove <= Dimensions.get('window').width;
    const bottomHasSpace =
      initialTop + initialHeight + biggestMove <= Dimensions.get('window').height;
    const leftHasSpace = initialLeft - biggestMove >= 0;
    // Moving the whole square around
    if (selectedItem == 'mm') {
      setOffsetTop(gestureState.dy);
      setOffsetLeft(gestureState.dx);
      // If movement is from bottom left to top right, selected item is top right or bottom left and it will not go out of the screen
    } else if (
      y < 0 &&
      x > 0 &&
      ['tr', 'bl'].includes(selectedItem) &&
      topHasSpace &&
      rightHasSpace
    ) {
      setOffsetTop(-biggestMove);
      setOffsetLeft(biggestMove);
      // If movement is from top right to bottom left, selected item is top right or bottom left and it will not go out of the screen
    } else if (
      y > 0 &&
      x < 0 &&
      ['tr', 'bl'].includes(selectedItem) &&
      leftHasSpace &&
      bottomHasSpace
    ) {
      setOffsetTop(biggestMove);
      setOffsetLeft(-biggestMove);
      // Movement from bottom right to top left
    } else if (
      y < 0 &&
      x < 0 &&
      ['tl', 'br'].includes(selectedItem) &&
      leftHasSpace &&
      topHasSpace
    ) {
      setOffsetTop(biggestMove);
      setOffsetLeft(biggestMove);
      // Movement top left to bottom right
    } else if (
      y > 0 &&
      x > 0 &&
      ['tl', 'br'].includes(selectedItem) &&
      rightHasSpace &&
      bottomHasSpace
    ) {
      setOffsetTop(-biggestMove);
      setOffsetLeft(-biggestMove);
    }
  };

  // When the touch/mouse is lifted
  const handlePanResponderEnd = (e, gestureState) => {
    console.log('end');
    setDraggingTL(false);
    setDraggingTR(false);
    setDraggingMM(false);
    setDraggingBL(false);
    setDraggingBR(false);
    setSelectedItem(null);
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
    //     selectedItem: null,
    //   };

    //   state.initialTop = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? gestureState.dy : 0);
    //   state.initialLeft = initialLeft + (draggingTL || draggingML || draggingBL || draggingMM ? gestureState.dx : 0);
    //   state.initialWidth = initialWidth + (draggingTL || draggingML || draggingBL ? -gestureState.dx : draggingTM || draggingMM || draggingBM ? 0 : gestureState.dx);
    //   state.initialHeight = initialHeight + (draggingTL || draggingTM || draggingTR ? -gestureState.dy : draggingML || draggingMM || draggingMR ? 0 : gestureState.dy);

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
    // };
  };
  const style = {};

  style.top = initialTop + (draggingTL || draggingTM || draggingTR || draggingMM ? offsetTop : 0);
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

  if (style.width > props.initialWidth) {
    style.width = props.initialWidth;
  }
  if (style.width < props.minWidth) {
    style.width = props.minWidth;
  }
  if (style.height > props.initialHeight) {
    style.height = props.initialHeight;
  }
  if (style.height < props.minHeight) {
    style.height = props.minHeight;
  }
  console.log('style');
  return (
    <View
      {...panResponder.panHandlers}
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
      <TopRow draggingTL={draggingTL} draggingTM={draggingTM} draggingTR={draggingTR} />
      <MidRow draggingML={draggingML} draggingMM={draggingMM} draggingTR={draggingMR} />
      <BottomRow draggingBL={draggingBL} draggingBM={draggingBM} draggingTR={draggingBR} />
    </View>
  );
};

export default ImageCropOverlay;
