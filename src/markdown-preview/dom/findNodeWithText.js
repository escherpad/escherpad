/** Created by ge on 4/11/16. */
// http://stackoverflow.com/a/10730777/1560241
export default function findNodeWithText(el, exp) {
  var n, a = [], walker;
  walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      let index = node.textContent.search(exp);
      if (index > -1) {
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_REJECT;
      }
    }
  }, false);
  while (n = walker.nextNode()) a.push(n);
  return a;
}

