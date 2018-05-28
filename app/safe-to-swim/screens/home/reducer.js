import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_USER_STATS_SUCCESS :
            return {
                ...state,
                home: Object.assign({}, state.home, action.data, {error: null})
            };
        case types.GET_USER_STATS_FAIL :
            return {
                ...state,
               home: Object.assign({}, initialState.home, {error: 'Your stats are unavailable stats'})
            };
        case types.SET_USER_STATS_SUCCESS :
            return {
                ...state,
                home: Object.assign({}, state.home, action.data, {error: null})
            };
        case types.SET_USER_STATS_FAIL :
            return {
                ...state,
                home: Object.assign({}, initialState.home, {error: 'failed to set stats'})
            };
        default:
            return state.home;
    }
}