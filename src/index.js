/** Created by ge on 3/8/16. */
import 'react-fastclick';
import React from "react";
import {render} from "react-dom";
import dapi from "./modules/dropbox";
import {browserHistory, Router, Route} from 'react-router';
import {rootStore} from "./store/RootStore";
import MainEditorView from './views/MainEditorView'
import IntegrationsView from "./views/IntegratsionsView"
import DropboxRedirectLanding from "./oauth/DropboxRedirectLanding";

import "./index.scss";

function createWithDefaultProps(Component, props) {
  return <Component {...props}
                    store={rootStore}
                    dispatch={rootStore.dispatch.bind(rootStore)}
                    dapi={dapi}
  />;
  // {/*gapi={gapi}*/}
  // {/*githubapi={githubapi}*/}
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


