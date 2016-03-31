/** Created by ge on 3/9/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

import Markdown from "../markdown/Markdown";

import {rootStore} from "../app/rootStore";
import {Saga} from "luna-saga";
import {previewProc} from "./preview";

export const saga = new Saga(previewProc);
rootStore.update$.subscribe(saga);
saga.action$.subscribe((action)=>rootStore.dispatch(action));
saga.thunk$.subscribe((thunk)=>rootStore.dispatch(thunk));
saga.run();

//rootStore.update$.subscribe((update)=> console.log('rootStore.update$ ====>', update));
//saga.log$.subscribe((log)=> console.log('saga.log$ ====>', log));
//saga.action$.subscribe((action)=> console.log('saga.action$ ====>', action));

@Radium
export default class ArticleView extends React.Component {
  static propTypes = {
    //html: React.PropTypes.string,
    //style: React.PropTypes.any.isRequired
  };

  defaultStyle = {
    //backgroundColor: "white"
    articleView: {
      boxSizing: "border-box",
      padding: "40px 100px 400px"
    },
    Markdown: {
    }
  };

  constructor() {
    super();
  }

  componentDidMount() {
    rootStore.select('preview').subscribe((preview)=> {
      this.rendered = preview.rendered;
      this.forceUpdate();
    })
  }

  render() {
    return (
      <div className="article-view" style={[this.defaultStyle.articleView, this.props.style]}>
        <Markdown html={this.rendered} style={this.defaultStyle.Markdown}></Markdown>
      </div>
    );
  }
}
