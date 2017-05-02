// escherpad has all these insertion points
const NAMESPACE = "file-viewer";

import FileViewer from "./file-viewer";
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
    views: {FileViewer},
    config: (c) => c
}
