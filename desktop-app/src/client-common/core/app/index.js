// escherpad has all these insertion points
const NAMESPACE = "core-app";
import React from "react";

// this is almost DI.
export default {
    namespace: NAMESPACE,
    requireReload: true,
    commands: {},
    reducer: {}, // or a function (s, a)=>s
    views: {
        _bootstrap: function () {
            return <div>hahaha</div>
        }
    },
    viewAnchors: {},
    saga: {},
    config: (c) => c
}
