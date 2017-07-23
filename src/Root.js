import React from "react";
import {Route, Switch} from "react-router-dom";

// dev only
import JSONPretty from 'react-json-pretty';


export default function Root() {
    return (
        <Switch>
            <Route exact path="/" component={() => <div>path is /</div>}/>
            <Route exact path="/all" component={() => <div>path is /all</div>}/>
            <Route exact path="/:username/:bindr_id/:path*"
                   component={(props) => <div>root page<JSONPretty json={props}/></div>}/>
            <Route component={()=><div>404 no match</div>}/>
        </Switch>
    );
}
