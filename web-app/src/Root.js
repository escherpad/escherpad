import React from "react";
import {Route, Switch} from "react-router-dom";
import {Flex} from "layout-components";
import Escherpad from "./pages/Escherpad";
import NoMatch from "./pages/404.js";
import Fade from "react-fade";

export default function Root() {
    return (
        <Flex fill component={Fade} duration={0.2}>
            <Switch>
                <Route exact path="/" component={() => <div>path is /</div>}/>
                <Route exact path="/all" component={Escherpad}/>
                <Route exact path="/:username/:bindr_id*/:note_id" component={Escherpad}/>
                <Route component={NoMatch}/>
            </Switch>
        </Flex>
    );
}
