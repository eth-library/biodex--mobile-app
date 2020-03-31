import {
  STORE_UPLOAD_AND_PREDICTIONS,
  STORE_LOCATION,
  STORE_PREDICTION_CONFIRMATION,
  CLEAR_IMAGES_STATE
} from '../types';

const initialState = {
  uploadedImage: '',
  confirmedImage: null,
  predictions: []
};

export const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_UPLOAD_AND_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload.predictions,
        uploadedImage: action.payload.uploaded_image
      };
    case STORE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case STORE_PREDICTION_CONFIRMATION:
      return {
        ...state,
        predictions: action.payload.predictions,
        confirmedImage: action.payload.confirmed_image
      };
    case CLEAR_IMAGES_STATE:
      return initialState;
    default:
      return state;
  }
};
