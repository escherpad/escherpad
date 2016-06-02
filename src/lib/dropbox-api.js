/** Created by ge on 5/12/16. */
import "whatwg-fetch";
export function requestToken(client_id, redirect_uri, state) {
  var url = 'https://www.dropbox.com/1/oauth2/authorize';
  var params = {
    response_type: "token",
    client_id,
    redirect_uri,
    state
  };
  var path = url + "?" + Object.keys(params).map(k=>`${k}=${params[k]}`).join("&");
  window.location.href = path;
}

export function parseToken() {
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

export function getAccountInfo(access_token) {
  "use strict";
  var url = 'https://api.dropboxapi.com/1/account/info';
  return fetch(url + '?access_token=' + access_token)
    .then(res=>res.json());
}

export function getFiles() {
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
    requestToken(this.config.client_id, this.config.redirect_url, state);
  }

  getAccessToken() {
  }
}
