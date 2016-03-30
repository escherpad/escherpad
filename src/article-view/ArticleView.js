/** Created by ge on 3/9/16. */
import React from 'react';
import Radium from 'radium';

@Radium
export default class ArticleView extends React.Component {
  static propTypes = {
    //html: React.PropTypes.string,
    //style: React.PropTypes.any.isRequired
  };

  defaultStyle = {
    backgroundColor: "gray"
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className="article-view" style={[this.defaultStyle, this.props.style]}
           dangerouslySetInnerHTML={{__html: "<h1>some title</h1>"}}></div>
    );
  }
}
