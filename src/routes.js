import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LandingPage from './components/LandingPage';
import HomePage from './containers/HomePage';
import SettingsPage from './containers/SettingsPage';
import { ROOT_PATH, HOME_PATH, SETTINGS_PATH } from './util/constants';

class Routes extends Component {
    render() {
        return (
            <App>
                <Switch>
                    <Route path={SETTINGS_PATH} component={SettingsPage}/>
                    <Route path={HOME_PATH} component={HomePage}/>
                    <Route path={ROOT_PATH} component={LandingPage}/>
                </Switch>
            </App>
        );
    }
}

export default Routes
