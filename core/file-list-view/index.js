// escherpad has all these insertion points
const NAMESPACE = "core-app";

// this is almost DI.
export default {
    namespace: NAMESPACE,
    requireReload: true,
    commands: {},
    reducer: {}, // or a function (s, a)=>s
    views: {},
    viewAnchors: {},
    saga: {},
    config: (c) => c
}
