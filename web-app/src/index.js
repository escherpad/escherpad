/** All client side bootstrapping happens here, including Browser Router.*/
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import asyncBootstrapper from 'react-async-bootstrapper';
import {AsyncComponentProvider} from "react-async-component";

const rehydrateState = window.SERVER_COMPONENTS_STATE || {};

const app = (
    <AsyncComponentProvider rehydrateState={rehydrateState}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </AsyncComponentProvider>
);

// note: This prevents the "flash"  from happening.
asyncBootstrapper(app).then(function () {
    ReactDOM.render(app, document.getElementById('root'));
});

registerServiceWorker();
