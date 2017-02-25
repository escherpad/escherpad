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

function lisp2Camel(s) {
  let a = s.split('');
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "-") a[i + 1] = a[i + 1].toUpperCase()
  }
  return a.join('').replace('-', '');
}

function style2React(s) {
  "use strict";
  let styleString = lisp2Camel('{"' + s.replace(";", '","').replace(":", '":"') + '"}');
  return JSON.parse(styleString);
}

export function attrs2props(attrs) {
  "use strict";
  let props = {};
  attrs.forEach((attr, ind) => {
    if (attr[0] === "class") props.className = attr[1];
    else if (attr[0] === "ref") props.name = attr[1];
    else if (attr[0] === "style") props.style = style2React(attr[1]);
    else props[attr[0]] = attr[1];
  });
  return props;
}

const defaultInlineComponent = ({tag:Tag, type, content, attrs}, ind) => {
  if (!Tag) Tag = "span";
  let key = type + "$" + ind;
  let props;
  if (attrs) props = attrs2props(attrs);
  if (tag.self_close(Tag)) return <Tag key={key} {...props}/>;
  else return <Tag key={key} {...props}>{content}</Tag>;
};
const inline = {
  text: defaultInlineComponent,
  image: (token, ind) => <img key={token.type + "$" + ind} alt={token.content} {...attrs2props(token.attrs)}/>,
  emoji: ({tag: Tag, type, content}, ind) => (<span key={type + "$" + ind}>{content}</span>),
  code_inline: ({tag:Tag, type, content}, ind) => (<Tag key={type + "$" + ind}>{content}</Tag>),
  // always use space. CJK users can just avoid softbreaks for consistent behavior.
  softbreak: (t, ind) => <span key={t.type + "$" + ind} className={`softbreak softbreak-${ind}`}> </span>,
  hardbreak: defaultInlineComponent,
  // done: add math_display component
  math_inline: ({tag:Tag, type, content, equation_index}, ind) => (
    <Mathjax key={type + "$" + ind} alt={content} number={equation_index}/>),
  math_display: ({tag:Tag, type, content, equation_index}, ind) => (
    <Mathjax key={type + "$" + ind} alt={content} number={equation_index} mode="display"/>),
  footnote_ref: ({meta}, ind) => <sup className="footnote-ref" key={ind}><a id={"fnref" + meta.subId}
                                                                            href={"#fn" + meta.id}>{"[" + (meta.id + 1) + "]"}</a></sup>
};

const inlineContainer = {
  link: [],
  strong: [],
  em: [],
  s: [],
  mark: [],
  a: [],
};

export function Inline2React(s, child_ast) {
  let context = {};
  return function inline2React(token, ind) {
    "use strict";
    if (token.type.match('strike')) console.log(token);
    if (context.htmlBlock) {
      current(s).push(token.content);
      if (html.closing(token.content) || ind == (child_ast.length - 1)) {
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
        {key: ind, ...attrs2props(children[0].attrs)} :
        {key: ind};
      current(s).push(React.createElement(token.tag, props, children.length >= 1 ? children.slice(1) : null))
    }
  }
}

const blocks = {
  hr: (token, children, ind) => <hr key={token.type + "$" + ind}/>,
  code_block: defaultBlockComponent,
  fence: ({tag:Tag, type, attrs, info, map, content}, children, ind) => {
    let key = type + "$" + ind + (map ? "L" + map[0] : "");
    return <pre key={key}><code className={"lang-" + info}>{content}</code></pre>
  },
  image: defaultBlockComponent,
  footnote_anchor: (token, children, ind) => <a key={ind} className="footnote-backref"
                                                href={"#fnref" + token.meta.subId}>↩</a>
};

function defaultBlockComponent(token, children, ind) {
  "use strict";
  let {tag: Tag, type, attrs, map, content} = token;
  let props = attrs ? attrs2props(attrs) : {};
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
  list_item: defaultBlockComponent,
  dl: defaultBlockComponent,
  dt: defaultBlockComponent,
  dd: defaultBlockComponent,
  table: defaultBlockComponent,
  thead: defaultBlockComponent,
  tbody: defaultBlockComponent,
  tr: defaultBlockComponent,
  th: defaultBlockComponent,
  td: defaultBlockComponent,
  toc: defaultBlockComponent,
  footnote_block: (token, children, ind) => <section key={ind} className="footnotes">
    <ol className="footnote-list">{children}</ol>
  </section>,
  footnote: (token, children, ind) => <li key={ind} id={"fn" + token.meta.id} className="footnote-item">{children}</li>,
};


export function Block2React(s, ast) {
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
      children.forEach(Inline2React(s, children));
    }
  };
}


export default function ast2React(ast) {
  let s = [[]];
  ast.forEach(Block2React(s, ast));
  return s[0];
}
