import React from "react";
import {Route, Switch} from "react-router-dom";
import Escherpad from "./pages/Escherpad";
import NoMatch from "./pages/404.js";

export default function Root() {
    return (
        <Switch>
            <Route exact path="/" component={() => <div>path is /</div>}/>
            <Route exact path="/github/:account/gists/:path*" component={Escherpad}/>
            <Route exact path="/github/:account/:repo/:path*" component={Escherpad}/>
            <Route exact path="/dropbox/:account/:path*" component={Escherpad}/>
            <Route exact path="/:username/" component={Escherpad}/>
            <Route exact path="/:username/:bindr_id/" component={Escherpad}/>
            <Route exact path="/:username/:bindr_id*/:note_id" component={Escherpad}/>
            <Route component={NoMatch}/>
        </Switch>
    );
}
