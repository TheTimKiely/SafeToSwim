import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export default function reducer(state = initialState.camera, action) {
    switch (action.type) {

        case types.FETCH_PHOTOS_SUCCESS :
            return {
                ...state,
                photos: Object.assign({}, action.photos)
            };
        case types.FETCH_PHOTOS_FAIL :
            return {
                ...state,
                photos: {}
            };
        default:
            return state;
    }
}