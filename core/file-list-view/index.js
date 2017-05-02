// escherpad has all these insertion points
const NAMESPACE = "file-list-view";

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
    // publish a list of view anchors
    viewAnchors: [],
    views: {},
    config: (c) => c
}
