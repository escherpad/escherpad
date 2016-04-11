/** Created by ge on 4/11/16. */
export function insertCursor(source, cursor) {
  let lines = source.split('\n');
  let line = lines[cursor.row];
  lines[cursor.row] = line.slice(0, cursor.column) + "<span id='current-cursor' class='cursor-blinking'></span>" + line.slice(cursor.column);
  return lines.join('\n');
}
