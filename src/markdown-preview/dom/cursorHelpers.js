/** Created by ge on 4/11/16. */

// const cursorString = "<span id='current-cursor' class='cursor-blinking'></span>";
export const cursorId = "这是光标的ID";
export const cursorString = `<cursor id="${cursorId}"></cursor>`;
export function insertCursor(source, cursor) {
  let lines = source.split('\n');
  let line = lines[cursor.row];
  if (line.trim().length !== 0) {
    lines[cursor.row] = line.slice(0, cursor.column) + cursorString + line.slice(cursor.column);
  } else {
    lines.splice(cursor.row, 0, cursorString + "\n");
  }
  return lines.join('\n');
}

export function findCursor(html) {
  let element;
  return element;
}

export function getAceCursorPosition() {
  let cursor = document.querySelector('.ace_cursor'); // possibly .ace_cursor_hidden
  if (!cursor) return;
  let rect = cursor.getBoundingClientRect();
  console.log(rect);
  return (rect.top + rect.bottom) / 2;
}

import findNodeWithText from "./findNodeWithText";
export function getCursorStringPosition(previewElement) {
  var cursor = document.getElementById(cursorId);
  if (!cursor) cursor = findNodeWithText(previewElement, cursorString)[0];
  if (!cursor) return;
  if (!cursor.getBoundingClientRect) cursor = cursor.parentNode;
  let rect = cursor.getBoundingClientRect();
  return (rect.top + rect.bottom) / 2;
}
