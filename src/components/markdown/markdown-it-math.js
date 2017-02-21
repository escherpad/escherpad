/** Created by ge on 2/19/17. */
function scanInlineDelims(state, start, delimLength, allowLineBreaks) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
    isLastWhiteSpace, isNextWhiteSpace,
    left_flanking = true,
    right_flanking = true,
    max = state.posMax,
    isWhiteSpace = state.md.utils.isWhiteSpace;

  lastChar = allowLineBreaks ?
    start > 0 ? state.src.charCodeAt(start - 1) : 0x20
    : // treat beginning of the line as a whitespace
    start > 0 ? state.src.charCodeAt(start - 1) : 0x20;

  if (pos >= max) {
    can_open = false;
  }

  pos += delimLength;

  count = pos - start;

  nextChar = allowLineBreaks ?
    pos < max ? state.src.charCodeAt(pos) : 0x20
    : // treat end of the line as a whitespace
    pos < max ? state.src.charCodeAt(pos) : 0x20;

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  }

  can_open = left_flanking;
  can_close = right_flanking;

  return {
    can_open: can_open,
    can_close: can_close,
    delims: count
  };
}
function makeMath(open, close, mode) {
  return function math(state, silent) {
    let startCount,
      found,
      res,
      token,
      closeDelim,
      max = state.posMax,
      start = state.pos,
      openDelimMatch = state.src.slice(start, max).match(open);

    if (!openDelimMatch) return false;
    let openDelim = openDelimMatch[0];
    if (silent) return false; // Don’t run any pairs in validation mode

    res = scanInlineDelims(state, start, openDelim.length, (mode === 'display'));
    startCount = res.delims;

    if (!res.can_open) {
      state.pos += startCount;
      // Earlier we checked !silent, but this implementation does not need it
      state.pending += state.src.slice(start, state.pos);
      return true;
    }

    state.pos = start + openDelim.length;

    while (state.pos < max) {
      let match = state.src.slice(state.pos).match(close(openDelim));
      if (match) {
        // console.log(openDelim, close(openDelim), match);
        closeDelim = match[0];
        res = scanInlineDelims(state, state.pos, closeDelim.length, (mode === 'display'));
        if (res.can_close) {
          found = true;
          break;
        }
      }
      state.md.inline.skipToken(state);
    }

    if (!found) {
      // Parser failed to find ending tag, so it is not a valid math
      state.pos = start;
      return false;
    }

    // Found!
    state.posMax = state.pos;
    state.pos = start + openDelim.length;

    // Earlier we checked !silent, but this implementation does not need it
    token = state.push('math_' + mode, 'math', 0);
    token.content = state.src.slice(state.pos, state.posMax);

    if (openDelim.match(/^\\begin/) && closeDelim.match(/^\\end\{(.*)\}/)) {
      token.content = openDelim + token.content + closeDelim
    }

    if (token.content.match(/\\(begin\{(align|equation)\}|label)(.*)/)) {
      state.env.global_equation_index += 1;
      token.equation_index = state.env.global_equation_index;
    }

    token.markup = open;

    state.pos = state.posMax + closeDelim.length;
    state.posMax = max;

    return true;
  };
}

export default function markdownItMathjax(md, options) {
  "use strict";
  // Default options
  options = typeof options === 'object' ? options : {};
  const inlineOpen = /^(\$|\\\()/,
    inlineClose = (o) => ({$: /^\$/, '\\(': /^\\\)/}[o]),
    displayOpen = /^(\$\$|\\\[|\\begin\{(\s*)([A-z0-9]*)(\s*)})/,
    displayClose = (o) => (
    {'$$': /^\$\$/, '\\[': /^\\\]/}[o]
    // todo: need to allow space in closing bracket.
    || new RegExp('^' + o.replace('begin', 'end')
      .replace(/\\/g, '\\\\')
      .replace(/\s/g, '')
      .replace('{', '\\{(\\s*)')
      .replace('}', '(\\s*)}')));


  function renderer(tokens, idx) {
    return tokens[idx].content;
  }

  let math_inline = makeMath(inlineOpen, inlineClose, 'inline');
  let math_display = makeMath(displayOpen, displayClose, 'display');

  /* configure the global parser */
  md.inline.ruler.before('escape', 'math_inline', math_inline);
  md.inline.ruler.before('math_inline', 'math_display', math_display);
  md.renderer.rules.math_inline = renderer;
  md.renderer.rules.math_display = renderer;
}
