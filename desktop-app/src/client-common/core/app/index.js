// escherpad has all these insertion points
const NAME_SPACE = "example-plugin";

// this is almost DI.
const module = {
    requireReload: true,
    commands: {},
    reducer: {}, // or a function (s, a)=>s
    views: {},
    viewAnchors: {},
    saga: {},
    config: (c) => c
};
export default module
