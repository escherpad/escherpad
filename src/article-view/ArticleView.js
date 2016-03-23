/** Created by ge on 3/9/16. */
import React from 'react';
import Radium from 'radium';

@Radium
export default class ArticleView extends React.Component {
  static propTypes = {
    style: React.PropTypes.any.isRequired
  };

  defaultStyle = {
    backgroundColor: "gray"
  };

  get style() {
    if (this.props) return [this.defaultStyle, this.props.style];
    return this.defaultStyle;
  }

  set style(value) {}

  constructor() {
    super();
  }

  render() {
    return (
      <div className="article-view" style={this.style}></div>
    );
  }
}
