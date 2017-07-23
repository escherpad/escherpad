/** All client side bootstrapping happens here, including Browser Router.*/
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
