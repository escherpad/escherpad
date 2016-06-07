/** Created by ge on 5/12/16. */
import "whatwg-fetch";

function rpcRequest(access_token, method, url, params={}, body=null) {
  "use strict";
  params.authorization = "Bearer " + access_token;
  // params.reject_cors_preflight = "true";
  /* for content-upload endpoints, use the params.args field to pass in
  /* a stringified arg payload. */
  var paramString = Object.keys(params).map(key=> {
    return key + "=" + params[key]
  }).join('&');
  var option = {
    method: method.toUpperCase(),
    headers: {
      Accept : "text/plain; charset=dropbox-cors-hack", // this avoids CORS round trip in Chrome
      /* octet and json works. Safari and FF overwrites charset.
       * Just need to turn off params.reject_cors_preflight.  */
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "text/plain; charset=dropbox-cors-hack"
    },
    body: JSON.stringify(body)
  };
  var queryString = url + "?" + paramString;
  return fetch(queryString, option)
    .then(res=>res.json());
}

function contentRequest(access_token, method, url, params={}, body=null) {
  "use strict";
  params.authorization = "Bearer " + access_token;
  var paramString = Object.keys(params).map(key=> {
    return key + "=" + params[key]
  }).join('&');
  var formData = body;
  var option = {
    method: method.toUpperCase(),
    headers: {
      Accept : "text/plain; charset=dropbox-cors-hack", // this avoids CORS round trip in Chrome
      "Content-Type": "application/octet-stream; charset=utf-8"
    },
    body: formData
  };
  var queryString = url + "?" + paramString;
  return fetch(queryString, option)
    .then(res=>res.json());
}

/* open a new window for the OAuth authorization */
export function requestAccessToken(client_id, redirect_uri, state) {
  var url = 'https://www.dropbox.com/1/oauth2/authorize';
  var params = {
    response_type: "token",
    client_id,
    redirect_uri,
    state
  };
  var path = url + "?" + Object.keys(params).map(k=>`${k}=${params[k]}`).join("&");
  window.open(path, "Connect To Dropbox", "modal=yes,alwaysRaised=yes");
}

/* parse the oauth redirect url to get the accessToken */
export function parseTokenQueryString() {
  "use strict";
  var hash = window.location.hash;
  var objectLiteral = hash.replace(/&/g, '","').replace(/=/g, '":"').replace(/(\?|#)/, '{"') + '"}';
  var {hash, access_token, token_type, state, uid} = JSON.parse(objectLiteral);
  return {
    hash,
    accessToken: access_token,
    tokenType: token_type,
    uid,
    state
  };
}

/*  */
export function getAccountInfo(access_token) {
  "use strict";
  var url = 'https://api.dropboxapi.com/2/users/get_current_account';
  return rpcRequest(access_token, "POST", url)
}

export function list() {
  "use strict";
  var url = 'https://api.dropboxapi.com/2/users/get_current_account';
  return rpcRequest(access_token, "POST", url)
}

export function get() {
}

export function create() {
}

export function sync() {
}

export function trash() {
}

export function getFolders(path = "", access_token) {
  "use strict";
  var url = 'https://api.dropboxapi.com/2/files/list_folder';
  var option = {
    method: 'POST',
    headers: new Headers({
      'Authorization': "Bearer " + access_token,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      path: path
    })
  };
  return fetch(url, option)
    .then(res=>res.json());
}

export class DropboxApi {
  constructor(client_id, redirect_url) {
    this.config = {client_id, redirect_url};
  }

  requestToken(state) {
    requestAccessToken(this.config.client_id, this.config.redirect_url, state);
  }

  getAccessToken() {
  }
}
