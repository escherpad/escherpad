'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParentFolder = getParentFolder;
function getParentFolder(currentFolder) {
  return currentFolder ? currentFolder.split('/').slice(0, -1).join('/') : undefined;
}
//# sourceMappingURL=pathOps.js.map