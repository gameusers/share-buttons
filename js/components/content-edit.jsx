// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'alias-node-modules/react';
import PropTypes from 'alias-node-modules/prop-types';
import Button from 'alias-node-modules/react-bootstrap/lib/Button';
import ButtonToolbar from 'alias-node-modules/react-bootstrap/lib/ButtonToolbar';
import FormGroup from 'alias-node-modules/react-bootstrap/lib/FormGroup';
import ControlLabel from 'alias-node-modules/react-bootstrap/lib/ControlLabel';
import FormControl from 'alias-node-modules/react-bootstrap/lib/FormControl';
import Pagination from 'alias-node-modules/react-bootstrap/lib/Pagination';
import Accordion from 'alias-node-modules/react-bootstrap/lib/Accordion';
import Panel from 'alias-node-modules/react-bootstrap/lib/Panel';

import { List, Map } from 'alias-node-modules/immutable';

import { OFFICIAL_THEME_DESIGN_URL, instanceGameUsersShareButtonsOption, Model } from '../models/model';
import ContentEditForm from './content-edit-form';



class ContentEdit extends React.Component {


  /**
   * 記事の上部・下部に表示するシェアボタンを選択するフォーム
   * @return {array} コードの配列
   */
  codeSelectThemeOption() {

    const codeArr = [];

    this.props.editThemesList.valueSeq().forEach((themeNameId) => {
      codeArr.push(<option value={themeNameId} key={themeNameId}>{themeNameId}</option>);
    });

    return codeArr;

  }



  /**
   * 編集テーマの一覧を出力する
   * @return {array} コードの配列
   */
  renderShareButtonsEditThemes() {


    const codeArr = [];


    // --------------------------------------------------
    //   アップロードした画像をセット
    // --------------------------------------------------

    instanceGameUsersShareButtonsOption.setUploadImageObj(this.props.uploadImageOfficialMap);


    // --------------------------------------------------
    //   Mapを表示するページに合わせて切り取る
    // --------------------------------------------------

    const page = this.props.editThemesPage;
    let sliceBeginNum = 0;
    let sliceEndNum = 1;
    const themesList = this.props.editThemesList;

    sliceBeginNum = this.props.contentsNumberOfLines * (page - 1);
    sliceEndNum = sliceBeginNum + this.props.contentsNumberOfLines;

    const slicedThemesList = themesList.slice(sliceBeginNum, sliceEndNum);


    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    slicedThemesList.valueSeq().forEach((themeNameId) => {

      const checked = this.props.checkDownloadThemesList.includes(themeNameId);

      const btnTypeTop = this.props.topTheme === themeNameId ? 'warning' : 'default';
      const btnTypeBottom = this.props.bottomTheme === themeNameId ? 'warning' : 'default';

      const openedThemeType = this.props.dataEditThemesMap.getIn([themeNameId, 'openedThemeType']);

      let codeShareButtons = null;
      const dataMap = this.props.dataEditThemesMap.getIn([themeNameId, openedThemeType]);
      // console.log('themeNameId = ', themeNameId);

      // --------------------------------------------------
      //   シェアボタンのコード作成
      // --------------------------------------------------

      if (dataMap) {

        const dataObj = dataMap.toJS();
        instanceGameUsersShareButtonsOption.setJsonObj(dataObj);

        let themeUrl = null;

        if (this.props.pageType === 'official') {
          themeUrl = OFFICIAL_THEME_DESIGN_URL;
        }

        codeShareButtons = { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('edit', themeUrl, true) };

      }


      // --------------------------------------------------
      //   ワードプレスプラグインの場合
      //   トップテーマとボトムテーマを設定するボタンを表示する
      // --------------------------------------------------

      let buttonSetTopTheme = null;
      let buttonSetBottomTheme = null;

      if (this.props.pageType === 'wordPressPlugin') {

        buttonSetTopTheme = (
          <Button
            bsStyle={btnTypeTop}
            bsSize="xsmall"
            className="ladda-button buttons"
            data-style="slide-right"
            data-size="xs"
            data-spinner-color="#000000"
            onClick={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, e.currentTarget, 'top', themeNameId)}
          >
            <span className="ladda-label">Top</span>
          </Button>
        );

        buttonSetBottomTheme = (
          <Button
            bsStyle={btnTypeBottom}
            bsSize="xsmall"
            className="ladda-button buttons"
            data-style="slide-right"
            data-size="xs"
            data-spinner-color="#000000"
            onClick={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, e.currentTarget, 'bottom', themeNameId)}
          >
            <span className="ladda-label">Bottom</span>
          </Button>
        );

      }


      codeArr.push(
        <div className="theme-box" key={themeNameId}>
          <div className="menu-box">
            <div className="name-box">
              <FormControl
                type="checkbox"
                checked={checked}
                className="checkbox"
                onChange={() => this.props.funcCheckDownloadThemes(themeNameId)}
              />
              <div className="name">{themeNameId}</div>
            </div>
            <div className="button-box">
              <Button bsStyle="success" bsSize="xsmall" className="buttons" onClick={() => this.props.funcToggleEditForm(themeNameId)}>編集</Button>
              <Button
                bsStyle="info"
                bsSize="xsmall"
                className="ladda-button buttons"
                data-style="slide-right"
                data-size="xs"
                onClick={e => this.props.funcAjaxDeleteTheme(this.props.stateModel, e.currentTarget, themeNameId)}
              >
                <span className="ladda-label">削除</span>
              </Button>
              {buttonSetTopTheme}
              {buttonSetBottomTheme}
            </div>
          </div>
          <div id="game-users-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />
        </div>
      );

    });


    // --------------------------------------------------
    //   Pagination
    // --------------------------------------------------

    const items = Math.ceil(themesList.count() / this.props.contentsNumberOfLines);

    codeArr.push(
      <Pagination
        key="pagination"
        prev
        next
        first
        last
        ellipsis={false}
        boundaryLinks
        items={items}
        maxButtons={5}
        activePage={page}
        onSelect={e => this.props.funcChangeShareButtonsList(this.props.stateModel, 'editThemes', e)}
      />
    );

    return codeArr;

  }



  render() {
    return (
      <div>

        <p>
          シェアボタンの作成・編集が行えます。<br /><br />
          {this.props.pageType === 'official' ?
            '作成・編集したシェアボタンはこちらのタブでダウンロードして利用してください。'
            :
            'WordPressのプラグインからこのページにアクセスしている場合は、シェアボタンをダウンロードしなくても利用することができます。Top（記事の上部に表示するシェアボタン）・Bottom（記事の下部に表示するシェアボタン）と書かれたフォームで表示するシェアボタンを選択してください。'
          }
          <br /><br />※ シェアボタン作成フォームの「サンプルを画面上部に固定する」は、お使いのブラウザによっては機能しないことがあります。
        </p>


        <Accordion className="accordion-box">

          <Panel header="モバイル環境で綺麗に表示するには？" eventKey="1">
            スマートフォンやタブレットでは、通常の2倍の大きさの画像をアップロードすると綺麗に表示されます。例えば <strong>50 x 50</strong> の画像を表示したい場合は、 <strong>100 x 100</strong> の画像を利用してください。
          </Panel>

          <Panel header="Social Media 公式ロゴ" eventKey="2">
            シェアボタンの画像を作成する方のために、公式サイトのロゴをチェックできるページを紹介します。ぜひ参考にしてください。<br /><br />

            <ul className="list-top2">
              <li><a href="https://about.twitter.com/ja/company/brand-resources.html" target="_blank" rel="noopener noreferrer"><strong>Twitter</strong></a></li>
              <li><a href="https://en.facebookbrand.com/assets" target="_blank" rel="noopener noreferrer"><strong>Facebook</strong></a></li>
              <li><a href="https://developers.google.com/identity/branding-guidelines?hl=ja" target="_blank" rel="noopener noreferrer"><strong>Google+</strong></a></li>
              <li><a href="https://getpocket.com/publisher/button" target="_blank" rel="noopener noreferrer"><strong>Pocket</strong></a></li>
              <li><a href="https://business.pinterest.com/ja/brand-guidelines" target="_blank" rel="noopener noreferrer"><strong>Pinterest</strong></a></li>
              <li><a href="https://brand.linkedin.com/visual-identity/logo" target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong></a></li>
              <li><a href="https://www.tumblr.com/logo/?language=ja_JP" target="_blank" rel="noopener noreferrer"><strong>Tumblr</strong></a></li>
              <li><a href="http://hatenacorp.jp/press/resource" target="_blank" rel="noopener noreferrer"><strong>はてなブックマーク</strong></a></li>
              <li><a href="https://line.me/en/logo" target="_blank" rel="noopener noreferrer"><strong>LINE</strong></a></li>
              <li><a href="https://www.feedly.com/factory.html" target="_blank" rel="noopener noreferrer"><strong>Feedly</strong></a>: ロゴをダウンロードしたい方は Step 1: Select your design 部分の button kit をクリックしてください。</li>
            </ul>
          </Panel>

        </Accordion>


        <hr className="hr-slash" style={{ margin: '30px 0 20px 0' }} />


        {this.props.pageType === 'wordPressPlugin' &&
          <div>

            <div className="select-theme-box">
              <FormGroup controlId="select-top-theme">
                <ControlLabel>Top（記事の上部に表示するシェアボタン）</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.props.topTheme}
                  onChange={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, null, 'top', e.target.value)}
                >
                  <option />
                  {this.codeSelectThemeOption()}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="select-bottom-theme">
                <ControlLabel>Bottom（記事の下部に表示するシェアボタン）</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.props.bottomTheme}
                  onChange={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, null, 'bottom', e.target.value)}
                >
                  <option />
                  {this.codeSelectThemeOption()}
                </FormControl>
              </FormGroup>
            </div>


            <hr className="hr-slash" style={{ margin: '20px 0 20px 0' }} />


          </div>
        }


        <ButtonToolbar>
          <Button bsStyle="success" bsSize="small" onClick={() => this.props.funcToggleEditForm('new-theme')}>シェアボタン新規作成</Button>
          <Button bsStyle="info" bsSize="small" onClick={() => this.props.funcToggleEditForm()}>フォームを閉じる</Button>
        </ButtonToolbar>


        {(() => {
          if (this.props.toggleEditForm) {
            return <ContentEditForm {...this.props} />;
          }
        })()}


        {this.props.dataEditThemesMap.count() > 0 &&
          <div className="edit-theme-list-box">


            <hr id="edit-themes-hr" className="hr-slash" style={{ margin: '20px 0 40px 0' }} />


            {this.renderShareButtonsEditThemes()}


            <ButtonToolbar className="download-buttons-box">
              <Button
                bsStyle="success"
                bsSize="small"
                className="ladda-button download-button"
                data-style="slide-right"
                data-size="s"
                onClick={e => this.props.funcDownloadThemes(this.props.stateModel, e.currentTarget, 'all')}
              >
                <span className="ladda-label">すべてのシェアボタンをダウンロード</span>
              </Button>

              <Button
                bsStyle="info"
                bsSize="small"
                className="ladda-button download-button"
                data-style="slide-right"
                data-size="s"
                onClick={e => this.props.funcDownloadThemes(this.props.stateModel, e.currentTarget, 'check')}
              >
                <span className="ladda-label">チェックしたシェアボタンをダウンロード</span>
              </Button>
            </ButtonToolbar>

          </div>
        }


      </div>
    );
  }

}

ContentEdit.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,

  pageType: PropTypes.string.isRequired,
  topTheme: PropTypes.string.isRequired,
  bottomTheme: PropTypes.string.isRequired,
  editThemesList: PropTypes.instanceOf(List).isRequired,

  contentsNumberOfLines: PropTypes.number.isRequired,
  editThemesPage: PropTypes.number.isRequired,

  googleFontsList: PropTypes.instanceOf(List).isRequired,

  toggleEditForm: PropTypes.bool.isRequired,
  checkDownloadThemesList: PropTypes.instanceOf(List).isRequired,

  dataEditThemesMap: PropTypes.instanceOf(Map).isRequired,
  uploadImageOfficialMap: PropTypes.instanceOf(Map).isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcChangeShareButtonsList: PropTypes.func.isRequired,
  funcToggleEditForm: PropTypes.func.isRequired,
  funcAjaxDeleteTheme: PropTypes.func.isRequired,
  funcAjaxSetTopBottomTheme: PropTypes.func.isRequired,
  funcCheckDownloadThemes: PropTypes.func.isRequired,
  funcDownloadThemes: PropTypes.func.isRequired,


};


export default ContentEdit;
