// @flow

import * as dataLayer from '../../data-sources/data-layer';

export function uploadPhoto(photo) {
    // this is not used anywhere
    return (dispatch) => dataLayer.uploadPhoto(dispatch, photo);
}