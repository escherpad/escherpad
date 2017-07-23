import React from "react";
import {Route} from "react-router-dom";

export default function Root() {
    return (
        <div>
            <Route exact path="/" component={() => <div>path is /</div>}/>
            <Route exact path="/all" component={() => <div>path is /all</div>}/>
            <Route exact path="/github/:username/:repo?:path" component={() => <div>path is /github/:username/:repo/:path</div>}/>
            <Route exact path="/dropbox/:path" component={() => <div>root page</div>}/>
            <Route exact path="/jupyter/:path" component={() => <div>root page</div>}/>
            <Route exact path="/escherpad/:bindr_id/:note_id" component={() => <div>root page</div>}/>
        </div>
    );
}
