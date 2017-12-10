export function getParentFolder(currentFolder) {
  return currentFolder ? currentFolder.split('/').slice(0, -1).join('/') : undefined;
}
