import {combineReducers} from 'redux';
import camera from '../screens/camera/reducer';
import home from '../screens/home/reducer';
const rootReducer = combineReducers({camera, home});

export default rootReducer;