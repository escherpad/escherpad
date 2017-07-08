// @flow
import {
    GitHubAPI
} from "eywa";

/* test only code*/
// all of the tests below require OAuth to work.
import {
    githubClientId as clientId,
    githubClientSecret,
    githubAccessToken as accessToken,
    testRepoName,
    testGithubUsername as testUsername,
    testPublickRepo,
    testPrivateRepo
} from "../test.config.js";
/* end*/




const COMMANDS = [
    "GITHUB::LIST_FILES",
    "GITHUB::LIST_REPOS",
    "GITHUB::GET_FILES",
    "GITHUB::FILE_RENAME",
    "GITHUB::FILE_UPDATE"
];

import {
    fork,
    take,
    dispatch
} from "luna-saga";

// test only
const testClientId : string = "b4666a3b2ac86229f0c7";
const testAccessToken : string = "f7ccfee5aa99defa67b713dea00f739d0be5939c";

let gh = new GitHubAPI(clientId);
gh.updateAccessToken(accessToken);

console.log("Init github");
console.log(gh);

export function* githubMainProc() {
    while (true) {
        let action = yield take("GITHUB::LIST_FILES");
        console.log("github main process");
        console.log(action, gh);
        const data = yield gh.listRepos(testUsername);
        console.log("list repos from the github");
        console.log(data);
        let repoNames = data.map((metaInfo) => {
            return {id: metaInfo.id, full_name: metaInfo.full_name};
        });
        console.log("get the repo names");
        console.log(repoNames);
        yield dispatch({type: "DISPLAY_FILES", data: repoNames});
    }
}


const uuidV4 = require('uuid/v4');
export function accountHelper(clientId = testClientId, accessToken = testAccessToken, uuidGenerator = uuidV4) {
    return {
        $key: uuidGenerator(),
        client_id: testClientId,
        access_token: testAccessToken,
        backend: 'github',
        view: {
            user_id: 'test userId',
            username: 'jam-world',
            email: 'chencha92111@gmail.com',
            name: 'jamworld'
        }
    }
}
