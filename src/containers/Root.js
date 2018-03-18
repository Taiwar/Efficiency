import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import Routes from '../routes';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { PURGE } from 'redux-persist';
import SignupModal from './SignupModal';

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <PersistGate loading={null} persistor={this.props.persistor}>
                        <ConnectedRouter history={this.props.history}>
                            <Routes />
                        </ConnectedRouter>
                        <SignupModal/>
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

export default connect(({ firebase, firebase: { auth } }) => ({
    auth: auth,
}))(Root)