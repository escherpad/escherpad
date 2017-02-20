/** Created by ge on 2/19/17. */
import React, {Component} from 'react';
import Mathjax from './Mathjax';

function current(s) {
  return s[s.length - 1]
}
function down(s, content) {
  "use strict";
  let new_level = content ? [content] : [];
  current(s).push(new_level);
  s.push(new_level);
  return new_level;
}

function up(s) {
  "use strict";
  s.pop();
  return current(s).pop();
}


const html = {
  self_close: (s) => (
    s.match(/(.*)\/>$/) ||
    s.match(/^<(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)(\s|>|\/)/)
  ),
  closing: (s) => s.match(/^<\/(.*)/)
};

export function attr2props(attrs) {
  "use strict";
  let props = {};
  attrs.forEach((attr, ind) => {
    if (attr[0] === "class") props.className = attr[1];
    else props[attr[0]] = attr[1];
  });
  return props;
}

const inline = {
  text: ({tag:Tag, content}, ind) => (<span key={ind}>{content}</span>),
  image: (token, ind) => <img key={token.map || ind} alt={token.content} {...attr2props(token.attrs)}/>,
  emoji: ({tag: Tag, content}, ind) => (<span key={ind}>{content}</span>),
  code_inline: ({tag:Tag, content}, ind) => (<Tag key={ind}>{content}</Tag>),
  math_inline: ({tag:Tag, content, equation_index}, ind) => (<Mathjax key={ind} alt={content} number={equation_index}/>)//todo:
};

const inlineBlock = {
  link: [],
  strong: [],
  em: [],
  s: [],
  mark: [],
  a: [],
};
export function Inline2React(s) {
  let context = {};
  return function inline2React(token, ind) {
    "use strict";
    if (token.type.match('strike')) console.log(token);
    if (context.htmlBlock) {
      current(s).push(token.content);
      if (html.closing(token.content)) {
        let html = up(s);
        current(s).push(<span key={ind} dangerouslySetInnerHTML={{__html: html.join('')}}/>);
        context.htmlBlock = false
      }
    } else if (token.type.match('html_inline')) {
      if (html.self_close(token.content)) {
        current(s).push(<span key={ind} dangerouslySetInnerHTML={{__html: token.content}}/>);
      } else if (!html.closing(token.content)) {
        down(s, token.content);
        context.htmlBlock = true
      }
    } else if (inline[token.type]) {
      current(s).push(inline[token.type](token, ind))
    } else if (token.type.match(/_open$/)) {
      down(s, token);
    } else if (token.type.match(/_close$/) && inlineBlock[token.type.slice(0, -6)]) {
      let children = up(s);
      let props = children[0].attrs ?
        {key: ind, ...attr2props(children[0].attrs)} :
        {key: ind};
      current(s).push(React.createElement(token.tag, props, children.length >= 1 ? children.slice(1) : null))
    }
  }
}

const blocks = {
  hr: (token, ind) => <hr key={ind}/>,
  fence: (token, ind) => <pre key={token.map || ind}><code
    className={"lang-" + token.info}>{token.content}</code></pre>,
  image: {},
  footnote_anchor: {tag: "span"}
};
const blockContainers = {
  heading: {},
  paragraph: (token, children, ind) => <p key={token.map || ind}{...{className: "paragraph"}}>{children}</p>,
  bullet_list: {},
  ordered_list: {},
  definition_list: {},
  list_item: {},
  table: {},
  thead: {},
  tbody: {},
  tr: {},
  th: {},
  td: {},
  toc: {},
  footnote: {tag: "span"},
  footnote_block: {tag: "span"},
};


export function Block2React(s) {
  let context = {};
  return function block2React(token, ind) {
    "use strict";
    if (context.htmlBlock) {
      current(s).push(token.content);
      if (html.closing(token.content)) {
        let htmls = up(s);
        current(s).push(<span key={ind} dangerouslySetInnerHTML={{__html: htmls.join('')}}/>);
        context.htmlBlock = false
      }
    } else if (token.type.match('html_block')) {
      if (html.self_close(token.content)) {
        current(s).push(<span key={ind} dangerouslySetInnerHTML={{__html: token.content}}/>);
      } else if (!html.closing(token.content)) {
        down(s, token.content);
        context.htmlBlock = true
      }
    } else if (token.type.match(/_open$/)) {
      down(s, token);
    } else if (token.type.match(/_close/) && blockContainers[token.type.slice(0, -6)]) {
      let config = blockContainers[token.type.slice(0, -6)];
      let children = up(s);
      let props = children[0].attrs ? attr2props(children[0].attrs) : {};
      current(s).push(typeof config === "function" ?
        config(children[0], children.slice(1), ind)
        : React.createElement(
          config.tag || token.tag,
          {
            ...props,
            key: token.map || ind, ...config.props
          },
          children.length >= 1 ? children.slice(1) : null
        ));
    } else if (blocks[token.type]) {
      let config = blocks[token.type];
      let props = token.attrs ? attr2props(token.attrs) : {};
      current(s).push(typeof config === "function" ?
        config(token, ind)
        : React.createElement(
          config.tag || token.tag,
          {
            ...props,
            key: token.map || ind, ...config.props
          },
          token.content
        ));
    } else if (token.type == "inline") {
      let children = token.children;
      // if (children.length > 0 && !Component.prototype.isPrototypeOf(children[0].prototype)) {
      //   children = children.slice(1)
      // }
      children.forEach(Inline2React(s));
    }
  };
}


export default function ast2React(ast) {
  let s = [[]];
  ast.forEach(Block2React(s));
  return s[0];
}
