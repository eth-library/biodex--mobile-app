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

const storePredictionsAction = data => {
  return {
    type: STORE_UPLOAD_AND_PREDICTIONS,
    payload: data
  };
};

// in case the image has to be compressed to <256kb, use FileSystem from expo-file-system to do it
export const getPredictionsAsyncAction = imageUri => async (dispatch, getState) => {
  const img = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.PNG }
  );

  const formData = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  console.log('URI DS BACKEND', img, img.uri)
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
    if (response.status === 200) {
      const data = await response.json();
      return { status: response.status, data };
    }
    if (response.status >= 400) {
      console.log('ERROR TO HANDLE IN getPredictionsAsyncAction');
    }
  } catch (e) {
    console.log('ERROR TO HANDLE IN getPredictionsAsyncAction: ', e.message);
  }
};

export const newCaseAsyncAction = (data, imageUri) => async (dispatch, getState) => {
  const location = getState().images.location;

  console.log('URI FS BACKEND', imageUri)
  const predictions = Object.values(data.predictions).map(el => {
    return {
      index: el.index,
      family: el.family,
      family_prob: el.family_prob,
      subfamily: el.subfamily,
      subfamily_prob: el.subfamily_prob,
      species: el.species,
      species_prob: el.species_prob,
      image_url: el.example_image_0,
      image_id: el.example_image_0
        .split('')
        .splice(-32)
        .join('')
    };
  });
  const formData = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  formData.append('longitude', location.coords.longitude);
  formData.append('latitude', location.coords.latitude);
  formData.append('predictions', JSON.stringify(predictions));
  formData.append('prediction_exec_time', data.exec_time);
  formData.append('prediction_model', data.model);
  formData.append('prediction_status', data.status);
  formData.append('uploaded_image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`
  });

  const headers = new Headers({
    Authorization: `Bearer ${getState().auth.access}`
  });
  const method = 'POST';
  const body = formData;
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/cases/create/`, config);
    console.log('status', response.status)
    if (response.status === 201) {
      res_data = await response.json();
      dispatch(storePredictionsAction(res_data));
    }
    return response;
  } catch (e) {
    console.log('ERROR TO HANDLE IN newCaseAsyncAction: ', JSON.stringify(e), e.message);
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
};
