// escherpad has all these insertion points
const NAMESPACE = "code-view";

import CodeView from "./code-view";
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
    views: {CodeView},
    config: (c) => c
}
