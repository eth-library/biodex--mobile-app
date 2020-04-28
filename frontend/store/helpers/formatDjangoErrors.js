const formatDjangoErrors = errors => {
  console.log('ERRORS', errors)
  const cleanedErrors = {};
  for (let key in errors) {
    if (key === 'detail') {
      cleanedErrors['general'] = errors[key];
    } else if (key === 'non_field_errors') {
      cleanedErrors['general'] = errors[key].length > 1 ? errors[key].join(' - ') : errors[key][0];
    } else if (Array.isArray(errors[key])) {
      console.log('else', errors[key], errors[key].length)
      cleanedErrors[key] = errors[key].length > 1 ? errors[key].join(' - ') : errors[key][0];
    }
  };
  return cleanedErrors
};

export default formatDjangoErrors;
