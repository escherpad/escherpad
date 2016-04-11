/** Created by ge on 3/8/16. */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App'
import {rootStore} from "./app/rootStore";

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <App store={rootStore}/>,
    document.getElementById('app')
  );
});
