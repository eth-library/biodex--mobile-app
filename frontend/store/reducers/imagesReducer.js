import { STORE_UPLOAD_AND_PREDICTIONS, STORE_LOCATION } from '../types';

const initialState = {
  uploadedImage: '',
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
    default:
      return state;
  }
};
