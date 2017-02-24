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
    jax: ["input/TeX", "output/HTML-CSS"],
    //showMathMenu: false,
    //showMathMenuMSIE: false,
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
  MathJax.Hub.Register.MessageHook("Error", function (message) {
    //  do something with the error.  message[2] is the Error object that records the problem.
    console.log(message);
  });
  MathJax.Hub.Register.MessageHook("Begin Math Input", function () {
    MathJax.Extension["TeX/AMSmath"].refs = [];
    MathJax.Extension["TeX/AMSmath"].refUpdate = false
  });
  // todo: add end math input, compare what label has changed, save label to global via the index.
  // label number is stil the same. tag is start
  MathJax.Hub.Configured();
}


function removeKey(obj, f, once = false) {
  "use strict";
  const ks = Object.keys(obj);
  for (let i in ks) {
    let key = ks[i];
    if (f(obj[key])) {
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
  window.MathJax.Extension["TeX/AMSmath"].startNumber = start - 1;
  // done: scan through the tags, figure out what tag this corresponds to, remove the key that tag correspond to.
  // link: https://github.com/mathjax/MathJax/issues/1705
  // notice: assume only one equation occurs in each render.
  removeKey(window.MathJax.Extension["TeX/AMSmath"].labels, (v) => (Number(v.tag) === start), true);
}
