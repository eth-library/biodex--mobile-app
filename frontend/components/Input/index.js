import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import inputReducer from './inputReducer';
import Theme from '../../theme';

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value,
    errorText: null,
    isValid: false,
    touched: false
  });

  const defaultErrorMessage = props.required ? 'This field is required' : 'Invalid input';

  const { onInputChange, name, submitted } = props;

  useEffect(() => {
    if (submitted) {
      onInputChange(name, inputState.value, inputState.isValid);
    }
  }, [submitted]);

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(name, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, name]);

  const textChangeHandler = text => {
    let isValid = true;
    let errorText = null;
    // check for required fields
    if (props.required && text.trim().length === 0) {
      isValid = false;
      errorText = 'This field is required';
    }
    // check for valid email format
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
      errorText = 'Please enter a valid email address';
    }
    // check for password difficulty - minimum eight characters
    const passwordRegex = /^.{8,}$/;
    if (props.passwordCheck && !passwordRegex.test(text)) {
      isValid = false;
      errorText = 'Password is too short. Min length is 8 characters.';
    }
    dispatch({ type: 'INPUT_CHANGE', value: text, errorText, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
  };

  const renderErrorMessage =
    (!inputState.isValid && inputState.touched) ||
    (!inputState.isValid && submitted) ||
    (inputState.isValid && inputState.touched && props.errorText);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {renderErrorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {props.errorText || inputState.errorText || defaultErrorMessage}
          </Text>
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
    borderRadius: Theme.borders.radius
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
