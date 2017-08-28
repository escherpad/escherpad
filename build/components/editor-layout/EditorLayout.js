'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    font-family: \'Lato\', sans-serif;\n'], ['\n    font-family: \'Lato\', sans-serif;\n']);

exports.default = EditorLayout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFade = require('react-fade');

var _reactFade2 = _interopRequireDefault(_reactFade);

var _layoutComponents = require('layout-components');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
function EditorLayout(props) {
    var teamNavBar = props.teamNavBar,
        bindrBar = props.bindrBar,
        listHeader = props.listHeader,
        listHero = props.listHero,
        listLeftButton = props.listLeftButton,
        listRightButton = props.listRightButton,
        listTabs = props.listTabs,
        listSections = props.listSections,
        editorHeader = props.editorHeader,
        editorTitleBar = props.editorTitleBar,
        editorBody = props.editorBody,
        editorFooter = props.editorFooter;

    return _react2.default.createElement(
        Styled,
        _extends({ fill: true, row: true }, props),
        _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: teamNavBar }),
        _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: bindrBar }),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true, component: _layoutComponents.Flex, column: true, className: 'list-panel', style: { width: "400px" } },
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: listHeader }),
            _react2.default.createElement(
                _layoutComponents.FlexItem,
                { fixed: true, component: _layoutComponents.Flex, row: true },
                _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: listLeftButton }),
                _react2.default.createElement(_layoutComponents.FlexItem, { fluid: true, component: listHero }),
                _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: listRightButton })
            ),
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: listTabs }),
            listSections.map(function (section, i) {
                return _react2.default.createElement(_layoutComponents.FlexItem, { key: i, fixed: true, component: section });
            })
        ),
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true, component: _layoutComponents.Flex, column: true },
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: editorHeader }),
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: editorTitleBar }),
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: editorBody }),
            _react2.default.createElement(_layoutComponents.FlexItem, { fixed: true, component: editorFooter })
        )
    );
}
//# sourceMappingURL=EditorLayout.js.map