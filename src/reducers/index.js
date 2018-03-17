import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import todos from './todosReducer';
import settings from './settingsReducer';

export default combineReducers({
    todos,
    settings,
    firebase: firebaseReducer,
})