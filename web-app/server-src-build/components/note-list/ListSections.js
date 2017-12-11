"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral([""], [""]);

exports.default = ListSections;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _layoutComponents = require("layout-components");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _NoteItem = require("./NoteItem");

var _NoteItem2 = _interopRequireDefault(_NoteItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.FlexItem)(_templateObject);
function ListSections(props) {
    var listItems = [{ title: "some note", path: "/escherpad files/notes-1", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-2", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-3", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-4", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-5", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-6", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-7", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-8", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-9", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-10", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-11", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-12", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }, { title: "some note", path: "/escherpad files/notes-13", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0'] }];
    return _react2.default.createElement(
        Styled,
        _extends({ component: _layoutComponents.Flex, fill: true, column: true }, props),
        listItems.map(function (_ref) {
            var dateModified = _ref.dateModified,
                note = _objectWithoutProperties(_ref, ["dateModified"]);

            return _react2.default.createElement(_layoutComponents.FlexItem, _extends({ component: _NoteItem2.default, key: note.path, date: dateModified }, note));
        })
    );
}
//# sourceMappingURL=ListSections.js.map