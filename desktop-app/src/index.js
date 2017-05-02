import Ra_ from "./client-common/Ra_"
import React from 'react';
import ReactDOM from "react-dom";

const ra_ = new Ra_();
ra_.loadModule(require('./client-common/core/app').default);
ra_.loadModule(require('./client-common/core/context-view').default);
ra_.loadModule(require('./client-common/core/file-list-view').default);
ra_.loadModule(require('./client-common/core/file-viewer').default);
ra_.loadModule(require('./client-common/core/code-view').default);

window.document.addEventListener('DOMContentLoaded', function () {
    const BootStrap = ra_.bootstrap();
    ReactDOM.render(<BootStrap raViews={ra_._views}/>, window.document.querySelector('#bootstrap'));
});
