import Reactotron from 'reactotron-react-js';
import { applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from './config/FirebaseConfig';
import firebase from 'firebase';
import reducers from './reducers';

firebase.initializeApp(fbConfig);

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const history = createHashHistory();
const router = routerMiddleware(history);
const middleware = applyMiddleware(router, thunk.withExtraArgument(getFirebase));
const store = Reactotron.createStore(persistedReducer, compose(middleware, reactReduxFirebase(firebase, reduxConfig)));
let persistor = persistStore(store);

export { store, history, persistor};