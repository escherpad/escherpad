/** Created by ge on 4/29/16. */
export default function If({ifData, children}) {
  children = [].concat(children);
  for (var i = 0; i < children.length; i++) {
    if (children[i].props['data-ifValue'] === ifData) return children[i];
  }
  for (var i = 0; i < children.length; i++) {
    if (children[i].props['data-ifDefault']) return children[i];
  }
  return (null);
}
