import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

Reactotron
    .configure({name: 'Efficiency'})
    .use(sagaPlugin())
    .use(reactotronRedux())
    .connect();

Reactotron.clear();