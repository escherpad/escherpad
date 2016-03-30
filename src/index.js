/** Created by ge on 3/8/16. */
import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './app/AppLayout'
import rootStore from "./app/rootStore";

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <AppLayout store={rootStore}/>,
    document.getElementById('app')
  );
});
