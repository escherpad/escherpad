import React, {Component} from "react";
import If from "../../../If";
import {Row, Width} from 'layout-components';
import TextShadow from "../../../styling/TextShadow";

import ConnectToService from "./ConnectToService";
import ChooseAService from "./ChooseAService";

export default class PostServiceInfoView extends Component {
  componentWillMount() {
    this.setState({showChooseService: false});
  }

  toggleChooseService() {
    var {showChooseService} = this.state;
    showChooseService = !showChooseService;
    this.setState({showChooseService});
  }

  render() {
    var {post, accountList, dispatch, ..._props} = this.props;
    var {showChooseService} = this.state;
    return (
      <div className="post-service-info-view">
        <Row component="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
          color="#23aaff"><span>Service</span></TextShadow></Row>
        <Row component="div">
          <Width width="40%" component="div">{"dropbox"}</Width>
          <Width width="60%" component="div" onClick={this.toggleChooseService.bind(this)}>{"show other services"}</Width>
        </Row>
        <Row component="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow color="#23aaff"><span>Dropbox File uid</span></TextShadow></Row>
        <div>id:sdfasddfasfdasdfa</div>
        <Row component="div" style={{fontSize: "20px", marginTop: "24px"}}><TextShadow
          color="#23aaff"><span>Path</span></TextShadow></Row>
        <a href="https://www.dropbox.com/contents/asdfasdfsafas">/test_folder2/test_folder3/new_note.json</a>
        <div className="current-service">
          <If ifData={showChooseService}>
            <div data-ifValue={true} className="choose-service-view">
              <ChooseAService {...this.props}></ChooseAService>
              <ConnectToService {...this.props}></ConnectToService>
            </div>
            <div data-ifDefault className="placeholder"></div>
          </If>
        </div>
      </div>
    );
  }
}
