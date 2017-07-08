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

// test only
const testClientId : string = "uhpeu63dv1pqgor";
const testAccessToken : string = "p5mHBr4rHvYAAAAAAAAANpuR45x2fOWdBSQqs5rtKeFD8GMF7uH8emUZTy_F53zT";

export function* dropboxMainProc() {
    // while (true) {
    // console.log(fork);
    // const result = yield 'ha';
    // console.log(result);
    // fork(new_process, arguments1, arg2, arg3...);
    // }
}


const uuidV4 = require('uuid/v4');
export function accountHelper(cliendId = testClientId, accessToken = testAccessToken, uuidGenerator = uuidV4) {
    return {
        $key: uuidGenerator(),
        client_id: cliendId,
        access_token: accessToken,
        backend: 'dropbox',
        view: {
            user_id: 'test userId',
            username: 'jam-world',
            email: 'chencha92111@gmail.com',
            name: 'jamworld'
        }
    }
}
