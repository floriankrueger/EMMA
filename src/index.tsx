import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/de';
import App from './App';
import { initialize as initFirebase } from './firebase';
import * as serviceWorker from './serviceWorker';

initFirebase();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
