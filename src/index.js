/** Created by ge on 3/8/16. */
import React from "react";
import {render} from "react-dom";
import {browserHistory, Router, Route} from 'react-router';
import {rootStore} from "./store/RootStore";
import {dropboxApi} from "./services/dropboxApi";
import MainEditorView from './views/MainEditorView'
import IntegrationsView from "./views/IntegratsionsView"
import DropboxRedirectLanding from "./views/DropboxRedirectLanding";

function createWithDefaultProps(Component, props) {
  return <Component {...props} store={rootStore} dispatch={rootStore.dispatch.bind(rootStore)}
                               dropboxApi={dropboxApi}/>;
}

document.addEventListener('DOMContentLoaded', function () {
  render(
    <Router history={browserHistory} createElement={createWithDefaultProps}>
      <Route path="/gittor/(index.html)" component={MainEditorView}/>
      <Route path="/gittor/integrations(.html)" component={IntegrationsView}/>
      <Route path="/gittor/oauth/dropbox-redirect(.html)" component={DropboxRedirectLanding}/>
    </Router>,
    document.getElementById('app')
  );
});

if (module.hot) {
  module.hot.accept('./views/MainEditorView', () => {
    const NextMainEditorView = require('./views/MainEditorView').default;
    render(
      <Router history={browserHistory} createElement={createWithDefaultProps}>
        <Route path="/gittor/(index.html)" component={NextMainEditorView}/>
        <Route path="/gittor/integrations(.html)" component={IntegrationsView}/>
        <Route path="/gittor/oauth/dropbox-redirect(.html)" component={DropboxRedirectLanding}/>
      </Router>,
      document.getElementById('app')
    );
  });
}


