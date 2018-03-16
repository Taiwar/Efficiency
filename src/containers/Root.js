import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import Routes from '../routes';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { PURGE } from 'redux-persist';

class Root extends Component {

    render() {
        return (
            <Provider store={this.props.store}>
                <PersistGate loading={null} persistor={this.props.persistor}>
                    <ConnectedRouter history={this.props.history}>
                        <Routes />
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
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

export default connect(
    (store) => {
        return {

        };
    },
    (dispatch) => {
        // purgeStore(dispatch);
        return {

        };
    }
)(Root)