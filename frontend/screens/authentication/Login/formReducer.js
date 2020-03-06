const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedValues = {
      ...state.values,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.values,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      isValid: updatedFormIsValid,
      validities: updatedValidities,
      values: updatedValues
    };
  }
  return state;
};

export default formReducer;
