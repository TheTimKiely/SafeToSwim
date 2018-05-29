// @flow

import * as dataLayer from '../../data-sources/data-layer';

export function upload(image: Object): any => any {
    // this is not used anywhere
    return (dispatch: any) => dataLayer.upload(dispatch, image);
}