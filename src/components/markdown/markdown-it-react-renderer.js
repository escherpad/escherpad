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

const tag = {
  self_close: (s) => s.match(/^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)/)
};

export function attr2props(attrs) {
  "use strict";
  let props = {};
  attrs.forEach((attr, ind) => {
    if (attr[0] === "class") props.className = attr[1];
    else if (attr[0] === "ref") props.name = attr[1];
    else props[attr[0]] = attr[1];
  });
  return props;
}

const defaultInlineComponent = ({tag:Tag, type, content}, ind) => {
  if (!Tag) Tag = "span";
  let key = type + "$" + ind;
  if (tag.self_close(Tag)) return <Tag key={key}/>;
  else return <Tag key={key}>{content}</Tag>;
};
const inline = {
  text: defaultInlineComponent,
  image: (token, ind) => <img key={token.type + "$" + ind} alt={token.content} {...attr2props(token.attrs)}/>,
  emoji: ({tag: Tag, type, content}, ind) => (<span key={type + "$" + ind}>{content}</span>),
  code_inline: ({tag:Tag, type, content}, ind) => (<Tag key={type + "$" + ind}>{content}</Tag>),
  softbreak: (t, ind) => <span key={"softbreak$" + ind}/>, // or () => `null`
  hardbreak: defaultInlineComponent,
  // done: add math_display component
  math_inline: ({tag:Tag, type, content, equation_index}, ind) => (
    <Mathjax key={type + "$" + ind} alt={content} number={equation_index}/>),
  math_display: ({tag:Tag, type, content, equation_index}, ind) => (
    <Mathjax key={type + "$" + ind} alt={content} number={equation_index} mode="display"/>),
  footnote_ref: defaultInlineComponent
};

const inlineContainer = {
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
        current(s).push(<span key={token.type + "$" + ind} dangerouslySetInnerHTML={{__html: html.join('')}}/>);
        context.htmlBlock = false
      }
    } else if (token.type.match('html_inline')) {
      if (html.self_close(token.content)) {
        current(s).push(<span key={token.type + "$" + ind} dangerouslySetInnerHTML={{__html: token.content}}/>);
      } else if (!html.closing(token.content)) {
        down(s, token.content);
        context.htmlBlock = true
      }
    } else if (inline[token.type]) {
      current(s).push(inline[token.type](token, ind))
    } else if (token.type.match(/_open$/)) {
      down(s, token);
    } else if (token.type.match(/_close$/) && inlineContainer[token.type.slice(0, -6)]) {
      let children = up(s);
      let props = children[0].attrs ?
        {key: ind, ...attr2props(children[0].attrs)} :
        {key: ind};
      current(s).push(React.createElement(token.tag, props, children.length >= 1 ? children.slice(1) : null))
    }
  }
}

const blocks = {
  hr: (token, children, ind) => <hr key={token.type + "$" + ind}/>,
  code_block: defaultBlockComponent,
  fence: ({tag:Tag, type, attrs, info, map, content}, children, ind) => {
    "use strict";
    let key = type + "$" + ind + (map ? "L" + map[0] : "");
    return <pre key={key}><code className={"lang-" + info}>{content}</code></pre>
  },
  image: defaultBlockComponent,
  footnote_anchor: defaultBlockComponent
};

function defaultBlockComponent(token, children, ind) {
  "use strict";
  let {tag: Tag, type, attrs, map, content} = token;
  let props = attrs ? attr2props(attrs) : {};
  if (!Tag) Tag = "span";
  let key = type + "$" + ind + (map ? "L" + map[0] : "");
  if (tag.self_close(Tag)) return <Tag key={key} {...props}/>;
  return <Tag key={key} alt={content} {...props}>{children}</Tag>;
}
const blockContainers = {
  heading: defaultBlockComponent,
  paragraph: (token, children, ind) => <p
    key={token.type + "$" + ind + (token.map ? "L" + token.map[0] : "")}{...{className: "paragraph"}}>{children}</p>,
  blockquote: defaultBlockComponent,
  bullet_list: defaultBlockComponent,
  ordered_list: defaultBlockComponent,
  definition_list: defaultBlockComponent,
  list_item: defaultBlockComponent,
  table: defaultBlockComponent,
  thead: defaultBlockComponent,
  tbody: defaultBlockComponent,
  tr: defaultBlockComponent,
  th: defaultBlockComponent,
  td: defaultBlockComponent,
  toc: defaultBlockComponent,
  footnote: defaultBlockComponent,
  footnote_block: defaultBlockComponent,
};


export function Block2React(s) {
  let context = {};
  return function block2React(token, ind) {
    "use strict";
    if (context.htmlBlock) {
      current(s).push(token.content);
      if (html.closing(token.content)) {
        let htmls = up(s);
        current(s).push(<span key={token.type + "$" + ind + (token.map ? "L" + token.map[0] : "")}
                              dangerouslySetInnerHTML={{__html: htmls.join('')}}/>);
        context.htmlBlock = false
      }
    } else if (token.type.match('html_block')) {
      if (html.self_close(token.content)) {
        current(s).push(<span key={token.type + "$" + ind + (token.map ? "L" + token.map[0] : "")}
                              dangerouslySetInnerHTML={{__html: token.content}}/>);
      } else if (!html.closing(token.content)) {
        down(s, token.content);
        context.htmlBlock = true
      }
    } else if (token.type.match(/_open$/)) {
      down(s, token);
    } else if (token.type.match(/_close/) && blockContainers[token.type.slice(0, -6)]) {
      let component = blockContainers[token.type.slice(0, -6)];
      let children = up(s);
      current(s).push(component(children[0], children.slice(1), ind));
    } else if (blocks[token.type]) {
      let component = blocks[token.type];
      current(s).push(component(token, null, ind));
    } else if (token.type == "inline") {
      let children = token.children;
      children.forEach(Inline2React(s));
    }
  };
}


export default function ast2React(ast) {
  let s = [[]];
  ast.forEach(Block2React(s));
  return s[0];
}
