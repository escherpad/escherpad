/** Created by ge on 12/27/16. */
import React, {PropTypes, Component} from "react";
const {number, object, array, oneOfType} =  PropTypes;

const COLOR_CLASSES = {
  info: 'notification-info',
  warning: 'notification-warning',
  success: 'notification-success',
  error: 'notification-error'
};

require('./notifications.scss');
function Notification({id, type, text, timeout, children, dispatch}) {
  "use strict";
  // todo: could potentially use text here
  return <div className={`notification-item ${COLOR_CLASSES[type]}`}>
    {children}
    <div className={`remove-button ${!!timeout ? "show-on-hover" : ""}`} onClick={() => dispatch({
      type: "NOTICE_DELETE",
      id
    })}>x
    </div>
  </div>
}

export default class Notifications extends Component {
  static propTypes = {
    maxNumber: number,
    data: oneOfType([object, array])
  };

  static defaultProps = {
    maxNumber: 3
  };

  render() {
    const {maxNumber, data, dispatch} = this.props;
    return <div className="notification-container">
      {(data && data.length) ?
        data.map((d) => <Notification key={d.id} id={d.id} text={d.text} type={d.type}
                                      dispatch={dispatch}>{d.text}</Notification>) : null
      }
    </div>
  }

}
