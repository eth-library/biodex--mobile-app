import * as ImageManipulator from 'expo-image-manipulator';
import moment from 'moment';
import * as Sentry from 'sentry-expo';

import {
  STORE_SELECTED_IMAGE,
  STORE_LOCATION,
  STORE_UPLOAD_AND_PREDICTIONS,
  STORE_PREDICTION_CONFIRMATION,
  STORE_IMAGE_TAKING_METHOD,
  CLEAR_IMAGES_STATE,
} from '../types';
import { rootEndpoint } from '../../constants/index';
import { networkSuccessAsyncAction, networkErrorAsyncAction } from './network';

export const storeSelectedImageAction = (imageUri) => {
  return {
    type: STORE_SELECTED_IMAGE,
    payload: imageUri,
  };
};

export const storeLocation = (location) => {
  return {
    type: STORE_LOCATION,
    payload: location,
  };
};

const storePredictionsAction = (data) => {
  return {
    type: STORE_UPLOAD_AND_PREDICTIONS,
    payload: data,
  };
};

const storePredictionsConfirmationAction = (data) => {
  return {
    type: STORE_PREDICTION_CONFIRMATION,
    payload: data,
  };
};

export const clearImagesState = () => {
  return {
    type: CLEAR_IMAGES_STATE,
  };
};

export const storeImageTakingMethod = (method) => {
  console.log('STORE', method)
  return {
    type: STORE_IMAGE_TAKING_METHOD,
    payload: method
  };
};

// in case the image has to be compressed to <256kb, use FileSystem from expo-file-system
export const getPredictionsAsyncAction = (imageUri) => async (dispatch, getState) => {
  const img = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: ImageManipulator.SaveFormat.JPEG }
  );

  const formData = new FormData();
  const uriParts = img.uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  formData.append('image', {
    uri: img.uri,
    type: `image/${fileType}`,
    name: `uploaded_user_image_${datetime}.${fileType}`,
  });

  const headers = new Headers({
    Authorization: `Bearer ${getState().auth.access}`,
  });
  const method = 'POST';
  const body = formData;
  const config = { headers, method, body };

  try {
    const response = await fetch(
      `https://europe-west1-ethec-auto-insect-recognition.cloudfunctions.net/lepidoptera_clfr_objdet`,
      config
    );
    if (response.ok) {
      const data = await response.json();
      return { ...response, data };
    } else {
      console.log(
        'ERROR IN getPredictionsAsyncAction',
        response.status,
        response.statusText
      );
      Sentry.captureMessage(`${response.status} - ${response.statusText}`);
      return response;
    }
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN getPredictionsAsyncAction - second: ', e.message);
    Sentry.captureException(e);
  }
};

export const newCaseAsyncAction = (data, imageUri) => async (dispatch, getState) => {
  const location = getState().images.location;

  const predictions = Object.values(data.predictions).map((el) => {
    return {
      index: el.index,
      family: el.family,
      family_prob: el.family_prob,
      subfamily: el.subfamily,
      subfamily_prob: el.subfamily_prob,
      species: el.species,
      species_prob: el.species_prob,
      image_url: el.example_image_0,
      image_id: el.example_image_0.split('').splice(-32).join(''),
    };
  });
  const formData = new FormData();
  const datetime = moment().format('DD-MM-YYYY_hh-mm-ss');
  if (location) {
    formData.append('longitude', location.coords.longitude);
    formData.append('latitude', location.coords.latitude);
  }
  formData.append('predictions', JSON.stringify(predictions));
  formData.append('prediction_exec_time', data.exec_time);
  formData.append('prediction_model', data.model);
  formData.append('prediction_status', data.status);
  formData.append('uploaded_image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: `uploaded_user_image_${datetime}.jpg`,
  });

  const headers = new Headers({
    Authorization: `Bearer ${getState().auth.access}`,
  });
  const method = 'POST';
  const body = formData;
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/cases/create/`, config);
    if (response.ok) {
      const res_data = await response.json();
      dispatch(storePredictionsAction(res_data));
    } else {
      dispatch(networkErrorAsyncAction());
      Sentry.captureMessage(`${response.status} - ${response.statusText}`);
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN newCaseAsyncAction: ', JSON.stringify(e), e.message);
    Sentry.captureException(e);
  }
};

export const confirmPredictionAsyncAction = (prediction) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append('confirmed_image', {
    uri: prediction.image_url,
    type: 'image/jpeg',
    name: prediction.image_url.split('').splice(-32).join(''),
  });
  formData.append('prediction_id', prediction.id);

  const headers = new Headers({
    Authorization: `Bearer ${getState().auth.access}`,
  });
  const method = 'PATCH';
  const body = formData;
  const config = { headers, method, body };

  try {
    const response = await fetch(`${rootEndpoint}/cases/confirm/${prediction.case}/`, config);
    if (response.ok) {
      const data = await response.json();
      dispatch(storePredictionsConfirmationAction(data));
      dispatch(networkSuccessAsyncAction('Your confirmation has been registered!'));
    } else {
      Sentry.captureMessage(`${response.status} - ${response.statusText}`);
    }
    return response;
  } catch (e) {
    dispatch(networkErrorAsyncAction());
    console.log('ERROR IN confirmPredictionAsyncAction: ', JSON.stringify(e), e.message);
    Sentry.captureException(e);
  }
};
