/** Created by ge on 2/19/17. */
/* this remove the default  for the context menu,
 * mostly the HTML_CSS setting over SVG.
 */
const epMathUtil = {
  inlineMath: ["\\(", "\\)"],
  displayMath: ["\\[", "\\]"],
};

const timerId = setInterval(checkAndConfig, 500);
function checkAndConfig() {
  "use strict";
  if (MathJax) {
    configureMathjax();
    clearInterval(timerId);
  }
}

function configureMathjax() {
  "use strict";
  // todo: document.cookie.split(';').remove("mjx.menu");
  MathJax.Hub.Config({
    skipStartupTypeset: true,
    processUpdateTime: 0,
    processUpdateDelay: 0,
    extensions: ["tex2jax.js"],
    //jax: ["input/TeX", "output/SVG"],
    // jax: ["input/TeX", "output/HTML-CSS"],
    jax: ["input/TeX", "output/CommonHTML"],
    showMathMenu: false,
    showMathMenuMSIE: false,
    tex2jax: {
      inlineMath: [
        epMathUtil.inlineMath,
        // ["$", "$"]
      ],
      displayMath: [
        epMathUtil.displayMath,
        // ["$$", "$$"]
      ],
      processEscapes: true
    },
    TeX: {
      equationNumbers: {autoNumber: "AMS"},
      extensions: ['AMSmath.js', 'AMSsymbols.js']
    },
    "CommonHTML": {
      scale: 100,
      minScaleAdjust: 50,
      linebreaks: {
        automatic: true,
        width: '90% container'
      },
    },
    "HTML-CSS": {
      preferredFont: "STIX",
      matchFontHeight: true,
      linebreaks: {
        automatic: true,
        width: '900px'
      },
      availableFonts: ["TeX", "STIX"]
    },
    SVG: {
      scale: 100,
      font: "TeX",
      blacker: 10,
      matchFontHeight: true,
      linebreaks: {
        automatic: true,
        width: "900px"
      }
    },
    "CHTML-preview": {
      disabled: true
    }
  });
  MathJax.Hub.Configured();
}


function removeKey(obj, f, once = false) {
  "use strict";
  const ks = Object.keys(obj);
  for (let i in ks) {
    let key = ks[i];
    if (f(obj[key], key)) {
      delete obj[key];
      if (once) return;
    }
  }
}
export function resetNumbering(start = 1) {
  "use strict";
  /* see this link: https://github.com/benweet/stackedit/issues/180 */
  /* note: to change format of equation labeling, take a look at this link
   * http://tex.stackexchange.com/questions/63138/how-do-i-number-equations-with-roman-numbers */
  const ams = MathJax.Extension["TeX/AMSmath"];
  // done: add end math input, compare what label has changed, save label to global via the index. label number is stil the same. tag is start
  ams.startNumber = start - 1;
  // done: scan through the tags, figure out what tag this corresponds to, remove the key that tag correspond to.
  // link: https://github.com/mathjax/MathJax/issues/1705
  // notice: assume only one equation occurs in each render.
  // console.log(start, JSON.stringify(ams.labels));
  /* the label number is defined my the TeX script. It can not be calculated without running the TeX macro.
   normal equation numbers are not saved in the labels object. so the k==(start-1) is not effective. */
  removeKey(ams.labels,
    (v, k) => (v.tag == start || k == (start - 1) ||
    /* this is called double tap */
    v.tag === "???")
    , true);
}
