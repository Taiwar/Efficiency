import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';

export default () => (
    <App>
      <Switch>
          <Route path="/settings" component={SettingsPage} />
          <Route path="/" component={HomePage} />
      </Switch>
    </App>
);
