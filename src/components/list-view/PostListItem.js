/** Created by ge on 4/18/16. */
import React from "react";
import Radium from "radium";
import Placeholder from "../placeholder/Placeholder";
import moment from "moment";

require('./post-item.scss');

var {string, any, number, func} = React.PropTypes;
@Radium
export default class PostListItem extends React.Component {
  static propTypes = {
    id: string,
    title: string,
    source: string,
    presence: any,
    createdAt: number,
    modifiedAt: number,
    dispatch: func.isRequired
  };

  render() {
    var {
      id,
      title,
      source,
      presence,
      createdAt,
      modifiedAt
    } = this.props;


    var timeStamp;
    if (modifiedAt) timeStamp = moment(modifiedAt).fromNow();
    else if (createdAt) timeStamp = moment(createdAt).fromNow();
    else timeStamp = '';

    return (
      <div className="post-list-item"
           onTouchStart={this.selectPost.bind(this)}
           onMouseDown={this.selectPost.bind(this)}
      >
        <div className="control-group">
          <button onClick={this.deletePost.bind(this)}>
            <i className="material-icons delete-post">close</i>
          </button>
        </div>
        <Placeholder className="post-title"
                     style={{lineHeight: "22px", fontSize: "18px", fontWeight: "700"}}
                     isEmpty={(!title || title.replace(/(&nbsp;|<br>|<br\/>|<br><\/br>)/g, " ").trim() === "")}
                     placeholder={<em className="placeholder">Untitled</em>}
        >
          <div dangerouslySetInnerHTML={{__html: title}}></div>
        </Placeholder>
        <div className="modified-at">{timeStamp}</div>
      </div>
    )
  }

  selectPost() {
    this.props.dispatch({
      type: "SELECT_POST",
      post: this.props.id
    })
  }

  deletePost() {
    // now show a popup
    this.props.dispatch({
      type: "DELETE_POST",
      id: this.props.id
    })
  }

}

