/** Created by ge on 4/12/16. */
export function getAceCursorPosition() {
  let cursor = document.querySelector('.ace_cursor'); // possibly .ace_cursor_hidden
  if (!cursor) return;
  let rect = cursor.getBoundingClientRect();
  return rect;
}
