// escherpad has all these insertion points
const NAMESPACE = "file-list-view";

// this is almost DI.
export default {
    namespace: NAMESPACE,
    requireReload: true,
    commands: {},
    reducers: {}, // or a function (s, a)=>s

    // publish a list of view anchors
    viewAnchors: [],
    views: {},
    sagas: {},
    config: (c) => c
}
