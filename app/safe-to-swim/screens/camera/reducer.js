import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export default function reducer(state = initialState.camera, action) {
    switch (action.type) {

        case types.FETCH_PHOTOS_SUCCESS :
            return {
                ...state.camera,
                photos: Object.assign({}, action.photos)
            };
        case types.FETCH_PHOTOS_FAIL :
            return {
                ...state.camera,
                photos: {}
            };
        case types.UPLOAD_IMAGE_SUCCESS :
            return {
                ...state.camera,
                error: null,
                isUploading: false,
                prediction: action.data
            };
        case types.UPLOAD_IMAGE_FAIL :
            return {
                ...state.camera,
                error: action.error,
                isUploading: false,
                prediction: null
            };
        case types.UPLOADING_IMAGE:
            return {
                ...state.camera,
                error: null,
                isUploading: true,
                prediction: null
            };
        case types.CLEAR_PREDICTION:
            return {
                ...state.camera,
                error: null,
                isUploading: false,
                prediction: null
            };
        default:
            return state;
    }
}