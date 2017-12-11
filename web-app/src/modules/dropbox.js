/** Created by ge on 12/4/16. */

import DropboxApi, {parseTokenQueryString, requestAccessToken} from "eywa-dropbox";

export const REDIRECT_URI = "http://localhost:4000/gittor/oauth/dropbox-redirect.html";
// export const REDIRECT_URI = `${window.location.href}oauth/dropbox-redirect.html`;
console.warn('TODO: window.location.href is not supported on the server. Need to place this into a compoment!');
export const CLIENT_ID = "kroubcx0l6slseu";

const dapi = new DropboxApi(CLIENT_ID, REDIRECT_URI);
export default dapi;

