import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';
import './styles/index.styl';
import registerServiceWorker from './registerServiceWorker';
// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();