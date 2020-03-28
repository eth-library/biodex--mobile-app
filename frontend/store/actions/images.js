import * as ImageManipulator from 'expo-image-manipulator';
import moment from 'moment';

import { STORE_UPLOAD_AND_PREDICTIONS, STORE_LOCATION } from '../types';
import { rootEndpoint } from '../../constants/index';

export const storeLocation = location => {
  return {
    type: STORE_LOCATION,
    payload: location
  };
};

const storePredictionsAction = (uploadedImage, predictions) => {
  return {
    type: STORE_UPLOAD_AND_PREDICTIONS,
    payload: { uploadedImage, predictions }
  };
};

// in case the image has to be compressed to <256kb, use FileSystem from expo-file-system to compress
export const uploadImageAsyncAction = imageUri => async (dispatch, getState) => {
  const img = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.PNG }
  );

  const formData = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  formData.append('image', {
    uri: img.uri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`
  });

  const headers = new Headers({
    'Content-type': 'multipart/form-data',
    Authorization: `Bearer ${getState().auth.access}`
  });
  const method = 'POST';
  const body = formData;
  const config = { headers, method, body };

  try {
    const response = await fetch(
      `https://europe-west1-ethec-auto-insect-recognition.cloudfunctions.net/lepidoptera_clfr_objdet`,
      config
    );
    console.log('what', JSON.stringify(response));
    const data = await response.json();
    console.log('dataaa', data);
    console.log('stateee', getState());
    if (response.status === 200) {
      const predictions = Object.values(data.predictions).map(el => {
        return {
          index: el.index,
          family: el.family,
          family_prob: el.family_prob,
          subfamily: el.subfamily,
          subfamily_prob: el.subfamily_prob,
          species: el.species,
          species_prob: el.species_prob,
          image: el.example_image_0,
          image_id: el.example_image_0
            .split('')
            .splice(-32)
            .join('')
        };
      });
      // create new case in database
      const location = getState().images.location;
      const formData = new FormData();
      const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
      formData.append('uploaded_image', {
        uri: img.uri,
        type: 'image/jpeg',
        name: `uploaded_user_image_${datetime}.jpg`
      });
      formData.append('longitude', location.coords.longitude);
      formData.append('latitude', location.coords.latitude);
      formData.append('predictions', predictions);
      formData.append('prediction_exec_time', data.exec_time);
      formData.append('prediction_model', data.model);
      formData.append('prediction_status', data.status);

      const headers = new Headers({
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${getState().auth.access}`
      });
      const method = 'POST';
      const body = formData;
      const config = { headers, method, body };
      console.log(`${rootEndpoint}/backend/api/cases/create/`, 'config', config);
      const db_response = await fetch(`${rootEndpoint}/backend/api/cases/create/`, config);
      console.log('db_res', db_response.status, JSON.stringify(db_response));

      // store results in Redux
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

export const confirmPredictionAsyncAction = selectedImg => async (dispatch, getState) => {
  console.log('momou', selectedImg);
  const state = getState();
  console.log('state', getState());
  const uploadedImage = state.images.uploadedImage;
  const location = state.images.location;

  const data = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  data.append('image', {
    uri: img.uri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`
  });

  // const headers = new Headers({
  //   'Content-type': 'multipart/form-data',
  //   Authorization:
  //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1Mjk2ODEyLCJqdGkiOiI3NjlmNGEzOTM4OWI0MmQ0ODQyNDYyYTM0MTVhNjIyMCIsInVzZXJfaWQiOjF9.rdaMEBdoP9jSphnfUmNtumxmNYzB-UgQfX-w_M7IhyY'
  // });
  // const method = 'POST';
  // const body = data;
  // const config = { headers, method, body };

  // try {
  //   const response = await fetch(
  //     `https://europe-west1-ethec-auto-insect-recognition.cloudfunctions.net/lepidoptera_clfr_objdet`,
  //     config
  //   );
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     const predictions = Object.values(data.predictions);
  //     dispatch(storePredictionsAction(img.uri, predictions));
  //   }
  //   if (response.status >= 400) {
  //     console.log('ERROR TO HANDLE IN uploadImageAsyncAction');
  //   }
  //   return response;
  // } catch (e) {
  //   console.log('ERROR TO HANDLE IN uploadImageAsyncAction: ', e.message);
  // }
};
