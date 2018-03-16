import { combineReducers } from 'redux';
import todos from './todosReducer';
import settings from './settingsReducer';

export default combineReducers({
    todos,
    settings
})