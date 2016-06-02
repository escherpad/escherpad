/** Created by ge on 5/15/16. */
export default function BadgeWithCtrol(props) {
  "use strict";
  var {className, style, icon, children, text, onClick, onIconClick} = props;
  return (
    <div className={"badge badge-with-control " + className}>
      {(text||children)}
      {(icon || (<i className="material-icons" onClick={onIconClick}></i>))}
    </div>
  )
}
