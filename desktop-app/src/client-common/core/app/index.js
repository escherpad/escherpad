// escherpad has all these insertion points
const NAMESPACE = "core-app";
import Bootstrap from "./bootstrap"

// this is almost DI.
export default {
    /** Module Parameters*/
    namespace: NAMESPACE,
    requireReload: true,

    /** Model and Controller Code */
    commands: {},
    reducers: {}, // or a function (s, a)=>s
    sagas: {},

    /** View Code */
    viewAnchors: [],
    views: {
        _bootstrap: Bootstrap
    },
    config: (c) => c
}
