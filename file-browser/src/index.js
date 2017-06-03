import React from 'react';
import ReactDOM from "react-dom";
import Meta from "./Meta";
import {store$} from "./model";


window.document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Meta store$={store$}/>, window.document.querySelector('#bootstrap'));
});
