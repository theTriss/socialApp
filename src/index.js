import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import Comp from './components/Comp';
import { Provider } from 'react-redux';

// import Test, {store as testStore}  from './Test';



ReactDOM.render(
    <Provider store={store}>
        <Comp />
    </Provider>, document.getElementById('root'));



serviceWorker.unregister();