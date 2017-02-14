/** Created by ge on 4/11/16. */

// export const cursorId = "这是光标的ID";
// export const cursorString = `<cursor id="${cursorId}"></cursor>`;
export const cursorString = `皾觢`;
export function insertCursor(source, {row, column}) {
  if (!row) row = 0; // set all null value besides undefined as 0
  if (!column) column = 0; // set all null value besides undefined as 0
  let lines = source.split('\n');
  let line = lines[row];
  if (line.length !== 0) {
    lines[row] = line.slice(0, column) + cursorString + line.slice(column);
  } else {
    lines.splice(row, 0, cursorString);
  }
  return lines.join('\n');
}

function getTextNodeBoundingRect(textNode) {
  var height = 0;
  if (!document.createRange) return;
  var range = document.createRange();
  range.selectNodeContents(textNode);
  if (!range.getBoundingClientRect) return;
  return range.getClientRects()[0];
}

function matchText(text, pattern) {
  let start = text.search(pattern);
  if (start === -1) return;
  let end = start + pattern.length;
  return {start, end}
}
function spliceTextNode(textNode, start, end) {
  let parent = textNode.parentNode;
  let before, middle, after;
  before = document.createTextNode(textNode.nodeValue.slice(0, start));
  middle = document.createTextNode(textNode.nodeValue.slice(start, end));
  after = document.createTextNode(textNode.nodeValue.slice(end));
  parent.insertBefore(before, textNode);
  parent.insertBefore(middle, textNode);
  parent.insertBefore(after, textNode);
  parent.removeChild(textNode);
  return {before, middle, after};
}

function removeNode(node) {
  let parent = node.parentNode;
  if (!parent) return;
  parent.removeChild(node);
}

// [x] find text node containing text
// [x] replace text node with three text segments
// [x] return the position of target text
// return the original text node
// carets are lost anyways.

import findNodeWithText from "./findNodeWithText";
export function getCursorStringPosition(previewElement) {
  let textNode = findNodeWithText(previewElement, cursorString)[0];
  if (!textNode) return;
  let match = matchText(textNode.nodeValue, cursorString);
  if (!match) return;
  let {start, end}=  match;
  let {before, middle, after} = spliceTextNode(textNode, start, end);
  let rect = getTextNodeBoundingRect(middle);
  middle.nodeValue = textNode.nodeValue.replace(cursorString, '');
  removeNode(before);
  removeNode(after);
  return rect;
}

