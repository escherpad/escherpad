/** All client side bootstrapping happens here, including Browser Router.*/
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import Root from './Root';
import {AsyncComponentProvider, createAsyncContext} from "react-async-component";
import asyncBootstrapper from 'react-async-bootstrapper';
import registerServiceWorker, {unregister} from './registerServiceWorker';
import {store$} from "./store/index.js";
import {LunaProvider} from "./lib/luna-react";

// note: Store and app states
const rehydrateState = window.ASYNC_COMPONENTS_STATE || createAsyncContext().getState();

const app = <AsyncComponentProvider rehydrateState={rehydrateState}>
    <BrowserRouter>
        <LunaProvider store={store$}>
            <Root/>
        </LunaProvider>
    </BrowserRouter>
</AsyncComponentProvider>;

// note: This prevents the "flash"  from happening.
asyncBootstrapper(app)
    .then(function () {
        ReactDOM.render(app, document.getElementById('root'));
    });

// todo: might consider putting this inside a timeout to speed up the initial rendering.
// registerServiceWorker();
unregister();
