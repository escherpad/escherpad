/** Created by ge on 3/8/16. */
import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Router, Route, Link} from 'react-router';
import {rootStore} from "./store/RootStore";
import {dropboxApi} from "./services/dropboxApi";
import MainEditorView from './views/MainEditorView'
import IntegrationsView from "./views/IntegratsionsView"
import DropboxRedirectLanding from "./views/DropboxRedirectLanding";

function createWithDefaultProps(Component, props) {
  return <Component {...props} store={rootStore} dropboxApi={dropboxApi}/>;
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={browserHistory} createElement={createWithDefaultProps}>
      <Route path="/" component={MainEditorView}></Route>
      <Route path="/integrations(.html)" component={IntegrationsView}></Route>
      <Route path="/oauth/dropbox-redirect(.html)" component={DropboxRedirectLanding}></Route>
    </Router>,
    document.getElementById('app')
  );
});
