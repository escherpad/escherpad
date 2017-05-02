import Ra_ from "./Ra_"
import appModule from './client-common/core/app';

const ra_ = new Ra_();
ra_.loadModule(appModule);
// ra_.loadModule(fileListViewModule);

window.document.addEventListener('DOMContentLoaded', function(){
    ra_.bootstrap(window.document.querySelector('#bootstrap'));
});

