export default (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        errorText: action.errorText
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};
