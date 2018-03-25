import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PURGE } from 'redux-persist';
import Routes from '../routes';

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <PersistGate loading={null} persistor={this.props.persistor}>
                        <ConnectedRouter history={this.props.history}>
                            <Routes />
                        </ConnectedRouter>
                    </PersistGate>
                </Provider>
            </div>
        );
    }
}

function purgeStore(dispatch) {
    dispatch({
        type: PURGE,
        key: "root",
        result: () => null
    });
}

Root.propTypes = {
    history: PropTypes.object.isRequired,
    persistor: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

export default Root;