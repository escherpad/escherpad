/** Created by ge on 5/14/16. */
import DropboxApi from "eywa-dropbox";
export {parseTokenQueryString, requestAccessToken} from "eywa-dropbox";

import {DROPBOX_APP} from '../configs';
const {CLIENT_ID, REDIRECT_URI} = DROPBOX_APP;
export const dropboxApi = new DropboxApi(CLIENT_ID, REDIRECT_URI);

