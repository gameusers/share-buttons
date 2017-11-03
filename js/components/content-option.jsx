// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import { Model } from '../models/model';



class ContentOption extends React.Component {


  // --------------------------------------------------
  //   Validation State
  //   フォームの入力値ガ正しい場合は success（緑色）
  //   間違っている場合は error（赤色）
  // --------------------------------------------------

  validationStateRssUrl() {
    let state = 'error';
    if (!this.props.rssUrl || this.props.rssUrl.match(/^(https?)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/)) {
      state = 'success';
    }
    return state;
  }


  render() {
    return (
      <div>

        <p>
          すべてのシェアボタンに共通する設定をこちらで行うことができます。
        </p>


        <hr className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        <FormGroup controlId="option-php" bsClass="form-group-margin" validationState="success">
          <ControlLabel>PHP</ControlLabel>
          <FormControl
            componentClass="select"
            defaultValue={this.props.php}
          >
            <option value="1">使用する</option>
            <option value="0">使用しない</option>
          </FormControl>
          <HelpBlock>シェアボタンを設置するサーバーでPHPというプログラム言語が使える場合は「使用する」を選んでください。PocketとFeedlyのシェア数をPHP経由で取得します。PHPが使用できない場合はPocketとFeedlyのシェア数は取得できません。PocketまたはFeedlyのシェアボタンを使用しない場合は、この設定は気にしなくてかまいません。</HelpBlock>
        </FormGroup>


        <FormGroup controlId="option-twitter-api-type" bsClass="form-group-margin" validationState="success">
          <ControlLabel>Twitterのシェア数を取得する</ControlLabel>
          <FormControl
            componentClass="select"
            defaultValue={this.props.twitterApiType}
          >
            <option />
            <option value="digitiminimi.com/count.jsoon">digitiminimi.com/count.jsoon</option>
          </FormControl>
          <HelpBlock>Twitterでは公式にシェア数を取得することはできないのですが、<a href="http://jsoon.digitiminimi.com/" target="_blank" rel="noopener noreferrer">count.jsoon</a>というサービスに登録することで、シェア数を表示することができるようになります。サービスに登録済みの方は上記フォームで「digitiminimi.com/count.jsoon」を選んでください。<br /><br />登録されていない方は選ばないようにしてください。シェア数が取得できないのに取得しようとして、count.jsoonのサーバーに余計な負荷をかけることになってしまいます。</HelpBlock>
        </FormGroup>


        <FormGroup controlId="option-rss-url" bsClass="form-group-margin" bsSize="sm" validationState={this.validationStateRssUrl()}>
          <ControlLabel>RSS(ATOM) URL</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.props.rssUrl}
          />
          <HelpBlock>RSSとFeedlyのシェアボタンを利用するには、RSS(ATOM)のURLが必要になります。例）<a href="https://gameusers.org/dev/blog/feed" target="_blank" rel="noopener noreferrer">https://gameusers.org/dev/blog/feed</a></HelpBlock>
        </FormGroup>


        <div className="form-group-margin">
          <Button
            bsStyle="success"
            bsSize="sm"
            className="ladda-button outline-none"
            data-style="expand-right"
            onClick={e => this.props.funcAjaxSaveOption(this.props.stateModel, e.currentTarget)}
          >
            <span className="ladda-label">保存する</span>
          </Button>
        </div>

      </div>
    );
  }

}

ContentOption.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,

  php: PropTypes.number.isRequired,
  twitterApiType: PropTypes.string.isRequired,
  rssUrl: PropTypes.string.isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcAjaxSaveOption: PropTypes.func.isRequired


};


export default ContentOption;
