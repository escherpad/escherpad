/** Created by ge on 2/19/17. */
function scanDelims(state, start, delimLength) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
    isLastWhiteSpace, isNextWhiteSpace,
    left_flanking = true,
    right_flanking = true,
    max = state.posMax,
    isWhiteSpace = state.md.utils.isWhiteSpace;

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : 0x20;

  if (pos >= max) {
    can_open = false;
  }

  pos += delimLength;

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? state.src.charCodeAt(pos) : 0x20;

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
function makeMath_inline(open, close) {
  return function math_inline(state, silent) {
    let startCount,
      found,
      res,
      token,
      closeDelim,
      max = state.posMax,
      start = state.pos,
      openDelim = state.src.slice(start, start + open.length);

    if (openDelim !== open) { return false; }
    if (silent) { return false; }    // Don’t run any pairs in validation mode

    res = scanDelims(state, start, openDelim.length);
    startCount = res.delims;

    if (!res.can_open) {
      state.pos += startCount;
      // Earlier we checked !silent, but this implementation does not need it
      state.pending += state.src.slice(start, state.pos);
      return true;
    }

    state.pos = start + open.length;

    while (state.pos < max) {
      closeDelim = state.src.slice(state.pos, state.pos + close.length);
      if (closeDelim === close) {
        res = scanDelims(state, state.pos, close.length);
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
    state.pos = start + close.length;

    // Earlier we checked !silent, but this implementation does not need it
    token = state.push('math_inline', 'math', 0);
    token.content = state.src.slice(state.pos, state.posMax);

    if (token.content.match(/\\(begin\{(align|equation)\}|label)(.*)/)) {
      state.env.global_equation_index += 1;
      token.equation_index = state.env.global_equation_index;
    }

    token.markup = open;

    state.pos = state.posMax + close.length;
    state.posMax = max;

    return true;
  };
}

export default function markdownItMathjax(md, options) {
  "use strict";
  // Default options
  options = typeof options === 'object' ? options : {};
  const inlineOpen = '$',
    inlineClose = '$';

  let inlineRenderer = function (tokens, idx) {
      return tokens[idx].content;
    };

  let math_inline = makeMath_inline(inlineOpen, inlineClose);

  /* configure the global parser */
  md.inline.ruler.before('escape', 'math_inline', math_inline);
  md.renderer.rules.math_inline = inlineRenderer;
}
