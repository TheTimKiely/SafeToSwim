// @flow

import * as dataLayer from '../../data-sources/data-layer';

export function upload(photo: any): any => any {
    // this is not used anywhere
    return (dispatch: any) => dataLayer.upload(dispatch, photo);
}