import React from "react";
import {Route} from "react-router-dom";

export default function Root() {
    return (
        <Route exact path="/" component={() => <div>root page</div>}/>
    );
}
