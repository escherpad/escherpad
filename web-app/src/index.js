/** All client side bootstrapping happens here, including Browser Router.*/
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import {AsyncComponentProvider, createAsyncContext} from "react-async-component";
import asyncBootstrapper from 'react-async-bootstrapper';
import {} from "./store/index.js";

// note: Store and app states
const rehydrateState = window.ASYNC_COMPONENTS_STATE || createAsyncContext().getState();

const app = (
    <AsyncComponentProvider rehydrateState={rehydrateState}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </AsyncComponentProvider>
);

// note: This prevents the "flash"  from happening.
asyncBootstrapper(app)
    .then(function () {
        ReactDOM.render(app, document.getElementById('root'));
    });

// todo: might consider putting this inside a timeout to speed up the initial rendering.
registerServiceWorker();
