import Ra_ from "./client-common/Ra_"

const ra_ = new Ra_();
ra_.loadModule(require('./client-common/core/app').default);
ra_.loadModule(require('./client-common/core/context-view').default);
ra_.loadModule(require('./client-common/core/file-list-view').default);

window.document.addEventListener('DOMContentLoaded', function () {
    ra_.bootstrap(window.document.querySelector('#bootstrap'));
});
