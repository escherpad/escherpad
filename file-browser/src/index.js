import React from 'react';
import ReactDOM from "react-dom";
import Meta from "./Meta";

window.document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Meta/>, window.document.querySelector('#bootstrap'));
});
