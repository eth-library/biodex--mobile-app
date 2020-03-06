import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import inputReducer from './inputReducer';
import Theme from '../../../theme';

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    errorText: null,
    isValid: false,
    touched: false
  });

  const defaultErrorMessage = props.required ? 'This field is required' : 'Invalid input'

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    let errorText = 'what'
    if (props.required && text.trim().length === 0) {
      isValid = false;
      errorText = 'This field is required'
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
      errorText = 'Please enter a valid email address'
    }
    dispatch({ type: 'INPUT_CHANGE', value: text, errorText, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{inputState.errorText || defaultErrorMessage }</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Theme.space.vertical.xSmall
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    borderRadius: Theme.borders.radius,
  },
  errorContainer: {
    marginVertical: 1
  },
  errorText: {
    fontFamily: Theme.fonts.primary,
    color: 'red',
    fontSize: 8
  }
});

export default Input;
