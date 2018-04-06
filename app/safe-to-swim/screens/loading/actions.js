 import * as types from '../../constants/action-types';

 export function loadingFailed(error) {
     return { type: types.LOADING_FAILED, isLoadingComplete: true, error: error };
 }

 export function loadingCompleted() {
     return { type: types.LOADING_COMPLETED, isLoadingComplete: true };
 }