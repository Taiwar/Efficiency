import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import todos from './todosReducer';
import settings from './settingsReducer';

export default combineReducers({
    todos,
    settings,
    firebase: firebaseReducer,
    form: formReducer
})