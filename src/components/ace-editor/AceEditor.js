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
  'enableSnippets',
  'showInvisibles'
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
    if (theme) this.editor.setTheme(`ace/theme/${theme}`);
    this.editor.setFontSize(fontSize);
    this.setValue(value, cursorPosition, this.version, true);
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

    if (typeof keyboardHandler !== "undefined") {
      this.editor.setKeyboardHandler((keyboardHandler ? ('ace/keyboard/' + keyboardHandler) : ""));
    }
    if (typeof scrollMargin !== 'undefined') {
      this.updateScrollMargin(scrollMargin);
    }

    if (onLoad) {
      onLoad(this.editor);
    }
  }

  //note: timed to take less than 0.060 ms
  //and called a few times during input.
  componentWillReceiveProps(nextProps) {
    const oldProps = this.props;
    let {version} = nextProps;

    for (let i = 0; i < editorOptions.length; i++) {
      const option = editorOptions[i];
      if (nextProps[option] !== oldProps[option]) {
        this.editor.setOption(option, nextProps[option]);
      }
    }
    if (nextProps.scrollMargin !== oldProps.scrollMargin)
      this.updateScrollMargin(nextProps.scrollMargin);
    if (nextProps.width !== oldProps.width || nextProps.height !== oldProps.height)
      this.resize();

    if (nextProps.mode !== oldProps.mode) {
      this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
    }
    if (nextProps.keyboardHandler !== oldProps.keyboardHandler) {
      this.editor.setKeyboardHandler((nextProps.keyboardHandler ? ('ace/keyboard/' + nextProps.keyboardHandler) : ""));
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
      // console.warn("store update is rejected because version number is equal or less. Incoming version: ", version, "this version is:", this.version)
    } else if (this.editor.getValue() !== nextProps.value) {
      /* use this version number to avoid oscillation. */
      if (nextProps.cursorPosition) this.setValue(nextProps.value, nextProps.cursorPosition, version, true);
      else this.setValue(nextProps.value, this.editor.selection.getCursor(), version, true);
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

  setValue(value, cursorPosition, version = undefined, silent = true) {
    // editor.setValue is a synchronous function call, change event is emitted before setValue return. This way we can prevent the changeCursor event from firing.
    let old = this._silent;
    this._silent = silent;
    this.editor.setValue(value, 1); //this sets the start to beginning of the document.
    // moveCursor... is also a synchronous call. Change event is emitted before it returns.
    this.setCursor(cursorPosition);
    if (typeof version !== "undefined") this.setVersion(version);
    this._silent = old;
  }

  focus() {
    this.editor.focus();
    return this;
  }

  resize(timeout = 0) {
    setTimeout(this.editor.resize.bind(this.editor), timeout);
  }

  // never needed
  getCursor() {
    return this.editor.session.getCursor();
  }

  setCursor({row = 0, column = 0}={}, silent = true) {
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

  updateScrollMargin({top, bottom, left, right}) {
    this.editor.renderer.setScrollMargin(top, bottom, left, right);
    this.resize();
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
    //notice: relative order of change and changeCursor event changes depending on the edit action.
    // when inserting, changeCursor event fires after change event.
    // when removing, changeCursor event fires first.
    if (!this.props.onChange || this._silent) return;
    let cursor;
    if (e.action === "insert") {
      cursor = e.end;
    } else if (e.action === "remove") {
      cursor = e.start;
    } else {
      cursor = this.editor.selection.getCursor();
    }
    const value = this.editor.getValue();
    this.setVersion(this.version + 1);
    this.props.onChange(value, cursor, this.version);
    this._silent = false;
  }

  onChangeCursor(e) {
    if (!this.props.onChange || this._silent) return;
    let value = this.editor.getValue();
    let cursor = this.editor.selection.getCursor();
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

  shouldComponentUpdate(newProps) {
    return newProps.width !== this.props.width ||
      newProps.height !== this.props.height ||
      newProps.lineHeight !== this.props.lineHeight;
  }

  render() {
    //note: this should only execute when the size of the container changes. ref shouldComponentUpdate for detail
    const {name, className, width, height, lineHeight} = this.props;
    const divStyle = {width, height, lineHeight};
    return (
      <div
        id={name}
        className={className}
        style={divStyle}
        ref={(_) => this.nativeElement = _}
      />
    );
  }
}

const {string, number, bool, func, array, object, any, oneOfType} = PropTypes;
ReactAce
  .propTypes = {
  mode: string,
  theme: string,
  name: string,
  className: string,
  height: string,
  width: string,
  fontSize: number,
  lineHeight: number,
  showGutter: bool,
  onChange: func, // both `change` and `changeCursor` event go through this.
  onCopy: func,
  onPaste: func,
  onFocus: func,
  onBlur: func,
  value: string,
  cursorPosition: any,
  version: number,
  onLoad: func,
  onBeforeLoad: func,
  minLines: number,
  maxLines: number,
  readOnly: bool,
  highlightActiveLine: bool,
  tabSize: number,
  showPrintMargin: bool,
  editorProps: object,
  keyboardHandler: string,
  wrapEnabled: bool,
  enableBasicAutocompletion: oneOfType([
    bool,
    array,
  ]),
  enableLiveAutocompletion: oneOfType([
    bool,
    array,
  ]),
  commands: array,
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
  enableSnippets: false,
  showInvisibles: false
};

