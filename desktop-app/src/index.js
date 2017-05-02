import Ra_ from "./Ra_"
import appModule from './client-common/core/app';

const ra_ = new Ra_();
window.ra_ = ra_;
ra_.loadModule(appModule);

window.document.addEventListener('DOMContentLoaded', function(){
    ra_.bootstrap(window.document.querySelector('#bootstrap'));
});

