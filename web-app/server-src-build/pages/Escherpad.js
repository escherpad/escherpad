"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    font-family: 'Lato', sans-serif;\n"], ["\n    font-family: 'Lato', sans-serif;\n"]);

exports.default = Escherpad;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactHelmet = require("react-helmet");

var _layoutComponents = require("layout-components");

var _EditorLayout = require("../apps/Escherpad/EditorLayout");

var _EditorLayout2 = _interopRequireDefault(_EditorLayout);

var _TeamNavBar = require("../components/team-nav-bar/TeamNavBar");

var _TeamNavBar2 = _interopRequireDefault(_TeamNavBar);

var _BindrBar = require("../components/bindr-bar/BindrBar");

var _BindrBar2 = _interopRequireDefault(_BindrBar);

var _ListHeader = require("../components/note-list/ListHeader");

var _ListHeader2 = _interopRequireDefault(_ListHeader);

var _listHero = require("../components/note-list/list-hero");

var _ListTabs = require("../components/note-list/ListTabs");

var _ListTabs2 = _interopRequireDefault(_ListTabs);

var _ListSections = require("../components/note-list/ListSections");

var _ListSections2 = _interopRequireDefault(_ListSections);

var _EditorHeader = require("../components/editor/EditorHeader");

var _EditorHeader2 = _interopRequireDefault(_EditorHeader);

var _EditorTitleBar = require("../components/editor/EditorTitleBar");

var _EditorTitleBar2 = _interopRequireDefault(_EditorTitleBar);

var _EditorBody = require("../components/editor/EditorBody");

var _EditorBody2 = _interopRequireDefault(_EditorBody);

var _EditorFooter = require("../components/editor/EditorFooter");

var _EditorFooter2 = _interopRequireDefault(_EditorFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
function Escherpad(props) {
    var noteName = "E-MAML";
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true },
        _react2.default.createElement(
            _reactHelmet.Helmet,
            null,
            _react2.default.createElement(
                "title",
                null,
                "Escherpad | ",
                noteName
            )
        ),
        _react2.default.createElement(_EditorLayout2.default, { teamNavBar: _TeamNavBar2.default,
            bindrBar: _BindrBar2.default,
            listHeader: _ListHeader2.default,
            listLeftButton: _listHero.ListLeftButton,
            listHero: _listHero.ListHero,
            listRightButton: _listHero.ListRightButton,
            listTabs: _ListTabs2.default,
            listBody: _ListSections2.default,
            editorHeader: _EditorHeader2.default,
            editorTitleBar: _EditorTitleBar2.default,
            editorBody: _EditorBody2.default,
            editorFooter: _EditorFooter2.default })
    );
}
//# sourceMappingURL=Escherpad.js.map