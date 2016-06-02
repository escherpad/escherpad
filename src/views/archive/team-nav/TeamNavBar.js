/** Created by ge on 4/18/16. */
import React from 'react';
import ReactDOM from 'react-dom';

require('./team-nav-bar.scss');
export default class TeamNavBar extends React.Component {
  static propTypes = {
    style: React.PropTypes.any,
    // store: React.PropTypes.any.isRequired,
    // dispatch: React.PropTypes.func.isRequired
  };

  render() {
    let style = this.props.style;
    return (
      <div className="team-navbar" style={style}>
        <a className="team-button"><span className="text">You</span></a>
        <a className="team-button"><span className="text">Es</span></a>
      </div>
    )
  }
}
