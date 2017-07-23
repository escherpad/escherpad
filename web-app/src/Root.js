import React from "react";
import {Route, Switch} from "react-router-dom";
import Escherpad from "./pages/Escherpad";

export default function Root() {
    return (
        <Switch>
            <Route exact path="/" component={() => <div>path is /</div>}/>
            <Route exact path="/all" component={Escherpad}/>
            <Route exact path="/:username/:bindr_id*/:note_id" component={Escherpad}/>
            <Route component={() => <div>404 no match</div>}/>
        </Switch>
    );
}
