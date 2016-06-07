/** Created by ge on 5/14/16. */
import {parseTokenQueryString, getAccountInfo, DropboxApi, getFolders} from "./../lib/dropbox-api";

var dropboxApi = new DropboxApi("wous2hd2d66sone", "http://localhost:4000/oauth/dropbox-redirect.html");

module.exports = {
  parseTokenQueryString,
  getAccountInfo,
  getFolders,
  dropboxApi
};
