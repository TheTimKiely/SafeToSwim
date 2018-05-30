import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_USER_STATS_SUCCESS :
            return {
                ...state.home,
                ...action.data,
                error: null
            };
        case types.GET_USER_STATS_FAIL :
            return {
                ...state.home,
                error: 'Your stats are unavailable stats'
            };
        case types.SET_USER_STATS_SUCCESS :
            return {
                ...state.home,
                ...action.data,
                error: null
            };
        case types.SET_USER_STATS_FAIL :
            return {
                ...state.home,
                error: 'failed to set stats'
            };
        case types.UPLOAD_IMAGE_SUCCESS :
            return {
                ...state.home,
                error: null,
                isUploading: false,
                prediction: action.data
            };
        case types.UPLOAD_IMAGE_FAIL :
            return {
                ...state.home,
                error: action.error,
                isUploading: false,
                prediction: null
            };
        case types.UPLOADING_IMAGE:
            return {
                ...state.home,
                error: null,
                isUploading: true,
                prediction: null
            };
        case types.CLEAR_PREDICTION:
            return {
                ...state.home,
                error: null,
                isUploading: false,
                prediction: null
            };
        default:
            return state;
    }
}