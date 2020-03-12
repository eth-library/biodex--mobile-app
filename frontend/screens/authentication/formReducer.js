const formReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FORM_INPUT_UPDATE': {
      const updatedValues = {
        ...state.values,
        [action.name]: action.value
      };
      const updatedValidities = {
        ...state.values,
        [action.name]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        ...state,
        isValid: updatedFormIsValid,
        validities: updatedValidities,
        values: updatedValues
      };
    }
    case 'FORM_INPUT_RESET': {
      return action.payload; // initial state should be passed
    }
    case 'SUBMITTED': {
      return {
        ...state,
        submitted: true
      };
    }
    default:
      return state;
  }
};

export default formReducer;
