const formatDjangoErrors = errors => {
  const cleanedErrors = {};
  for (let key in errors) {
    if (key === 'detail') {
      cleanedErrors['general'] = errors[key];
    } else {
      cleanedErrors[key] = errors[key].length > 1 ? errors[key].join(' - ') : errors[key];
    }
  };
  return cleanedErrors
};

export default formatDjangoErrors;
