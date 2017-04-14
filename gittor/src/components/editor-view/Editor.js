/**
 * Editor View.
 * This is the scaffold view for the editor. attachments can be added via props.
 *
 * Created by ge on 1/12/17. */
import React, {Component, PropTypes} from "react";
import {Flex, FlexItem} from "layout-components";
import {autobind, debounce} from "core-decorators";

export default class EditorView extends Component {
  static propTypes = {
    titleDropdown: any,
    mimeTypeDropdown: any,
    // footer: any
    sourceEditor: any,
  };

  render() {
    return (

      <Flex column fill style={style}>
        <FlexItem fixed>
          <TitleBar post={post}
                    options={options} {...props}/>
        </FlexItem>
        <FlexItem fluid>
          <div className="editor-container">
            {this.props.sourceEditor}
          </div>
          <CodeEditor key={id}
                      ref={(_) => this.CodeEditor = _}
                      style={styles}
                      value={source}
                      cursorPosition={cursorPosition}
                      version={_v}
                      mimeType={type}
                      onChange={this.onChange}
                      onChangeScrollTop={onScroll} {...options}
          />
        </FlexItem>
      </Flex>
    );
  }

}
