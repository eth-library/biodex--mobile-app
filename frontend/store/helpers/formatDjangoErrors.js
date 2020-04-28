const formatDjangoErrors = errors => {
  const cleanedErrors = {};
  for (let key in errors) {
    if (key === 'detail') {
      cleanedErrors['general'] = errors[key];
    } else if (key === 'non_field_errors') {
      cleanedErrors['general'] = errors[key].length > 1 ? errors[key].join(' - ') : errors[key][0];
    } else if (Array.isArray(errors[key])) {
      cleanedErrors[key] = errors[key].length > 1 ? errors[key].join(' - ') : errors[key][0];
    }
  };
  return cleanedErrors
};

export default formatDjangoErrors;
