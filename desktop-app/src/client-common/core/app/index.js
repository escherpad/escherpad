// escherpad has all these insertion points
const NAME_SPACE = "example-plugin";
// this is almost DI.
export const module = {
    requireReload: true,
    commands: {},
    reducer: {}, // or a function (s, a)=>s
    views: {},
    viewAnchors: {},
    saga: {},
    config: (c) => c
};
