// @flow

import * as dataLayer from '../../data-sources/data-layer';

export function uploadPhoto(photo: any): any => any {
    // this is not used anywhere
    return (dispatch: any) => dataLayer.uploadPhoto(dispatch, photo);
}