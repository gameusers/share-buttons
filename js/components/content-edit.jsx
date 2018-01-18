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
import InputGroup from 'alias-node-modules/react-bootstrap/lib/InputGroup';
import Checkbox from 'alias-node-modules/react-bootstrap/lib/Checkbox';
import HelpBlock from 'alias-node-modules/react-bootstrap/lib/HelpBlock';
import Pagination from 'alias-node-modules/react-bootstrap/lib/Pagination';
import PanelGroup from 'alias-node-modules/react-bootstrap/lib/PanelGroup';
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


      const codeOpen = this.props.codeOpenList.includes(themeNameId) ? true : false;

      const pluginUrl = this.props.pageType === 'wordPressPlugin' ? gameUsersShareButtonsPluginUrl() : 'game-users-share-buttons/';
      const codeShareBundleJsUrl = `<script type="text/javascript" src="${pluginUrl}js/share-bundle.min.js"></script>`;
      const codeThemeUrl = `<div data-game-users-share-buttons="${themeNameId}"></div>`;

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
              <Button bsStyle="primary" bsSize="xsmall" className="buttons" onClick={() => this.props.funcCodeOpenList(themeNameId)}>Code</Button>
            </div>
          </div>

          <div data-game-users-share-buttons={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />


          {codeOpen &&
            <div>
              <FormGroup controlId="formControlsTextarea" className="edit-list-code-box">
                <ControlLabel>Code 1: 1ページにつきひとつだけ貼ってください。</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="textarea"
                  defaultValue={codeShareBundleJsUrl}
                />
              </FormGroup>

              <FormGroup controlId="formControlsTextarea" className="edit-list-code-box">
                <ControlLabel>Code 2: シェアボタンを表示したい場所に貼ってください。</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="textarea"
                  defaultValue={codeThemeUrl}
                />
              </FormGroup>
            </div>
          }

        </div>
      );

    });


    // --------------------------------------------------
    //   Pagination
    // --------------------------------------------------

    const total = Math.ceil(themesList.count() / this.props.contentsNumberOfLines);

    const itemsArr = [];
    for (let number = 1; number <= total; number += 1) {
      itemsArr.push(
        <Pagination.Item
          active={number === page}
          key={number}
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'editThemes', number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    codeArr.push(
      <Pagination bsSize="medium" key="pagination">
        <Pagination.First
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'editThemes', 1)}
        />
        {itemsArr}
        <Pagination.Last
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'editThemes', total)}
        />
      </Pagination>
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


        <PanelGroup accordion className="accordion-box" id="accordion-edit">

          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>モバイル環境で綺麗に表示するには？</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              スマートフォンやタブレットでは、通常の2倍の大きさの画像をアップロードすると綺麗に表示されます。例えば <strong>50 x 50</strong> の画像を表示したい場合は、 <strong>100 x 100</strong> の画像を利用してください。
            </Panel.Body>
          </Panel>

          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>Social Media 公式ロゴ</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
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
            </Panel.Body>
          </Panel>

          <Panel eventKey="3">
            <Panel.Heading>
              <Panel.Title toggle>画像の軽量化について</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              シェアボタンに利用する画像は圧縮を行って軽量化を行いましょう。軽いほど表示も早くなります。画質を維持したまま、軽量化を行ってくれるサービスを紹介しますので、ぜひ活用してください。<br /><br />

              <ul className="list-top2">
                <li><a href="http://optimizilla.com/ja/" target="_blank" rel="noopener noreferrer"><strong>Optimizilla</strong></a>: JPEG, PNGに対応。20個までの画像を同時にアップロードできます。</li>
                <li><a href="https://mozjpeg.codelove.de/" target="_blank" rel="noopener noreferrer"><strong>mozjpeg</strong></a>: JPEG, BMP, TARGAに対応。圧縮の性能が高いです。JPEGの場合はこちらをおすすめ。</li>
              </ul>
            </Panel.Body>
          </Panel>

        </PanelGroup>


        <hr className="hr-slash" style={{ margin: '30px 0 20px 0' }} />


        {this.props.pageType === 'wordPressPlugin' &&
          <div>

            <div className="select-theme-box">
              <FormGroup controlId="select-top-theme">
                <ControlLabel>Top（上部に表示するシェアボタン）</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.props.topTheme}
                  onChange={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, null, 'top', e.target.value)}
                >
                  <option />
                  {this.codeSelectThemeOption()}
                </FormControl>
              </FormGroup>

              <Panel id="collapsible-panel-top-theme" bsStyle="info" defaultExpanded={false}>
                <Panel.Heading>
                  <Panel.Title toggle componentClass="h3">
                    Top 設定
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>

                    <p>シェアボタンを表示するページを選択してください。</p>

                    <div className="edit-theme-option-show-checkbox">
                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.topThemeShowFront} onChange={e => this.props.funcTopThemeShowFront(e.target.checked)}>
                          トップページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.topThemeShowSingle} onChange={e => this.props.funcTopThemeShowSingle(e.target.checked)}>
                          個別投稿ページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.topThemeShowPage} onChange={e => this.props.funcTopThemeShowPage(e.target.checked)}>
                          固定ページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.topThemeShowArchive} onChange={e => this.props.funcTopThemeShowArchive(e.target.checked)}>
                          アーカイブページ（カテゴリー、タグページなど）
                        </Checkbox>
                      </FormGroup>
                    </div>


                    <div className="edit-theme-option-margin">
                      <FormGroup bsSize="sm" validationState={null}>
                        <ControlLabel>余白 - 個別投稿ページ</ControlLabel>
                        <div className="form-inline">
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>上</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemeSingleMarginTop}
                              onChange={e => this.props.funcTopThemeSingleMarginTop(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>右</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemeSingleMarginRight}
                              onChange={e => this.props.funcTopThemeSingleMarginRight(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>下</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemeSingleMarginBottom}
                              onChange={e => this.props.funcTopThemeSingleMarginBottom(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>左</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemeSingleMarginLeft}
                              onChange={e => this.props.funcTopThemeSingleMarginLeft(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                        <HelpBlock>個別投稿ページに表示するシェアボタン周囲の余白を設定します。</HelpBlock>
                      </FormGroup>

                      <FormGroup bsSize="sm" validationState={null}>
                        <ControlLabel>余白 - 固定ページ</ControlLabel>
                        <div className="form-inline">
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>上</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemePageMarginTop}
                              onChange={e => this.props.funcTopThemePageMarginTop(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>右</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemePageMarginRight}
                              onChange={e => this.props.funcTopThemePageMarginRight(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>下</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemePageMarginBottom}
                              onChange={e => this.props.funcTopThemePageMarginBottom(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>左</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.topThemePageMarginLeft}
                              onChange={e => this.props.funcTopThemePageMarginLeft(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                        <HelpBlock>固定ページに表示するシェアボタン周囲の余白を設定します。</HelpBlock>
                      </FormGroup>
                    </div>

                    <Button
                      bsStyle="success"
                      bsSize="small"
                      className="ladda-button"
                      data-style="slide-right"
                      data-size="s"
                      onClick={e => this.props.funcAjaxTopBottomThemeSaveOption(this.props.stateModel, e.currentTarget, 'top')}
                    >
                      <span className="ladda-label">保存</span>
                    </Button>

                  </Panel.Body>
                </Panel.Collapse>
              </Panel>



              <FormGroup controlId="select-bottom-theme">
                <ControlLabel>Bottom（下部に表示するシェアボタン）</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.props.bottomTheme}
                  onChange={e => this.props.funcAjaxSetTopBottomTheme(this.props.stateModel, null, 'bottom', e.target.value)}
                >
                  <option />
                  {this.codeSelectThemeOption()}
                </FormControl>
              </FormGroup>

              <Panel id="collapsible-panel-bottom-theme" bsStyle="info" defaultExpanded={false}>
                <Panel.Heading>
                  <Panel.Title toggle componentClass="h3">
                    Bottom 設定
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>

                    <p>シェアボタンを表示するページを選択してください。</p>

                    <div className="edit-theme-option-show-checkbox">
                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.bottomThemeShowFront} onChange={e => this.props.funcBottomThemeShowFront(e.target.checked)}>
                          トップページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.bottomThemeShowSingle} onChange={e => this.props.funcBottomThemeShowSingle(e.target.checked)}>
                          個別投稿ページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.bottomThemeShowPage} onChange={e => this.props.funcBottomThemeShowPage(e.target.checked)}>
                          固定ページ
                        </Checkbox>
                      </FormGroup>

                      <FormGroup controlId="share-button" validationState={null}>
                        <Checkbox checked={this.props.bottomThemeShowArchive} onChange={e => this.props.funcBottomThemeShowArchive(e.target.checked)}>
                          アーカイブページ（カテゴリー、タグページなど）
                        </Checkbox>
                      </FormGroup>
                    </div>


                    <div className="edit-theme-option-margin">
                      <FormGroup bsSize="sm" validationState={null}>
                        <ControlLabel>余白 - 個別投稿ページ</ControlLabel>
                        <div className="form-inline">
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>上</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemeSingleMarginTop}
                              onChange={e => this.props.funcBottomThemeSingleMarginTop(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>右</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemeSingleMarginRight}
                              onChange={e => this.props.funcBottomThemeSingleMarginRight(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>下</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemeSingleMarginBottom}
                              onChange={e => this.props.funcBottomThemeSingleMarginBottom(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>左</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemeSingleMarginLeft}
                              onChange={e => this.props.funcBottomThemeSingleMarginLeft(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                        <HelpBlock>個別投稿ページに表示するシェアボタン周囲の余白を設定します。</HelpBlock>
                      </FormGroup>

                      <FormGroup bsSize="sm" validationState={null}>
                        <ControlLabel>余白 - 固定ページ</ControlLabel>
                        <div className="form-inline">
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>上</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemePageMarginTop}
                              onChange={e => this.props.funcBottomThemePageMarginTop(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>右</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemePageMarginRight}
                              onChange={e => this.props.funcBottomThemePageMarginRight(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>下</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemePageMarginBottom}
                              onChange={e => this.props.funcBottomThemePageMarginBottom(e.target.value)}
                            />
                          </InputGroup>
                          <InputGroup className="inline-margin">
                            <InputGroup.Addon>左</InputGroup.Addon>
                            <FormControl
                              type="number"
                              min="0"
                              value={this.props.bottomThemePageMarginLeft}
                              onChange={e => this.props.funcBottomThemePageMarginLeft(e.target.value)}
                            />
                          </InputGroup>
                        </div>
                        <HelpBlock>固定ページに表示するシェアボタン周囲の余白を設定します。</HelpBlock>
                      </FormGroup>
                    </div>

                    <Button
                      bsStyle="success"
                      bsSize="small"
                      className="ladda-button"
                      data-style="slide-right"
                      data-size="s"
                      onClick={e => this.props.funcAjaxTopBottomThemeSaveOption(this.props.stateModel, e.currentTarget, 'bottom')}
                    >
                      <span className="ladda-label">保存</span>
                    </Button>

                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

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
  topThemeSingleMarginTop: PropTypes.number.isRequired,
  topThemeSingleMarginRight: PropTypes.number.isRequired,
  topThemeSingleMarginBottom: PropTypes.number.isRequired,
  topThemeSingleMarginLeft: PropTypes.number.isRequired,
  topThemePageMarginTop: PropTypes.number.isRequired,
  topThemePageMarginRight: PropTypes.number.isRequired,
  topThemePageMarginBottom: PropTypes.number.isRequired,
  topThemePageMarginLeft: PropTypes.number.isRequired,
  topThemeShowFront: PropTypes.bool.isRequired,
  topThemeShowSingle: PropTypes.bool.isRequired,
  topThemeShowPage: PropTypes.bool.isRequired,
  topThemeShowArchive: PropTypes.bool.isRequired,

  bottomTheme: PropTypes.string.isRequired,
  bottomThemeSingleMarginTop: PropTypes.number.isRequired,
  bottomThemeSingleMarginRight: PropTypes.number.isRequired,
  bottomThemeSingleMarginBottom: PropTypes.number.isRequired,
  bottomThemeSingleMarginLeft: PropTypes.number.isRequired,
  bottomThemePageMarginTop: PropTypes.number.isRequired,
  bottomThemePageMarginRight: PropTypes.number.isRequired,
  bottomThemePageMarginBottom: PropTypes.number.isRequired,
  bottomThemePageMarginLeft: PropTypes.number.isRequired,
  bottomThemeShowFront: PropTypes.bool.isRequired,
  bottomThemeShowSingle: PropTypes.bool.isRequired,
  bottomThemeShowPage: PropTypes.bool.isRequired,
  bottomThemeShowArchive: PropTypes.bool.isRequired,

  codeOpenList: PropTypes.instanceOf(List).isRequired,

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
  funcAjaxTopBottomThemeSaveOption: PropTypes.func.isRequired,

  funcTopThemeSingleMarginTop: PropTypes.func.isRequired,
  funcTopThemeSingleMarginRight: PropTypes.func.isRequired,
  funcTopThemeSingleMarginBottom: PropTypes.func.isRequired,
  funcTopThemeSingleMarginLeft: PropTypes.func.isRequired,
  funcTopThemePageMarginTop: PropTypes.func.isRequired,
  funcTopThemePageMarginRight: PropTypes.func.isRequired,
  funcTopThemePageMarginBottom: PropTypes.func.isRequired,
  funcTopThemePageMarginLeft: PropTypes.func.isRequired,
  funcTopThemeShowFront: PropTypes.func.isRequired,
  funcTopThemeShowSingle: PropTypes.func.isRequired,
  funcTopThemeShowPage: PropTypes.func.isRequired,
  funcTopThemeShowArchive: PropTypes.func.isRequired,

  funcBottomThemeSingleMarginTop: PropTypes.func.isRequired,
  funcBottomThemeSingleMarginRight: PropTypes.func.isRequired,
  funcBottomThemeSingleMarginBottom: PropTypes.func.isRequired,
  funcBottomThemeSingleMarginLeft: PropTypes.func.isRequired,
  funcBottomThemePageMarginTop: PropTypes.func.isRequired,
  funcBottomThemePageMarginRight: PropTypes.func.isRequired,
  funcBottomThemePageMarginBottom: PropTypes.func.isRequired,
  funcBottomThemePageMarginLeft: PropTypes.func.isRequired,
  funcBottomThemeShowFront: PropTypes.func.isRequired,
  funcBottomThemeShowSingle: PropTypes.func.isRequired,
  funcBottomThemeShowPage: PropTypes.func.isRequired,
  funcBottomThemeShowArchive: PropTypes.func.isRequired,

  funcCodeOpenList: PropTypes.func.isRequired,

  funcCheckDownloadThemes: PropTypes.func.isRequired,
  funcDownloadThemes: PropTypes.func.isRequired,


};


export default ContentEdit;
