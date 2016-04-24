/** Created by ge on 4/15/16.
 *
 * options:
 *  - `value`, `cursorPosition`, and `version` are set simultaneously when there is a change.
 *  - `onChange` handler receives `value`, `cursor`, and `version` as the input.
 *  -
 * */
import ace from 'brace';
import React, {Component, PropTypes} from 'react';

const editorOptions = [
  'minLines',
  'maxLines',
  'readOnly',
  'highlightActiveLine',
  'tabSize',
  'enableBasicAutocompletion',
  'enableLiveAutocompletion',
  'enableSnippets '
];

export default class ReactAce extends Component {
  constructor(props) {
    super(props);
    [
      'onChange',
      'onFocus',
      'onBlur',
      'onCopy',
      'onPaste',
      'onChangeCursor',
      'onChangeSelection',
      'onChangeScrollTop'
    ]
      .forEach(method => {
        this[method] = this[method].bind(this);
      });
  }

  componentDidMount() {

    const {
      name,
      onBeforeLoad,
      mode,
      version,
      theme,
      fontSize,
      lineHeight,
      scrollMargin,
      value,
      cursorPosition,
      showGutter,
      wrapEnabled,
      showPrintMargin,
      keyboardHandler,
      onLoad,
      commands,
    } = this.props;

    this.setVersion(version);
    this.editor = ace.edit(name);

    if (onBeforeLoad) {
      onBeforeLoad(ace);
    }

    const editorProps = Object.keys(this.props.editorProps);
    for (let i = 0; i < editorProps.length; i++) {
      this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
    }

    this.editor.getSession().setMode(`ace/mode/${mode}`);
    this.editor.setTheme(`ace/theme/${theme}`);
    this.editor.setFontSize(fontSize);
    this.setValue(value, cursorPosition);
    // editor.session.doc.positionToIndex(editor.selection.getCursor())
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.getSession().setUseWrapMode(wrapEnabled);
    this.editor.setShowPrintMargin(showPrintMargin);
    this.editor.on('focus', this.onFocus);
    this.editor.on('blur', this.onBlur);
    this.editor.on('copy', this.onCopy);
    this.editor.on('paste', this.onPaste);
    this.editor.on('change', this.onChange);
    this.editor.selection.on('changeCursor', this.onChangeCursor);
    this.editor.selection.on('changeSelection', this.onChangeSelection);
    this.editor.getSession().on('changeScrollTop', this.onChangeScrollTop);

    for (let i = 0; i < editorOptions.length; i++) {
      const option = editorOptions[i];
      this.editor.setOption(option, this.props[option]);
    }

    if (Array.isArray(commands)) {
      commands.forEach((command) => {
        this.editor.commands.addCommand(command);
      });
    }

    if (keyboardHandler) {
      this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler);
    }
    if (typeof lineHeight !== 'undefined') {
      this.updateLineHeight(lineHeight);
    }
    if (typeof scrollMargin !== 'undefined') {
      this.updateScrollMargin(scrollMargin);
    }


    if (onLoad) {
      onLoad(this.editor);
    }
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentWillReceiveProps(nextProps) {
    var oldProps = this.props;
    let {version} = nextProps;

    for (let i = 0; i < editorOptions.length; i++) {
      const option = editorOptions[i];
      if (nextProps[option] !== oldProps[option]) {
        this.editor.setOption(option, nextProps[option]);
      }
    }
    if (nextProps.lineHeight !== oldProps.lineHeight)
      this.updateLineHeight(nextProps.lineHeight);
    if (nextProps.scrollMargin !== oldProps.scrollMargin)
      this.updateScrollMargin(nextProps.scrollMargin);
    if (nextProps.width !== oldProps.width || nextProps.height !== oldProps.height)
      this.editor.resize();

    if (nextProps.mode !== oldProps.mode) {
      this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
    }
    if (nextProps.theme !== oldProps.theme) {
      this.editor.setTheme('ace/theme/' + nextProps.theme);
    }
    if (nextProps.fontSize !== oldProps.fontSize) {
      this.editor.setFontSize(nextProps.fontSize);
    }
    if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
      this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
    }
    if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
      this.editor.setShowPrintMargin(nextProps.showPrintMargin);
    }
    if (nextProps.showGutter !== oldProps.showGutter) {
      this.editor.renderer.setShowGutter(nextProps.showGutter);
    }
    // if (version is not a number), just do the usual thing. If is, use for comparison.
    if (typeof version === "number" && version <= this.version) {
      // use this version number to avoid oscillation.
    } else if (this.editor.getValue() !== nextProps.value) {
      if (nextProps.cursorPosition) this.setValue(nextProps.value, nextProps.cursorPosition, version);
      else this.setValue(nextProps.value, this.editor.selection.getCursor(), version);
    } else if (nextProps.cursorPosition) {
      // let old = oldProps.cursorPosition;
      let old = this.editor.selection.getCursor();
      let next = nextProps.cursorPosition;
      if (!old || old.row + ',' + old.column !== next.row + ',' + next.column) {
        this.setCursor(next);
        this.setVersion(version);
      }
    }
  }

  componentWillUnmount() {
    this.editor.off('focus', this.onFocus);
    this.editor.off('blur', this.onBlur);
    this.editor.off('copy', this.onCopy);
    this.editor.off('paste', this.onPaste);
    this.editor.off('change', this.onChange);
    this.editor.selection.off('changeCursor', this.onChangeCursor);
    this.editor.selection.off('changeSelection', this.onChangeSelection);
    this.editor.getSession().off('changeScrollTop', this.onChangeScrollTop);
    this.editor.destroy();
    this.editor = null;
  }

  setVersion(version) {
    if (typeof version !== "number") version = 0;
    this.version = version;
  }

  setValue(value, cursorPosition, silent = true, version) {
    // editor.setValue is a synchronous function call, change event is emitted before setValue return. This way we can prevent the changeCursor event from firing.
    var old = this._silent;
    this._silent = silent;
    this.editor.setValue(value, 1); //this sets the start to beginning of the document.
    // moveCursor... is also a synchronous call. Change event is emitted before it returns.
    this.setCursor(cursorPosition);
    this.setVersion(version);
    this.editor.focus();
    this._silent = old;
  }

  focus() {
    this.editor.focus();
    return this;
  }

  // never needed
  getCursor() {
    return this.editor.session.getCursor();
  }

  setCursor({row=0, column=0} = {}, silent = true) {
    var old = this._silent;
    this._silent = silent;
    this.editor.moveCursorToPosition({row, column});
    this._silent = old;
  }

  clearSelection() {
    this.editor.session.selection.clearSelection();
  }

  getScrollTop() {
    return this.editor.session.getScrollTop();
  }

  getScrollerHeight() {
    return;
  }

  setScrollTop(scrollTop, silent = true) {
    var old = this._silent;
    this._silent = silent;
    this.editor.session.setScrollTop(scrollTop);
    this._silent = old;
  }

  updateLineHeight(height) {
    this.editor.container.style.lineHeight = height;
    this.editor.resize();
  }

  updateScrollMargin({top, bottom, left, right}) {
    this.editor.renderer.setScrollMargin(top, bottom, left, right);
    this.editor.resize();
  }

  onFocus() {
    if (!this.props.onFocus || this._silent) return;
    this.props.onFocus();
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onCopy(text) {
    if (!this.props.onCopy) return;
    this.props.onCopy(text);
  }

  onPaste(text) {
    if (!this.props.onPaste) return;
    this.props.onPaste(text);
  }

  onChange(e) {
    var cursor;
    if (e.action === "insert") {
      cursor = e.end;
    } else if (e.action === "remove") {
      cursor = e.start;
    } else {
      cursor = this.editor.selection.getCursor();
    }
    if (!this.props.onChange || this._silent) return;
    const value = this.editor.getValue();
    this.setVersion(this.version + 1);
    this.props.onChange(value, cursor, this.version);
  }

  onChangeCursor(e) {
    if (!this.props.onChange || this._silent) return;
    var value = this.editor.getValue();
    var cursor = this.editor.selection.getCursor();
    this.setVersion(this.version + 1);
    this.props.onChange(value, cursor, this.version);
  }

  onChangeSelection() {
    if (!this.props.onChangeSelection || this._silent) return;
    var selection = this.editor.getSelection();
    this.props.onChangeSelection(selection);
  }

  onChangeScrollTop(scrollTop) {
    if (!this.props.onChangeScrollTop || this._silent) return;
    this.props.onChangeScrollTop(scrollTop);
  }

  render() {
    const {name, className, width, height} = this.props;
    const divStyle = {width, height};
    return (
      <div
        id={name}
        className={className}
        style={divStyle}
        ref={(_)=>this.nativeElement=_}
      ></div>
    );
  }
}

ReactAce
  .propTypes = {
  mode: PropTypes.string,
  theme: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.number,
  showGutter: PropTypes.bool,
  onChange: PropTypes.func, // both `change` and `changeCursor` event go through this.
  onCopy: PropTypes.func,
  onPaste: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  cursorPosition: PropTypes.any,
  version: PropTypes.number,
  onLoad: PropTypes.func,
  onBeforeLoad: PropTypes.func,
  minLines: PropTypes.number,
  maxLines: PropTypes.number,
  readOnly: PropTypes.bool,
  highlightActiveLine: PropTypes.bool,
  tabSize: PropTypes.number,
  showPrintMargin: PropTypes.bool,
  editorProps: PropTypes.object,
  keyboardHandler: PropTypes.string,
  wrapEnabled: PropTypes.bool,
  enableBasicAutocompletion: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  enableLiveAutocompletion: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  commands: PropTypes.array,
};

ReactAce
  .defaultProps = {
  name: 'brace-editor',
  mode: '',
  theme: '',
  height: '500px',
  width: '500px',
  value: '',
  fontSize: 12,
  showGutter: true,
  onChange: null,
  onPaste: null,
  onLoad: null,
  minLines: null,
  maxLines: null,
  readOnly: false,
  highlightActiveLine: true,
  showPrintMargin: true,
  tabSize: 4,
  editorProps: {},
  wrapEnabled: false,
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
};

