// escherpad has all these insertion points
const NAMESPACE = "file-list-view";


import FileListView from './file-list-view';
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
    views: {FileListView},
    config: (c) => c
}
