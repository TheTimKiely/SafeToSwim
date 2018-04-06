import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.loading, action) {
    switch (action.type) {
        case types.LOADING_COMPLETED:
            return {
                ...state,
                isLoadingComplete: action.isLoadingComplete
            };

        case types.LOADING_FAILED:
            return {
                ...state,
                skipLoadingScreen: true,
                loadingError: action.error
            };

        default:
            return state;
    }
}