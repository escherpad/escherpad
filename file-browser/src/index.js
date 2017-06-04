import React from 'react';
import ReactDOM from "react-dom";
import Meta from "./Meta";
import {store$} from "./model/model";


window.document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Meta store$={store$} dispatch={store$.dispatch}/>, window.document.querySelector('#bootstrap'));
});
