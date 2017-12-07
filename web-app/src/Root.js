import React from "react";
import {Route, Switch} from "react-router-dom";
import Escherpad from "./pages/Escherpad";
import NoMatch from "./pages/404.js";
import FrontPage from "./pages/FrontPage";
import Todo from "./pages/Todo";
import Findr from "./pages/Findr";

export default function Root() {
    return (
        <Switch>
            <Route exact path="/" component={() => <FrontPage/>}/>
            <Route exact path="/findr" component={Findr}/>
            <Route exact path="/todo" component={Todo}/>
            <Route exact path="/github/:account/gists/:path*" component={Escherpad}/>
            <Route exact path="/github/:account/:repo/:path*" component={Escherpad}/>
            <Route exact path="/dropbox/:account/:path*" component={Escherpad}/>
            <Route exact path="/:username/" component={Escherpad}/>
            <Route exact path="/:username/notes:/:note_id" component={Escherpad}/>
            <Route exact path="/:username/:bindr_id/" component={Escherpad}/>
            <Route exact path="/:username/:bindr_id*/:note_id" component={Escherpad}/>
            <Route component={NoMatch}/>
        </Switch>
    );
}
