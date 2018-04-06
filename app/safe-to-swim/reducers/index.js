import { combineReducers } from 'redux';
import { reducers as camera } from '../screens/camera/reducers';

const rootReducer = combineReducers({ camera });

export default rootReducer;