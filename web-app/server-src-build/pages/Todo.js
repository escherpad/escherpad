'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    font-family: \'Lato\', sans-serif;\n    color: white;\n    // cursor: auto;\n    input {\n        color: white; // this updated the cursor color as well.\n    }\n    *:focus::placeholder, *:hover::placeholder {\n        color: rgba(255, 255, 255, 0.4);\n    }\n    *::placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    *:active, *:focus {\n        outline: none\n    }\n'], ['\n    font-family: \'Lato\', sans-serif;\n    color: white;\n    // cursor: auto;\n    input {\n        color: white; // this updated the cursor color as well.\n    }\n    *:focus::placeholder, *:hover::placeholder {\n        color: rgba(255, 255, 255, 0.4);\n    }\n    *::placeholder {\n        color: rgba(255, 255, 255, 0.8);\n    }\n    *:active, *:focus {\n        outline: none\n    }\n']);

exports.default = Escherpad;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFade = require('react-fade');

var _reactFade2 = _interopRequireDefault(_reactFade);

var _layoutComponents = require('layout-components');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactHelmet = require('react-helmet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// dev only
var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);

function Separator() {
    return _react2.default.createElement(
        _layoutComponents.FlexItem,
        { style: { margin: "0 15px" } },
        '/'
    );
}

function Escherpad(props) {
    var listSections = [];
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true, style: { backgroundImage: "linear-gradient(-40deg, #9710D5, #FF6A1A)" } },
        _react2.default.createElement(
            _reactHelmet.Helmet,
            null,
            _react2.default.createElement(
                'title',
                null,
                'Todo List'
            )
        ),
        _react2.default.createElement(
            'div',
            { style: { width: "700px", margin: "0 auto" } },
            _react2.default.createElement('input', { style: {
                    fontSize: '2.5em',
                    fontWeight: '200',
                    marginTop: '250px',
                    marginBottom: '25px',
                    border: "none",
                    borderBottom: "dotted 1px rgba(255, 255, 255, 0.8)",
                    backgroundColor: "transparent",
                    width: "100%"
                },
                placeholder: 'What needs to be done?' }),
            _react2.default.createElement(
                _layoutComponents.Flex,
                { row: true, style: { fontSize: "1.25em", fontWeight: "300", marginBottom: "25px" } },
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    null,
                    'All'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    null,
                    'Active'
                ),
                _react2.default.createElement(Separator, null),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    null,
                    'Completed'
                ),
                _react2.default.createElement(_layoutComponents.FlexSpacer, null),
                _react2.default.createElement(
                    _layoutComponents.FlexItem,
                    null,
                    'Everyone'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'list-box' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Escherpad'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[ ] @cha redux file system'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[ ] @cha add `https` support'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge fix page title (use helmet)'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge add dynamic layout to editor'
                ),
                _react2.default.createElement(
                    'h3',
                    { style: { marginTop: "2em" } },
                    'Findr'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge figure out what source to search for'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge figure out what add view-model for those'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge client-side only arxiv search?'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '[x] @ge figure out a way to save the results (as special markdown type under /Findr/query_name.fnd.md)'
                )
            )
        )
    );
}
//# sourceMappingURL=Todo.js.map