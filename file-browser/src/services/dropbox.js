import {
    DropboxAPI
} from "eywa";

// test only code
// import {
//     dropboxClientId as clientId,
//     dropboxAccessToken as token
// } from "../test.config"
const clientId = 'xx';
// end

let dp = new DropboxAPI(clientId);

console.log("Init dropbox")
console.log(dp);

// const COMMANDS = [
//     "DROPBOX::GET_FILES",
//     "DROPBOX::file_rename",
//     "DROPBOX::file_update",
//     "DROPBOX::",
//     "DROPBOX::GET_FILES",
//     "DROPBOX::GET_FILES",
// ];
import {
    fork
} from "luna-saga";

export function* dropboxMainProc() {
    // while (true) {
    // console.log(fork);
    // const result = yield 'ha';
    // console.log(result);
    // fork(new_process, arguments1, arg2, arg3...);
    // }
}


