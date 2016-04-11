/** Created by ge on 4/9/16. */
/** Created by ge on 4/8/16. */
import React from 'react';
import Radium from 'radium';

import Markdown from '../markdown/Markdown';
require('./cursor.scss');

import {insertCursor} from "./insertCursor";

const defaultStyle = {};
@Radium
export default class MarkdownPreview extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    agent: React.PropTypes.any.isRequired,
    post: React.PropTypes.any.isRequired,
  };

  static defaultProps = {
    items: []
  };

  render() {
    let style = this.props.style;
    let post = this.props.post;
    let agent = this.props.agent;
    let sourceWithCursor;
    try {
      sourceWithCursor = insertCursor(post.source, post.presence[agent].cursor);
    } catch (e) {
      console.log('error: ', e);
      sourceWithCursor = post.source;
    }
    return (
      <Markdown style={[defaultStyle, style]} src={sourceWithCursor}
                placeholder={"this is a placeholder"}></Markdown>
    )
  }
}

