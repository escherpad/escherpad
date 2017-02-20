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
  MathJax.Hub.Configured();
}

export function resetNumbering(start = 1) {
  "use strict";
  /* see this link: https://github.com/benweet/stackedit/issues/180 */
  /* note: to change format of equation labeling, take a look at this link
  * http://tex.stackexchange.com/questions/63138/how-do-i-number-equations-with-roman-numbers */
  window.MathJax.Extension["TeX/AMSmath"].startNumber = start - 1;
  window.MathJax.Extension["TeX/AMSmath"].labels = {};
}
