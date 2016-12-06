/** Created by ge on 3/10/16. */
import React from 'react';
import {Flex, FlexItem, FlexHide, Responsive} from 'layout-components';
import MarkdownEditor from "../components/markdown-editor/MarkdownEditor";

import ListPanel from "../components/list-view/ListPanel";

const style = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSmoothing: "antialiased"
};

export default class MainEditorView extends React.Component {
  static propTypes = {
    store: React.PropTypes.any.isRequired
  };

  componentWillMount() {
    var {store} = this.props;
    this.subscription = store.select('viewMode').subscribe((viewMode)=> {
      this.setState({viewMode});
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    let {viewMode} = this.state;
    return (
      <Responsive breakPoints={{sm: 979, lg: Infinity}}>
        <div data-sm style={style}>
          <MarkdownEditor view="code" viewMode={viewMode} {...this.props}/>
        </div>
        <Flex data-lg row fill align="stretch" style={style}>
          <FlexHide fluid width={"300px"} hide={(viewMode === 'zen-mode')}>
            <ListPanel {...this.props}/>
          </FlexHide>
          <FlexItem fluid style={{flex: "8 8 auto"}}>
            {(viewMode == "zen-mode") ?
              <MarkdownEditor view="two-column" viewMode={viewMode} {...this.props}/> :
              <MarkdownEditor view="code" viewMode={viewMode} {...this.props}/>
            }
          </FlexItem>
        </Flex>
      </Responsive>
    );
  }
}
