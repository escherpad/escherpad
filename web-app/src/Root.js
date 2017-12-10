import React from "react";
import {Route, Switch} from "react-router-dom";
import Escherpad from "./pages/Escherpad";
import NoMatch from "./pages/404.js";
import FrontPage from "./pages/FrontPage";
import Todo from "./pages/Todo";
import {asyncComponent} from "react-async-component";

const AsyncFindr = asyncComponent({
    resolve: () => import('./pages/Findr')
});

const AsyncEscherpad = asyncComponent({
    resolve: () => import('./pages/Escherpad')
});
export default function Root() {
    return (
        <Switch>
            <Route exact path="/" component={() => <FrontPage/>}/>
            <Route exact path="/findr" component={AsyncFindr}/>
            <Route exact path="/todo" component={Todo}/>
            {/* this one is for debug only */}
            <Route exact path="/notes" component={AsyncEscherpad}/>
            <Route exact path="/github/:account/gists/:path*" component={AsyncEscherpad}/>
            <Route exact path="/github/:account/:repo/:path*" component={AsyncEscherpad}/>
            <Route exact path="/dropbox/:account/:path*" component={AsyncEscherpad}/>
            {/*<Route exact path="/:username/" component={AsyncEscherpad}/>*/}
            {/*<Route exact path="/:username/notes:/:note_id" component={AsyncEscherpad}/>*/}
            {/*<Route exact path="/:username/:bindr_id/" component={AsyncEscherpad}/>*/}
            {//<Route exact path="/:username/:bindr_id*/:note_id" component={AsyncEscherpad}/>
            }
            <Route component={NoMatch}/>
        </Switch>
    );
}
