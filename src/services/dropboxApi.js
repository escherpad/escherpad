/** Created by ge on 5/14/16. */
import DropboxApi from "eywa-dropbox";

export {parseTokenQueryString, requestAccessToken} from "eywa-dropbox";
export const CLIENT_ID = "wous2hd2d66sone";
export const REDIRECT_URI = "http://localhost:4000/oauth/dropbox-redirect.html";

export const dropboxApi = new DropboxApi(CLIENT_ID, REDIRECT_URI);

