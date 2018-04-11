import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState.trashBagFinder, action) {
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