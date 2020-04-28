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
      this.unsubscribeNavigation = () => this.props.navigation.addListener('blur', () => {
        console.log('blurring away')
        ScreenOrientation.removeOrientationChangeListener(this.orientationListener);
      });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('did update', prevProps.navigation === this.props.navigation)
    }

    componentWillUnmount() {
      console.log('will unmount')
      ScreenOrientation.removeOrientationChangeListener(this.orientationListener);
    }

    screenOrientationHandler() {
      this.setState({
        portrait: Dimensions.get('window').width < Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log('next', nextProps, nextState, this.props.navigation === nextProps.navigation)
      return true
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
