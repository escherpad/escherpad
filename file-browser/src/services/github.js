// @flow
import {
    GitHubAPI
} from "eywa";

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

        console.log("GITHUB::LIST_FILES");
        console.log(action);
        for (let account in action.state.accounts) {
            let info = account.split(":");
            if (info[0] == "github") {
                let username = info[1];
                let account_info = action.state.accounts[account];
                let client_id = account_info.client_id;
                let access_token = account_info.access_token;


                let gh = new GitHubAPI(client_id);
                gh.updateAccessToken(access_token);

                console.log("github main process");
                console.log(action, gh);
                const data = yield gh.listRepos(username);
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
    }
}


