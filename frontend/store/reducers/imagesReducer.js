import {
  STORE_SELECTED_IMAGE,
  STORE_UPLOAD_AND_PREDICTIONS,
  STORE_LOCATION,
  STORE_PREDICTION_CONFIRMATION,
  STORE_IMAGE_TAKING_METHOD,
  CLEAR_IMAGES_STATE,
} from '../types';

const initialState = {
  selectedImage: null,
  uploadedImage: null,
  confirmedImage: null,
  predictions: [],
  location: null,
  picMethod: null,
  devInfo: {
    execTime: '',
    model: '',
    status: '',
  },
};

export const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: action.payload,
      };
    case STORE_UPLOAD_AND_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload.predictions,
        uploadedImage: action.payload.uploaded_image,
        devInfo: {
          execTime: action.payload.prediction_exec_time,
          model: action.payload.prediction_model,
          status: action.payload.prediction_status,
        },
      };
    case STORE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case STORE_PREDICTION_CONFIRMATION:
      return {
        ...state,
        predictions: action.payload.predictions,
        confirmedImage: action.payload.confirmed_image,
      };
    case STORE_IMAGE_TAKING_METHOD:
      return {
        ...state,
        picMethod: action.payload
      };
    case CLEAR_IMAGES_STATE:
      // picMethod is not reset on purpose. Else the 'new' picture functionality wouldn't work
      return {
        ...state,
        uploadedImage: null,
        confirmedImage: null,
        predictions: [],
        location: null,
        devInfo: {
          execTime: '',
          model: '',
          status: '',
        },
      };
    default:
      return state;
  }
};
