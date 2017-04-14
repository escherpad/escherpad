/** Created by ge on 12/13/16. */
export default function base64ToArrayBuffer() {
  "use strict";
  let base64 = base64.split('data:image/png;base64,').join('');
  let binary_string = window.atob(base64),
    len = binary_string.length,
    bytes = new Uint8Array(len),
    i;

  for (i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

