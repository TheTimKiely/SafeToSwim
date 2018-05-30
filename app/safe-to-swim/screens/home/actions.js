// @flow

import * as dataLayer from '../../data-sources/data-layer';
import * as types from '../../constants/action-types';

export function upload(image: Object): any => any {
    return (dispatch: any) => {
        dispatch({type: types.UPLOADING_IMAGE});
        return dataLayer.upload(image)
            .then(data => dispatch({type: types.UPLOAD_IMAGE_SUCCESS, data}))
            .catch(error => dispatch({type: types.UPLOAD_IMAGE_FAIL, error}));
    };
}

export function clearPrediction() {
    return {type: types.CLEAR_PREDICTION};
}