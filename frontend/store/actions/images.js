import * as ImageManipulator from 'expo-image-manipulator';
import moment from 'moment';

import { STORE_UPLOAD_AND_PREDICTIONS, STORE_LOCATION } from '../types';

export const storeLocation = location => {
  return {
    type: STORE_LOCATION,
    payload: location
  }
};

const storePredictionsAction = (uploaded_image, predictions) => {
  return {
    type: STORE_UPLOAD_AND_PREDICTIONS,
    payload: { uploaded_image, predictions }
  };
};

// in case the image has to be compressed to <256kb, use FileSystem from expo-file-system to compress
export const uploadImageAsyncAction = imageUri => async (dispatch, getState) => {
  const img = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.PNG }
  );

  const data = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  data.append('image', {
    uri: img.uri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`
  });

  const headers = new Headers({
    'Content-type': 'multipart/form-data',
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1Mjk2ODEyLCJqdGkiOiI3NjlmNGEzOTM4OWI0MmQ0ODQyNDYyYTM0MTVhNjIyMCIsInVzZXJfaWQiOjF9.rdaMEBdoP9jSphnfUmNtumxmNYzB-UgQfX-w_M7IhyY'
  });
  const method = 'POST';
  const body = data;
  const config = { headers, method, body };

  try {
    const response = await fetch(
      `https://europe-west1-ethec-auto-insect-recognition.cloudfunctions.net/lepidoptera_clfr_objdet`,
      config
    );
    console.log('what', JSON.stringify(response))
    const data = await response.json();
    if (response.status === 200) {
      const predictions = Object.values(data.predictions);
      dispatch(storePredictionsAction(img.uri, predictions));
    }
    if (response.status >= 400) {
      console.log('ERROR TO HANDLE IN uploadImageAsyncAction');
    }
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN uploadImageAsyncAction: ', JSON.stringify(e), e.message);
  }
};

export const uploadResultAsyncAction = imageUri => async (dispatch, getState) => {
  const img = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.PNG }
  );

  const data = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  data.append('image', {
    uri: img.uri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`
  });

  const headers = new Headers({
    'Content-type': 'multipart/form-data',
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1Mjk2ODEyLCJqdGkiOiI3NjlmNGEzOTM4OWI0MmQ0ODQyNDYyYTM0MTVhNjIyMCIsInVzZXJfaWQiOjF9.rdaMEBdoP9jSphnfUmNtumxmNYzB-UgQfX-w_M7IhyY'
  });
  const method = 'POST';
  const body = data;
  const config = { headers, method, body };

  try {
    const response = await fetch(
      `https://europe-west1-ethec-auto-insect-recognition.cloudfunctions.net/lepidoptera_clfr_objdet`,
      config
    );
    const data = await response.json();
    if (response.status === 200) {
      const predictions = Object.values(data.predictions);
      dispatch(storePredictionsAction(img.uri, predictions));
    }
    if (response.status >= 400) {
      console.log('ERROR TO HANDLE IN uploadImageAsyncAction');
    }
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN uploadImageAsyncAction: ', e.message);
  }
};
