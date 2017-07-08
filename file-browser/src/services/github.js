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


let gh = new GitHubAPI(clientId);
gh.updateAccessToken(accessToken);

console.log("Init github")
console.log(gh);

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

export function* githubMainProc() {
    while (true) {
        let action = yield take("GITHUB::LIST_FILES");
        console.log("github main process");
        console.log(action);
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
