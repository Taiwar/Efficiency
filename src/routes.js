import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsPage from './components/SettingsPage';
import { ROOT_PATH, SETTINGS_PATH } from './constants';

export default () => (
    <App>
        <Switch>
            <Route path={SETTINGS_PATH} component={SettingsPage} />
            <Route path={ROOT_PATH} component={HomePage} />
        </Switch>
    </App>
);
