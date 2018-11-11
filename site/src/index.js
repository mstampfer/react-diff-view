import React from 'react';
import '@babel/polyfill';
import {render} from 'react-dom';
import {App} from './components/index.js';

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
