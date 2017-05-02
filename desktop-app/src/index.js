import App from "./App"
import appModule from './client-common/core/app';

export const app = new App();
app.loadModule(appModule);

window.document.addEventListener('DOMContentLoaded', function(){
    app.bootstrap(window.document.querySelector('#bootstrap'));
});
