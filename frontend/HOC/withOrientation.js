import React from 'react';
import { Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo';

function withOrientation(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        portrait: Dimensions.get('window').width < Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      };
      this.orientationListener = null;
      this.unsubscribeNavigation = null;
    }

    onChangeHandler = () => {
      this.setState({
        portrait: Dimensions.get('window').width < Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    componentDidMount() {
      this.orientationListener = ScreenOrientation.addOrientationChangeListener(
        this.onChangeHandler
      );
      this.unsubscribeNavigation = () =>
        this.props.navigation.addListener('blur', () => {
          ScreenOrientation.removeOrientationChangeListener(this.orientationListener);
        });
    }

    componentWillUnmount() {
      ScreenOrientation.removeOrientationChangeListener(this.orientationListener);
    }

    screenOrientationHandler() {
      this.setState({
        portrait: Dimensions.get('window').width < Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    }

    render() {
      return (
        <WrappedComponent
          portrait={this.state.portrait}
          width={this.state.width}
          height={this.state.height}
          {...this.props}
        />
      );
    }
  };
}

export default withOrientation;
