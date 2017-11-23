// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'alias-node-modules/react';
import Button from 'alias-node-modules/react-bootstrap/lib/Button';
import FormGroup from 'alias-node-modules/react-bootstrap/lib/FormGroup';
import ControlLabel from 'alias-node-modules/react-bootstrap/lib/ControlLabel';
import FormControl from 'alias-node-modules/react-bootstrap/lib/FormControl';
import Checkbox from 'alias-node-modules/react-bootstrap/lib/Checkbox';
import InputGroup from 'alias-node-modules/react-bootstrap/lib/InputGroup';
import HelpBlock from 'alias-node-modules/react-bootstrap/lib/HelpBlock';
import Popover from 'alias-node-modules/react-bootstrap/lib/Popover';
import OverlayTrigger from 'alias-node-modules/react-bootstrap/lib/OverlayTrigger';
import SketchPicker from 'alias-node-modules/react-color/lib/components/sketch/Sketch';
import PropTypes from 'alias-node-modules/prop-types';
import { Map } from 'alias-node-modules/immutable';

import { OFFICIAL_THEME_DESIGN_URL, instanceGameUsersShareButtonsOption, shareObj, Model } from '../models/model';



// --------------------------------------------------
//   Popovers
// --------------------------------------------------

const popoverForUploadImage = (
  <Popover id="popover-trigger-focus" title="モバイル環境で綺麗に表示するには？">
    スマートフォンやタブレットでは、通常の2倍の大きさの画像をアップロードすると綺麗に表示されます。例えば <strong>50 x 50</strong> の画像を表示したい場合は、 <strong>100 x 100</strong> の画像を利用してください。
  </Popover>
);



class ContentEditForm extends React.Component {


  // --------------------------------------------------
  //   Lifecycle Methods
  // --------------------------------------------------

  componentDidMount() {
    this.renderSampleThemeLater();
  }


  componentDidUpdate(prevProps) {


    // --------------------------------------------------
    //   Render Sample Theme
    // --------------------------------------------------

    this.renderSampleThemeLater();


    // --------------------------------------------------
    //   Read Google Fonts / Sample Theme
    // --------------------------------------------------

    const countGoogleFont = this.props.dataSampleThemesMap.getIn([this.props.currentThemeNameId, this.props.currentThemeType, 'countGoogleFont']);
    const prevCountGoogleFont = prevProps.dataSampleThemesMap.getIn([this.props.currentThemeNameId, this.props.currentThemeType, 'countGoogleFont']);


    if (countGoogleFont !== prevCountGoogleFont) {

      const elementGoogleFonts = document.querySelector('#game-users-share-buttons-google-fonts-sample');

      if (elementGoogleFonts) {
        elementGoogleFonts.href = `https://fonts.googleapis.com/css?family=${countGoogleFont}`;
      } else {

        const css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.id = 'game-users-share-buttons-google-fonts-sample';
        css.href = `https://fonts.googleapis.com/css?family=${countGoogleFont}`;
        document.getElementsByTagName('head').item(0).appendChild(css);

      }

    }

  }



  // --------------------------------------------------
  //   Validation State
  //   フォームの入力値ガ正しい場合は success（緑色）
  //   間違っている場合は error（赤色）
  // --------------------------------------------------

  validationStateName() {
    let state = 'error';
    if (this.props.name.match(/^[a-z0-9]{1,20}$/)) {
      state = 'success';
    }
    return state;
  }

  validationStateShareImage() {
    let state = 'error';
    const share = this.props.dataSampleThemesMap.getIn([this.props.currentThemeNameId, this.props.currentThemeType, 'share']);
    if (share.size > 0) {
      state = 'success';
    }
    return state;
  }


  validationStateShareCountMin() {
    let state = 'error';
    if (this.props.shareCountMin === '' || this.props.shareCountMin < this.props.shareCountMax) {
      state = 'success';
    }
    return state;
  }

  validationStateShareCountMax() {
    let state = 'error';
    if (this.props.shareCountMax === '' || this.props.shareCountMin < this.props.shareCountMax) {
      state = 'success';
    }
    return state;
  }


  validationStateShareImageWidthHeight() {
    let state = 'error';
    if (this.props.shareImageWidth !== '' && this.props.shareImageWidth > 0 && this.props.shareImageHeight !== '' && this.props.shareImageHeight > 0) {
      state = 'success';
    }
    return state;
  }

  validationStateShareImageMargin() {
    let state = 'error';
    if (this.props.shareImageMarginTop !== '' && this.props.shareImageMarginRight !== '' && this.props.shareImageMarginBottom !== '' && this.props.shareImageMarginLeft !== '') {
      state = 'success';
    }
    return state;
  }


  validationStateCountWidthHeight() {
    let state = 'error';
    if (this.props.countWidth !== '' && this.props.countWidth > 0 && this.props.countHeight !== '' && this.props.countHeight > 0) {
      state = 'success';
    }
    return state;
  }

  validationStateCountWidth() {
    let state = 'error';
    if (this.props.countWidth !== '' && this.props.countWidth > 0) {
      state = 'success';
    }
    return state;
  }

  validationStateCountMargin() {
    let state = 'error';
    if (this.props.countMarginTop !== '' && this.props.countMarginRight !== '' && this.props.countMarginBottom !== '' && this.props.countMarginLeft !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountPadding() {
    let state = 'error';
    if (this.props.countPaddingTop !== '' && this.props.countPaddingRight !== '' && this.props.countPaddingBottom !== '' && this.props.countPaddingLeft !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountPaddingForIos() {
    let state = 'error';
    if (this.props.countPaddingTopForIos !== '' && this.props.countPaddingRightForIos !== '' && this.props.countPaddingBottomForIos !== '' && this.props.countPaddingLeftForIos !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountPaddingForAndroid() {
    let state = 'error';
    if (this.props.countPaddingTopForAndroid !== '' && this.props.countPaddingRightForAndroid !== '' && this.props.countPaddingBottomForAndroid !== '' && this.props.countPaddingLeftForAndroid !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountBorderRadius() {
    let state = 'error';
    if (this.props.countBorderRadius !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountTopLeft() {
    let state = 'error';
    if (this.props.countTop !== '' && this.props.countLeft !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateCountFontSize() {
    let state = 'error';
    if (this.props.countFontSize !== '' && this.props.countFontSize >= 8) {
      state = 'success';
    }
    return state;
  }


  validationStateFreeImageWidthHeight() {
    let state = 'error';
    if (this.props.freeImageWidth !== '' && this.props.freeImageWidth >= 20 && this.props.freeImageHeight !== '' && this.props.freeImageHeight >= 20) {
      state = 'success';
    }
    return state;
  }

  validationStateFreeImageMargin() {
    let state = 'error';
    if (this.props.freeImageMarginTop !== '' && this.props.freeImageMarginRight !== '' && this.props.freeImageMarginBottom !== '' && this.props.freeImageMarginLeft !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateFreeUploadImageUrl() {
    let state = 'error';
    if (!this.props.freeUploadImageUrl || this.props.freeUploadImageUrl.match(/^(https?)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/)) {
      state = 'success';
    }
    return state;
  }

  validationStateFreeUploadImageWidthHeight() {
    let state = 'error';
    if (this.props.freeUploadImageWidth !== '' && this.props.freeUploadImageWidth > 0 && this.props.freeUploadImageHeight !== '' && this.props.freeUploadImageHeight > 0) {
      state = 'success';
    }
    return state;
  }

  validationStateFreeUploadImageMargin() {
    let state = 'error';
    if (this.props.freeUploadImageMarginTop !== '' && this.props.freeUploadImageMarginRight !== '' && this.props.freeUploadImageMarginBottom !== '' && this.props.freeUploadImageMarginLeft !== '') {
      state = 'success';
    }
    return state;
  }


  validationStateBoxMargin() {
    let state = 'error';
    if (this.props.boxMarginTop !== '' && this.props.boxMarginRight !== '' && this.props.boxMarginBottom !== '' && this.props.boxMarginLeft !== '') {
      state = 'success';
    }
    return state;
  }

  validationStateMargin() {
    let state = 'error';
    if (this.props.marginTop !== '' && this.props.marginRight !== '' && this.props.marginBottom !== '' && this.props.marginLeft !== '') {
      state = 'success';
    }
    return state;
  }



  // --------------------------------------------------
  //   Code Option / 各設定フォームのコード
  // --------------------------------------------------

  /**
   * 個別設定
   * @return {array} コードの配列
   */
  codeOptionShareIndividual() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'share-individual' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    codeArr.push(
      <div key="share-type">
        <p className="share-buttons-option">個別設定</p>
        <HelpBlock>各シェアボタンごとの設定を個別に行うことができます。画像がアップロードされていない場合、設定は表示されません。</HelpBlock>

        <FormGroup controlId="share-type" validationState="success">
          <FormControl componentClass="select" value={this.props.shareType} onChange={e => this.props.funcShareType(e.target.value)}>
            {(() => {
              const tempArr = [];
              const shareMap = this.props.dataSampleThemesMap.getIn([this.props.currentThemeNameId, this.props.currentThemeType, 'share']);
              shareMap.entrySeq().forEach((e) => {
                const key = e[0];
                tempArr.push(<option value={key} key={key}>{shareObj[key].name}</option>);
              });

              return tempArr;
            })()}
          </FormControl>
        </FormGroup>
      </div>
    );


    if (this.props.shareType) {

      codeArr.push(
        <div className="form-group-margin" key="share-button">
          <FormGroup controlId="share-button" validationState="success">
            <Checkbox checked={this.props.shareButton} onChange={e => this.props.funcShareButton(e.target.checked)}>
              シェアボタンを表示する
            </Checkbox>
          </FormGroup>
        </div>
      );

      if (shareObj[this.props.shareType].count) {
        codeArr.push(
          <div key="share-count">
            <FormGroup controlId="share-count" validationState="success">
              <Checkbox checked={this.props.shareCount} onChange={e => this.props.funcShareCount(e.target.checked)}>
                シェア数を表示する
              </Checkbox>
            </FormGroup>
          </div>
        );
      }

      codeArr.push(
        <div className="form-group-margin" key="share-count-default-text">
          <FormGroup controlId="share-count-default-text" bsSize="sm" validationState="success">
            <ControlLabel>デフォルトテキスト</ControlLabel>
            <FormControl
              type="text"
              value={this.props.shareCountDefaultText}
              onChange={e => this.props.funcShareCountDefaultText(e.target.value)}
            />
            <HelpBlock>シェア数の代わりに表示されるテキストです。シェア数がカウントされるまでの間、一時的に表示されます。シェア数を表示しない設定にした場合は、デフォルトテキストが常に表示されます。</HelpBlock>
          </FormGroup>
        </div>
      );

      if (shareObj[this.props.shareType].count) {
        codeArr.push(
          <div className="form-group-margin" key="share-count-min">
            <FormGroup controlId="share-count-min" validationState={this.validationStateShareCountMin()}>
              <ControlLabel>シェア数の最小値</ControlLabel>
              <FormControl
                type="number"
                value={this.props.shareCountMin}
                min="0"
                onChange={e => this.props.funcShareCountMin(e.target.value)}
              />
              <HelpBlock>シェア数がここで設定した最小値未満の場合、デフォルトテキストが代わりに表示されます。最大値より大きな数値は入力できません。</HelpBlock>
            </FormGroup>
          </div>
        );

        codeArr.push(
          <div className="form-group-margin" key="share-count-max">
            <FormGroup controlId="share-count-max" validationState={this.validationStateShareCountMax()}>
              <ControlLabel>シェア数の最大値</ControlLabel>
              <FormControl
                type="number"
                value={this.props.shareCountMax}
                min="0"
                onChange={e => this.props.funcShareCountMax(e.target.value)}
              />
              <HelpBlock>シェア数がここで設定した最大値を超えた場合、数値が最大値で固定されるようになります。例えば、最大値を99に設定し、シェア数が100に到達した場合は、表示されるシェア数は99になります。これは数字の桁が変わることによってデザインが崩れないようにするための措置で、見かけ上の数値を固定しているだけです。シェア数の実数には影響しません。最小値より小さな数値は入力できません。</HelpBlock>
            </FormGroup>
          </div>
        );
      }

      codeArr.push(
        <div className="share-delete-button" key="share-delete-button">
          <Button bsStyle="info" bsSize="sm" className="ladda-button" data-style="expand-right" onClick={() => this.props.funcShareImageDelete()}><span className="ladda-label">このシェアボタンを削除する</span></Button>
        </div>
      );

    }

    return codeArr;

  }


  /**
   * ボタン画像設定
   * @return {array} コードの配列
   */
  codeOptionShareImage() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'share-image' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    if (this.props.currentThemeType === 'type1') {
      codeArr.push(
        <div key="share-image-vertical-align">
          <FormGroup controlId="share-image-vertical-align" validationState="success">
            <ControlLabel>縦の表示位置</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.shareImageVerticalAlign}
              onChange={e => this.props.funcShareImageVerticalAlign(e.target.value)}
            >
              <option value="top">上</option>
              <option value="middle">中央</option>
              <option value="bottom">下</option>
            </FormControl>
            <HelpBlock>この項目はフキダシがボタン画像の右側または左側に表示されていて、ボタン画像の高さがフキダシより低い場合のみ効果を発揮します。上・下を選ぶと、ボタン画像は上部・下部に貼り付くように表示されます。</HelpBlock>
          </FormGroup>
        </div>
      );
    }

    codeArr.push(
      <div className="form-group-margin" key="share-image-width-height">
        <FormGroup bsSize="sm" validationState={this.validationStateShareImageWidthHeight()}>
          <ControlLabel>横幅・縦幅</ControlLabel>
          <Checkbox checked={this.props.shareImageAspectRatioFixed} onChange={e => this.props.funcShareImageAspectRatioFixed(e.target.checked)}>
            縦横比を固定する
          </Checkbox>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>横幅</InputGroup.Addon>
              <FormControl
                type="number"
                id="share-image-width"
                min="10"
                value={this.props.shareImageWidth}
                onChange={e => this.props.funcShareImageWidth(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>縦幅</InputGroup.Addon>
              <FormControl
                type="number"
                id="share-image-height"
                min="10"
                value={this.props.shareImageHeight}
                onChange={e => this.props.funcShareImageHeight(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>ボタン画像のサイズを指定してください。</HelpBlock>
        </FormGroup>
      </div>
    );

    if (this.props.currentThemeType === 'type1') {
      codeArr.push(
        <div className="form-group-margin" key="share-image-margin">
          <FormGroup bsSize="sm" validationState={this.validationStateShareImageMargin()}>
            <ControlLabel>フキダシとの距離</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  id="share-image-margin-top"
                  min="0"
                  value={this.props.shareImageMarginTop}
                  onChange={e => this.props.funcShareImageMarginTop(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  id="share-image-margin-right"
                  min="0"
                  value={this.props.shareImageMarginRight}
                  onChange={e => this.props.funcShareImageMarginRight(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  id="share-image-margin-bottom"
                  min="0"
                  value={this.props.shareImageMarginBottom}
                  onChange={e => this.props.funcShareImageMarginBottom(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  id="share-image-margin-left"
                  min="0"
                  value={this.props.shareImageMarginLeft}
                  onChange={e => this.props.funcShareImageMarginLeft(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>フキダシとの距離を調整する値です。例えばフキダシがボタン画像の上に表示されている場合、上と書かれているフォームでフキダシとの距離を調整します。</HelpBlock>
          </FormGroup>
        </div>
      );
    }

    return codeArr;

  }


  /**
   * シェア数・フキダシ設定
   * @return {array} コードの配列
   */
  codeOptionShareCount() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'share-count' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    codeArr.push(
      <div key="count-input">
        <FormGroup bsSize="sm" validationState="success">
          <ControlLabel>シェア数入力（編集時のみ）</ControlLabel>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>指定</InputGroup.Addon>
              <FormControl
                type="text"
                value={this.props.countInput}
                onChange={e => this.props.funcCountInput(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>ランダム最小</InputGroup.Addon>
              <FormControl
                type="number"
                value={this.props.countInputMin}
                onChange={e => this.props.funcCountInputMin(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>ランダム最大</InputGroup.Addon>
              <FormControl
                type="number"
                value={this.props.countInputMax}
                onChange={e => this.props.funcCountInputMax(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>編集時のみの設定で、シェア数に好きな数字を表示することができます。小さな数字や大きな数字を入力して、表示が崩れないかチェックしてみてください。</HelpBlock>
        </FormGroup>
      </div>
    );

    if (this.props.currentThemeType === 'type1') {

      codeArr.push(
        <div className="form-group-margin" key="count">
          <FormGroup controlId="count" validationState="success">
            <Checkbox checked={this.props.count} onChange={e => this.props.funcCount(e.target.checked)}>
              フキダシを表示する
            </Checkbox>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-direction">
          <FormGroup controlId="count-direction" validationState="success">
            <ControlLabel>フキダシの位置</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.countDirection}
              onChange={e => this.props.funcCountDirection(e.target.value)}
            >
              <option value="top">上</option>
              <option value="right">右</option>
              <option value="bottom">下</option>
              <option value="left">左</option>
            </FormControl>
            <HelpBlock>フキダシをボタン画像のどの方向に表示するかを設定します。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-vertical-align">
          <FormGroup controlId="count-vertical-align" validationState="success">
            <ControlLabel>フキダシ 縦の表示位置</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.countVerticalAlign}
              onChange={e => this.props.funcCountVerticalAlign(e.target.value)}
            >
              <option value="top">上</option>
              <option value="middle">中央</option>
              <option value="bottom">下</option>
            </FormControl>
            <HelpBlock>この項目はフキダシがボタン画像の右側または左側に表示されていて、フキダシの高さがボタン画像より低い場合のみ効果を発揮します。上・下を選ぶと、フキダシは上部・下部に貼り付くように表示されます。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-width-height">
          <FormGroup bsSize="sm" validationState={this.validationStateCountWidthHeight()}>
            <ControlLabel>フキダシ 横幅・縦幅</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>横幅</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="1"
                  value={this.props.countWidth}
                  onChange={e => this.props.funcCountWidth(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>縦幅</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="1"
                  value={this.props.countHeight}
                  onChange={e => this.props.funcCountHeight(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>フキダシのサイズを指定してください。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-margin">
          <FormGroup bsSize="sm" validationState={this.validationStateCountMargin()}>
            <ControlLabel>フキダシ 余白・外側</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countMarginTop}
                  onChange={e => this.props.funcCountMarginTop(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countMarginRight}
                  onChange={e => this.props.funcCountMarginRight(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countMarginBottom}
                  onChange={e => this.props.funcCountMarginBottom(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countMarginLeft}
                  onChange={e => this.props.funcCountMarginLeft(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>フキダシの表示位置を調整する値です。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-padding">
          <FormGroup bsSize="sm" validationState={this.validationStateCountPadding()}>
            <ControlLabel>1. フキダシ 余白・内側</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countPaddingTop}
                  onChange={e => this.props.funcCountPaddingTop(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countPaddingRight}
                  onChange={e => this.props.funcCountPaddingRight(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countPaddingBottom}
                  onChange={e => this.props.funcCountPaddingBottom(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countPaddingLeft}
                  onChange={e => this.props.funcCountPaddingLeft(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>フキダシ内部に表示されているシェア数の表示位置を調整する値です。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-padding-for-ios">
          <FormGroup bsSize="sm" validationState={this.validationStateCountPaddingForIos()}>
            <ControlLabel>2. フキダシ 余白・内側 / ズレ修正用 for iOS</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingTopForIos}
                  onChange={e => this.props.funcCountPaddingTopForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingRightForIos}
                  onChange={e => this.props.funcCountPaddingRightForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingBottomForIos}
                  onChange={e => this.props.funcCountPaddingBottomForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingLeftForIos}
                  onChange={e => this.props.funcCountPaddingLeftForIos(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>モバイル環境でシェアボタンを表示した場合、使用するフォントや指定したフォントのサイズによって、フキダシ内部に表示されるシェア数の文字位置が若干ずれることがあります。そのズレを修正するためのフォームです。iOS環境でズレが確認された場合は、こちらのフォームで文字の位置を修正してください。入力した値は、1番のフキダシ余白・内側フォームの値に加算・減算されて表示されます。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-padding-for-android">
          <FormGroup bsSize="sm" validationState={this.validationStateCountPaddingForAndroid()}>
            <ControlLabel>3. フキダシ 余白・内側 / ズレ修正用 for Android</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingTopForAndroid}
                  onChange={e => this.props.funcCountPaddingTopForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingRightForAndroid}
                  onChange={e => this.props.funcCountPaddingRightForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingBottomForAndroid}
                  onChange={e => this.props.funcCountPaddingBottomForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingLeftForAndroid}
                  onChange={e => this.props.funcCountPaddingLeftForAndroid(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>上記フォームのAndroid用です。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-border-color">
          <FormGroup validationState="success">
            <ControlLabel>フキダシ枠の色</ControlLabel>
            <SketchPicker
              color={this.props.countBorderColor}
              onChangeComplete={color => this.props.funcCountBorderColor(color.hex)}
              disableAlpha
            />
            <HelpBlock>フキダシ枠の色を指定してください。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-border-radius">
          <FormGroup controlId="count-border-radius" bsSize="sm" validationState={this.validationStateCountBorderRadius()}>
            <ControlLabel>フキダシの丸さ</ControlLabel>
            <FormControl
              type="number"
              value={this.props.countBorderRadius}
              onChange={e => this.props.funcCountBorderRadius(e.target.value)}
            />
            <HelpBlock>フキダシの丸さを指定します。小さい数字にするほど四角に近づき、大きい数字にするほど丸くなります。</HelpBlock>
          </FormGroup>
        </div>
      );

    }


    // --------------------------------------------------
    //   Type2 の場合
    // --------------------------------------------------

    if (this.props.currentThemeType === 'type2') {

      codeArr.push(
        <div className="form-group-margin" key="count-background-color">
          <FormGroup controlId="count-background-color" validationState="success">
            <Checkbox checked={this.props.countBackgroundColor} onChange={e => this.props.funcCountBackgroundColor(e.target.checked)}>
              背景色を表示する（編集時のみ）
            </Checkbox>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-background-color-hex">
          <FormGroup controlId="count-background-color-hex" bsSize="sm" validationState="success">
            <ControlLabel>背景色（編集時のみ）</ControlLabel>
            <SketchPicker
              color={this.props.countBackgroundColorHex}
              onChangeComplete={color => this.props.funcCountBackgroundColorHex(color.hex)}
              disableAlpha
            />
            <HelpBlock>テーマタイプが「Type2」の場合、画像の上にシェア数を表示します。この場合、シェア数は四角いレイヤーを画像の上に重ねるような形で表示されます。通常はそのレイヤーは透明で見えないものなのですが、わかりやすいように編集時のみ色をつけて表示することができます。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-width">
          <FormGroup bsSize="sm" validationState={this.validationStateCountWidth()}>
            <ControlLabel>シェア数 横幅</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>横幅</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="1"
                  value={this.props.countWidth}
                  onChange={e => this.props.funcCountWidth(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>シェア数を表示するレイヤーの横幅を指定してください。シェア数を画像の中央に表示する場合は、ボタン画像の横幅と同じ数値を指定すると綺麗に表示されます。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-top-left">
          <FormGroup bsSize="sm" validationState={this.validationStateCountTopLeft()}>
            <ControlLabel>シェア数 位置指定</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>Top</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countTop}
                  onChange={e => this.props.funcCountTop(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Addon>Left</InputGroup.Addon>
                <FormControl
                  type="number"
                  min="0"
                  value={this.props.countLeft}
                  onChange={e => this.props.funcCountLeft(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>シェア数の表示位置を指定します。例）ボタン画像を基準にして上から10ピクセル、左から20ピクセルの位置にシェア数を表示。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-padding-for-ios">
          <FormGroup bsSize="sm" validationState={this.validationStateCountPaddingForIos()}>
            <ControlLabel>シェア数の位置 / ズレ修正用 for iOS</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingTopForIos}
                  onChange={e => this.props.funcCountPaddingTopForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingRightForIos}
                  onChange={e => this.props.funcCountPaddingRightForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingBottomForIos}
                  onChange={e => this.props.funcCountPaddingBottomForIos(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingLeftForIos}
                  onChange={e => this.props.funcCountPaddingLeftForIos(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>モバイル環境でシェアボタンを表示した場合、使用するフォントや指定したフォントのサイズによって、シェア数の文字位置が若干ずれることがあります。そのズレを修正するためのフォームです。iOS環境でズレが確認された場合は、こちらのフォームで文字の位置を修正してください。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-padding-for-android">
          <FormGroup bsSize="sm" validationState={this.validationStateCountPaddingForAndroid()}>
            <ControlLabel>シェア数の位置 / ズレ修正用 for Android</ControlLabel>
            <div className="form-inline">
              <InputGroup className="inline-margin">
                <InputGroup.Addon>上</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingTopForAndroid}
                  onChange={e => this.props.funcCountPaddingTopForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>右</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingRightForAndroid}
                  onChange={e => this.props.funcCountPaddingRightForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>下</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingBottomForAndroid}
                  onChange={e => this.props.funcCountPaddingBottomForAndroid(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="inline-margin">
                <InputGroup.Addon>左</InputGroup.Addon>
                <FormControl
                  type="number"
                  value={this.props.countPaddingLeftForAndroid}
                  onChange={e => this.props.funcCountPaddingLeftForAndroid(e.target.value)}
                />
              </InputGroup>
            </div>
            <HelpBlock>上記フォームのAndroid用です。</HelpBlock>
          </FormGroup>
        </div>
      );

      codeArr.push(
        <div className="form-group-margin" key="count-text-align">
          <FormGroup controlId="count-text-align" validationState="success">
            <ControlLabel>シェア数の文字揃え</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.countTextAlign}
              onChange={e => this.props.funcCountTextAlign(e.target.value)}
            >
              <option value="left">左寄せ</option>
              <option value="center">中央</option>
              <option value="right">右寄せ</option>
            </FormControl>
            <HelpBlock>シェア数を表示するレイヤー内部のどこに数値を表示するかを指定します。</HelpBlock>
          </FormGroup>
        </div>
      );

    }


    codeArr.push(
      <div className="form-group-margin" key="count-font">
        <FormGroup controlId="count-font" bsSize="sm" validationState="success">
          <ControlLabel>シェア数のフォント</ControlLabel>
          <FormControl
            type="text"
            value={this.props.countFont}
            onChange={e => this.props.funcCountFont(e.target.value)}
          />
          <HelpBlock>font-family で指定できるフォントを入力できます。OSが変わるとフォントが正常に表示されないことがありますので、HTMLやCSSの知識が必要になります。Google Fontsが入力されている場合はそちらを優先して表示します。例）sans-serif / arial black / Impact</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="count-google-font">
        <FormGroup controlId="count-google-font" bsSize="sm" validationState="success">
          <ControlLabel>シェア数のフォント - Google Fonts</ControlLabel>
          <FormControl
            type="text"
            value={this.props.countGoogleFont}
            onChange={e => this.props.funcCountGoogleFont(e.target.value)}
          />
          <HelpBlock>シェア数のフォントにGoogle Fontsを利用できます。こちらの場合はOSが変わってもフォントは同じものが表示されます。<a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">公式サイト</a> をチェックしてフォント名を正確に入力してください。例）Federo / Playfair Display / Anton</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="count-font-color">
        <FormGroup validationState="success">
          <ControlLabel>シェア数の文字色</ControlLabel>
          <SketchPicker
            color={this.props.countFontColor}
            onChangeComplete={color => this.props.funcCountFontColor(color.hex)}
            disableAlpha
          />
          <HelpBlock>シェア数の文字色を指定してください。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="count-font-size">
        <FormGroup controlId="count-font-size" bsSize="sm" validationState={this.validationStateCountFontSize()}>
          <ControlLabel>シェア数の文字サイズ</ControlLabel>
          <FormControl
            type="number"
            min="8"
            value={this.props.countFontSize}
            onChange={e => this.props.funcCountFontSize(e.target.value)}
          />
          <HelpBlock>シェア数の文字の大きさを設定できます。8が最小のサイズです。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="count-font-style">
        <FormGroup controlId="count-font-style" validationState="success">
          <ControlLabel>シェア数の文字スタイル</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.countFontStyle}
            onChange={e => this.props.funcCountFontStyle(e.target.value)}
          >
            <option value="normal">標準（normal）</option>
            <option value="italic">イタリック（italic）</option>
            <option value="oblique">斜体（oblique）</option>
          </FormControl>
          <HelpBlock>シェア数の文字を斜めにすることができます。斜めにしたい場合はイタリック（italic）を選んでください。斜体（oblique）も斜めにする設定ですが、対応しているフォントが少ないため、ほぼ選ぶ必要はありません。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="count-font-weight">
        <FormGroup controlId="count-font-weight" validationState="success">
          <ControlLabel>シェア数の文字の太さ</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.countFontWeight}
            onChange={e => this.props.funcCountFontWeight(e.target.value)}
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400（標準）</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </FormControl>
          <HelpBlock>シェア数の文字の太さを設定します。小さい数字ほど文字が細くなり、大きな数字ほど文字が太くなります。</HelpBlock>
        </FormGroup>
      </div>
    );

    return codeArr;

  }

  /**
   * フリー画像（ネコ）設定
   * @return {array} コードの配列
   */
  codeOptionFreeImage() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'free-image' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    if (this.props.plan !== 'free') {
      codeArr.push(
        <div key="free-image">
          <FormGroup controlId="free-image" validationState="success">
            <Checkbox checked={this.props.freeImage} onChange={e => this.props.funcFreeImage(e.target.checked)}>
              フリー画像（ネコ）を表示する
            </Checkbox>
          </FormGroup>
        </div>
      );
    }

    codeArr.push(
      <div className="form-group-margin" key="free-image-type">
        <FormGroup controlId="free-image-type" validationState="success">
          <ControlLabel>フリー画像のタイプ</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.freeImageType}
            onChange={e => this.props.funcFreeImageType(e.target.value)}
          >
            <option value="1">ネコ - 全身</option>
            <option value="2">ネコ - 顔</option>
          </FormControl>
          <HelpBlock>フリー画像を変更することができます。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-image-vertical-align">
        <FormGroup controlId="free-image-vertical-align" validationState="success">
          <ControlLabel>縦の表示位置</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.freeImageVerticalAlign}
            onChange={e => this.props.funcFreeImageVerticalAlign(e.target.value)}
          >
            <option value="top">上</option>
            <option value="middle">中央</option>
            <option value="bottom">下</option>
          </FormControl>
          <HelpBlock>上・下を選ぶと、フリー画像（ネコ）は上部・下部に貼り付くように表示されます。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-image-width-height">
        <FormGroup bsSize="sm" validationState={this.validationStateFreeImageWidthHeight()}>
          <ControlLabel>横幅・縦幅</ControlLabel>
          <Checkbox checked={this.props.freeImageAspectRatioFixed} onChange={e => this.props.funcFreeImageAspectRatioFixed(e.target.checked)}>
            縦横比を固定する
          </Checkbox>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>横幅</InputGroup.Addon>
              <FormControl
                type="number"
                min="20"
                value={this.props.freeImageWidth}
                onChange={e => this.props.funcFreeImageWidth(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>縦幅</InputGroup.Addon>
              <FormControl
                type="number"
                min="20"
                value={this.props.freeImageHeight}
                onChange={e => this.props.funcFreeImageHeight(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>フリー画像（ネコ）のサイズを指定してください。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-image-margin">
        <FormGroup bsSize="sm" validationState={this.validationStateFreeImageMargin()}>
          <ControlLabel>余白・外側</ControlLabel>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>上</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeImageMarginTop}
                onChange={e => this.props.funcFreeImageMarginTop(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>右</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeImageMarginRight}
                onChange={e => this.props.funcFreeImageMarginRight(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>下</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeImageMarginBottom}
                onChange={e => this.props.funcFreeImageMarginBottom(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>左</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeImageMarginLeft}
                onChange={e => this.props.funcFreeImageMarginLeft(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>フリー画像（ネコ）の表示位置を調整する値です。</HelpBlock>
        </FormGroup>
      </div>
    );

    return codeArr;

  }


  /**
   * フリー画像（オリジナル）設定
   * @return {array} コードの配列
   */
  codeOptionFreeUploadImage() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'free-upload-image' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    codeArr.push(
      <div key="free-upload-image">
        <FormGroup controlId="free-upload-image" validationState="success">
          <Checkbox checked={this.props.freeUploadImage} onChange={e => this.props.funcFreeUploadImage(e.target.checked)}>
            フリー画像（オリジナル）を表示する
          </Checkbox>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-upload-image-file">
        <FormGroup controlId="free-upload-image-file" validationState="success">
          <ControlLabel>フリー画像（オリジナル） アップロード</ControlLabel>
          <FormControl
            type="file"
            onChange={e => this.props.funcFreeUploadImageFile(e.target.files[0])}
          />
          <HelpBlock>アップロードする画像のタイプを選んでから画像ファイルを選択してください。画像ファイルは500KBまでのPNG,GIF,JPEG,SVGを利用することができます。ファイルサイズの大きな画像を利用する場合は、画像編集ソフトなどで軽量化してからアップロードすることをおすすめします。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-upload-image-url">
        <FormGroup controlId="free-upload-image-url" bsSize="sm" validationState={this.validationStateFreeUploadImageUrl()}>
          <ControlLabel>リンクURL</ControlLabel>
          <FormControl
            type="text"
            value={this.props.freeUploadImageUrl}
            onChange={e => this.props.funcFreeUploadImageUrl(e.target.value)}
          />
          <HelpBlock>画像に貼るリンクのURLを入力してください。例）https://gameusers.org/app/share-buttons</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-upload-image-alt">
        <FormGroup controlId="free-upload-image-alt" bsSize="sm" validationState="success">
          <ControlLabel>alt属性</ControlLabel>
          <FormControl
            type="text"
            value={this.props.freeUploadImageAlt}
            onChange={e => this.props.funcFreeUploadImageAlt(e.target.value)}
          />
          <HelpBlock>音声読み上げブラウザでアクセスした場合や、なんらかの理由で画像の表示に失敗したときに、代わりに表示される文字列を指定します。画像（アイコン）の名前や、リンクを貼ったサイトの名前などが適切です。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin"key="free-upload-image-vertical-align">
        <FormGroup controlId="free-upload-image-vertical-align" validationState="success">
          <ControlLabel>縦の表示位置</ControlLabel>
          <FormControl
            componentClass="select"
            value={this.props.freeUploadImageVerticalAlign}
            onChange={e => this.props.funcFreeUploadImageVerticalAlign(e.target.value)}
          >
            <option value="top">上</option>
            <option value="middle">中央</option>
            <option value="bottom">下</option>
          </FormControl>
          <HelpBlock>上・下を選ぶと、フリー画像（オリジナル）は上部・下部に貼り付くように表示されます。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-upload-image-width-height">
        <FormGroup bsSize="sm" validationState={this.validationStateFreeUploadImageWidthHeight()}>
          <ControlLabel>横幅・縦幅</ControlLabel>
          <Checkbox checked={this.props.freeUploadImageAspectRatioFixed} onChange={e => this.props.funcFreeUploadImageAspectRatioFixed(e.target.checked)}>
            縦横比を固定する
          </Checkbox>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>横幅</InputGroup.Addon>
              <FormControl
                type="number"
                min="1"
                value={this.props.freeUploadImageWidth}
                onChange={e => this.props.funcFreeUploadImageWidth(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>縦幅</InputGroup.Addon>
              <FormControl
                type="number"
                min="1"
                value={this.props.freeUploadImageHeight}
                onChange={e => this.props.funcFreeUploadImageHeight(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>フリー画像（オリジナル）のサイズを指定してください。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="free-upload-image-margin">
        <FormGroup bsSize="sm" validationState={this.validationStateFreeUploadImageMargin()}>
          <ControlLabel>余白・外側</ControlLabel>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>上</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeUploadImageMarginTop}
                onChange={e => this.props.funcFreeUploadImageMarginTop(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>右</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeUploadImageMarginRight}
                onChange={e => this.props.funcFreeUploadImageMarginRight(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>下</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeUploadImageMarginBottom}
                onChange={e => this.props.funcFreeUploadImageMarginBottom(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>左</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.freeUploadImageMarginLeft}
                onChange={e => this.props.funcFreeUploadImageMarginLeft(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>フリー画像（オリジナル）の表示位置を調整する値です。</HelpBlock>
        </FormGroup>
      </div>
    );

    return codeArr;

  }

  /**
   * 余白設定
   * @return {array} コードの配列
   */
  codeOptionMargin() {


    // --------------------------------------------------
    //   設定を表示しない
    // --------------------------------------------------

    if (this.props.optionType !== 'margin' && this.props.optionType !== 'all') {
      return;
    }


    const codeArr = [];

    codeArr.push(
      <hr className="hr-text" data-content="AND" key="hr" />
    );

    codeArr.push(
      <div key="box-margin">
        <FormGroup bsSize="sm" validationState={this.validationStateBoxMargin()}>
          <ControlLabel>ボタン画像とフキダシ（1セット） - 余白・外側</ControlLabel>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>上</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.boxMarginTop}
                onChange={e => this.props.funcBoxMarginTop(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>右</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.boxMarginRight}
                onChange={e => this.props.funcBoxMarginRight(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>下</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.boxMarginBottom}
                onChange={e => this.props.funcBoxMarginBottom(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>左</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.boxMarginLeft}
                onChange={e => this.props.funcBoxMarginLeft(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>ボタン画像とフキダシを1セットにして、そのセット間の距離を調整する値です。またシェアボタン全体の横幅が大きい場合、1行で収まりきらないため折り返されて表示されます。その際の上下間のスペースを指定します。</HelpBlock>
        </FormGroup>
      </div>
    );

    codeArr.push(
      <div className="form-group-margin" key="margin">
        <FormGroup bsSize="sm" validationState={this.validationStateMargin()}>
          <ControlLabel>全体 - 余白・外側</ControlLabel>
          <div className="form-inline">
            <InputGroup className="inline-margin">
              <InputGroup.Addon>上</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.marginTop}
                onChange={e => this.props.funcMarginTop(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>右</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.marginRight}
                onChange={e => this.props.funcMarginRight(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>下</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.marginBottom}
                onChange={e => this.props.funcMarginBottom(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="inline-margin">
              <InputGroup.Addon>左</InputGroup.Addon>
              <FormControl
                type="number"
                min="0"
                value={this.props.marginLeft}
                onChange={e => this.props.funcMarginLeft(e.target.value)}
              />
            </InputGroup>
          </div>
          <HelpBlock>シェアボタン全体の余白を調整します。例えばシェアボタンを記事上部に掲載したとします。シェアボタンと下の記事との距離を大きくする場合は「下」と書かれているフォームの数値を大きくします。</HelpBlock>
        </FormGroup>
      </div>
    );

    return codeArr;

  }



  // --------------------------------------------------
  //   Render Sample Theme
  // --------------------------------------------------

  /**
   * 編集用のサンプルテーマのコードを返す
   * @return {string} サンプルテーマのコード
   */
  renderSampleTheme() {


    // --------------------------------------------------
    //   アップロードした画像をセット
    // --------------------------------------------------

    instanceGameUsersShareButtonsOption.setUploadImageObj(this.props.uploadImageMap);


    // --------------------------------------------------
    //   名前の設定
    // --------------------------------------------------

    const namePrev = this.props.dataSampleThemesMap.getIn([this.props.currentThemeNameId, 'namePrev']);
    const dataObj = this.props.dataSampleThemesMap.getIn([this.props.currentThemeNameId, this.props.currentThemeType]).toJS();

    if (namePrev) {
      dataObj.name = namePrev;
    } else {
      dataObj.name = 'new';
      dataObj.id = 'theme';
    }


    // --------------------------------------------------
    //   コード取得
    // --------------------------------------------------

    instanceGameUsersShareButtonsOption.setJsonObj(dataObj);

    let themeUrl = null;

    if (this.props.pageType === 'official') {
      themeUrl = OFFICIAL_THEME_DESIGN_URL;
    }

    return { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('sample', themeUrl, true) };


  }


  /**
   * サンプルテーマの遅れて行う処理
   * componentDidMountでDOMを描画後に処理を行う
   */
  renderSampleThemeLater() {


    // --------------------------------------------------
    //   Background Color Only Edit
    //   テーマタイプが「Type2」の場合、画像の上にシェア数のレイヤーを表示します。編集時のみ
    // --------------------------------------------------

    const elementsArr = [...document.querySelectorAll(`#sample-theme .game-users-share-buttons-${this.props.currentThemeNameId}-sample-box-count`)];

    if (elementsArr.length > 0) {

      elementsArr.forEach((element) => {

        const copyElement = element;

        if (this.props.countBackgroundColor) {
          copyElement.style.backgroundColor = this.props.countBackgroundColorHex;
        } else {
          copyElement.style.backgroundColor = '';
        }
      });

    }


    // --------------------------------------------------
    //   Sort Drag and Drop
    //   ボタンの並び替えができるようにする / jQuery UI 使用
    // --------------------------------------------------

    jQuery('#sample-theme > div').sortable({
      cancel: '.free',
      containment: 'parent',
      tolerance: 'pointer',
      update: () => {
        this.props.funcSortShareObj();
      }
    });


    // --------------------------------------------------
    //   Count
    // --------------------------------------------------

    instanceGameUsersShareButtonsOption.setCountInput(this.props.countInput);
    instanceGameUsersShareButtonsOption.setCountInputMin(this.props.countInputMin);
    instanceGameUsersShareButtonsOption.setCountInputMax(this.props.countInputMax);
    instanceGameUsersShareButtonsOption.count(true);


  }




  /**
   * 余白設定
   * @return {array} コードの配列
   */
  // codeOptionMargin2() {
  //
  //
  //   // --------------------------------------------------
  //   //   設定を表示しない
  //   // --------------------------------------------------
  //
  //   if (this.props.optionType !== 'margin' && this.props.optionType !== 'all') {
  //     return;
  //   }
  //
  //
  //   const codeArr = [];
  //
  //   codeArr.push(
  //     <hr className="hr-text" data-content="AND" key="hr" />
  //   );
  //
  //   return codeArr;
  //
  // }



  render() {

    return (
      <div className="edit-theme-form" id="edit-theme-form">



        <hr className="hr-text" data-content="SAMPLE" />



        <FormGroup controlId="sample-sticky">
          <Checkbox
            id="sample-sticky"
            checked={this.props.checkStickySampleTheme}
            onChange={e => this.props.funcCheckStickySampleTheme(e.target.checked)}
          >
            サンプルを画面上部に固定する
          </Checkbox>
        </FormGroup>



        <div className={this.props.checkStickySampleTheme ? 'sample-theme-box sticky' : 'sample-theme-box'} id="sample-theme-box">
          <div className="sample-theme" id="sample-theme" dangerouslySetInnerHTML={this.renderSampleTheme()} />
          <div className="submit-button">
            <Button
              bsStyle="success"
              bsSize="xsmall"
              className="ladda-button outline-none"
              data-style="expand-right"
              data-size="xs"
              onClick={e => this.props.funcAjaxSaveTheme(
                this.props.stateModel,
                e.currentTarget
              )}
            >
              <span className="ladda-label">保存する</span>
            </Button>
          </div>
        </div>



        <hr className="hr-text" data-content="OPTION" />



        <FormGroup className="theme-type-box" controlId="theme-type" validationState="success">
          <ControlLabel>テーマタイプ</ControlLabel>
          <FormControl componentClass="select" value={this.props.currentThemeType} onChange={e => this.props.funcCurrentThemeType(e.target.value)}>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </FormControl>
          {(() => {
            let code = null;
            if (this.props.currentThemeType === 'type1') {
              code = <HelpBlock>シェア数がフキダシで表示されます。フキダシの位置は上下左右から選ぶことができます。</HelpBlock>;
            } else {
              code = <HelpBlock>シェア数を画像の上に重ねて表示することができます。フキダシは表示されません。</HelpBlock>;
            }
            return code;
          })()}
        </FormGroup>


        <FormGroup
          controlId="name"
          bsSize="sm"
          validationState={this.validationStateName()}
        >
          <ControlLabel>テーマ名</ControlLabel>
          <FormControl
            type="text"
            value={this.props.name}
            maxLength="20"
            onChange={e => this.props.funcName(e.target.value)}
          />
          <HelpBlock>テーマ名を入力してください。小文字のアルファベットと数字が利用できます。</HelpBlock>
        </FormGroup>


        <FormGroup validationState={this.validationStateShareImage()}>
          <ControlLabel>画像アップロード</ControlLabel>

          <FormControl
            componentClass="select"
            className="share-image-type"
            id="share-image-type"
          >
            {(() => {
              const codeArr = [];
              Object.keys(shareObj).forEach((key) => {
                const { name } = shareObj[key];
                codeArr.push(<option value={key} key={key}>{name}</option>);
              });
              return codeArr;
            })()}
          </FormControl>

          <FormControl
            type="file"
            id="share-image"
            onChange={e => this.props.funcShareImage(e.target.files[0])}
          />

          <HelpBlock>アップロードする画像のタイプを選んでから画像ファイルを選択してください。画像ファイルは500KBまでのPNG,GIF,JPEG,SVGを利用することができます。ファイルサイズの大きな画像を利用する場合は、画像編集ソフトなどで軽量化してからアップロードすることをおすすめします。</HelpBlock>

          <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverForUploadImage}>
            <Button bsStyle="danger" bsSize="xsmall"><span className="glyphicon glyphicon-info-sign" aria-hidden="true" /> モバイル環境で綺麗に表示するには？</Button>
          </OverlayTrigger>
        </FormGroup>



        <hr className="hr-text" data-content="AND" />



        <FormGroup controlId="option-type" validationState={null}>
          <ControlLabel>設定表示</ControlLabel>
          <FormControl componentClass="select" value={this.props.optionType} onChange={e => this.props.funcOptionType(e.target.value)}>
            <option value="" />
            <option value="share-individual">個別設定</option>
            <option value="share-image">ボタン画像設定</option>
            <option value="share-count">シェア数・フキダシ設定</option>
            <option value="free-image">フリー画像（ネコ）設定</option>
            {(() => {
              if (this.props.plan !== 'free') {
                return (<option value="free-upload-image">フリー画像（オリジナル）設定</option>);
              }
            })()}
            <option value="margin">余白設定</option>
            <option value="all">すべて</option>
          </FormControl>
        </FormGroup>


        {this.codeOptionShareIndividual()}
        {this.codeOptionShareImage()}
        {this.codeOptionShareCount()}
        {this.codeOptionFreeImage()}
        {this.codeOptionFreeUploadImage()}
        {this.codeOptionMargin()}


      </div>
    );

  }

}

ContentEditForm.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  plan: PropTypes.string.isRequired,

  stateModel: PropTypes.instanceOf(Model).isRequired,

  pageType: PropTypes.string.isRequired,

  checkStickySampleTheme: PropTypes.bool.isRequired,
  currentThemeNameId: PropTypes.string.isRequired,
  currentThemeType: PropTypes.string.isRequired,
  optionType: PropTypes.string.isRequired,
  shareType: PropTypes.string.isRequired,
  shareImageAspectRatioFixed: PropTypes.bool.isRequired,
  freeImageAspectRatioFixed: PropTypes.bool.isRequired,
  freeUploadImageAspectRatioFixed: PropTypes.bool.isRequired,
  countInput: PropTypes.string,
  countInputMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countInputMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countBackgroundColor: PropTypes.bool.isRequired,
  countBackgroundColorHex: PropTypes.string.isRequired,

  dataSampleThemesMap: PropTypes.instanceOf(Map).isRequired,
  uploadImageMap: PropTypes.instanceOf(Map).isRequired,


  // --------------------------------------------------
  //   Form
  // --------------------------------------------------

  name: PropTypes.string,

  shareButton: PropTypes.bool,
  shareCount: PropTypes.bool,
  shareCountDefaultText: PropTypes.string,
  shareCountMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareCountMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  shareImageVerticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  shareImageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareImageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareImageMarginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareImageMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareImageMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shareImageMarginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),


  count: PropTypes.bool,
  countDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  countVerticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  countWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countMarginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countMarginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingTopForIos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingRightForIos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingBottomForIos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingLeftForIos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingTopForAndroid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingRightForAndroid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingBottomForAndroid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countPaddingLeftForAndroid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countBorderColor: PropTypes.string,
  countBorderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countTextAlign: PropTypes.oneOf(['left', 'center', 'right']),
  countFont: PropTypes.string,
  countGoogleFont: PropTypes.string,
  countFontColor: PropTypes.string,
  countFontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countFontStyle: PropTypes.string,
  countFontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  freeImage: PropTypes.bool.isRequired,
  freeImageType: PropTypes.number,
  freeImageVerticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']).isRequired,
  freeImageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeImageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeImageMarginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeImageMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeImageMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeImageMarginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  freeUploadImage: PropTypes.bool.isRequired,
  freeUploadImageUrl: PropTypes.string.isRequired,
  freeUploadImageAlt: PropTypes.string.isRequired,
  freeUploadImageVerticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']).isRequired,
  freeUploadImageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeUploadImageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeUploadImageMarginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeUploadImageMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeUploadImageMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  freeUploadImageMarginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  boxMarginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  boxMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  boxMarginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  boxMarginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  marginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  marginLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,



  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcCheckStickySampleTheme: PropTypes.func.isRequired,
  funcCurrentThemeType: PropTypes.func.isRequired,
  funcName: PropTypes.func.isRequired,
  funcShareImage: PropTypes.func.isRequired,
  funcOptionType: PropTypes.func.isRequired,
  funcShareImageAspectRatioFixed: PropTypes.func.isRequired,
  funcFreeImageAspectRatioFixed: PropTypes.func.isRequired,
  funcFreeUploadImageAspectRatioFixed: PropTypes.func.isRequired,

  funcShareType: PropTypes.func.isRequired,
  funcShareButton: PropTypes.func.isRequired,
  funcShareCount: PropTypes.func.isRequired,
  funcShareCountDefaultText: PropTypes.func.isRequired,
  funcShareCountMin: PropTypes.func.isRequired,
  funcShareCountMax: PropTypes.func.isRequired,
  funcShareImageDelete: PropTypes.func.isRequired,

  funcShareImageVerticalAlign: PropTypes.func.isRequired,
  funcShareImageWidth: PropTypes.func.isRequired,
  funcShareImageHeight: PropTypes.func.isRequired,
  funcShareImageMarginTop: PropTypes.func.isRequired,
  funcShareImageMarginRight: PropTypes.func.isRequired,
  funcShareImageMarginBottom: PropTypes.func.isRequired,
  funcShareImageMarginLeft: PropTypes.func.isRequired,

  funcCountInput: PropTypes.func.isRequired,
  funcCountInputMin: PropTypes.func.isRequired,
  funcCountInputMax: PropTypes.func.isRequired,
  funcCount: PropTypes.func.isRequired,
  funcCountDirection: PropTypes.func.isRequired,
  funcCountVerticalAlign: PropTypes.func.isRequired,
  funcCountWidth: PropTypes.func.isRequired,
  funcCountHeight: PropTypes.func.isRequired,
  funcCountMarginTop: PropTypes.func.isRequired,
  funcCountMarginRight: PropTypes.func.isRequired,
  funcCountMarginBottom: PropTypes.func.isRequired,
  funcCountMarginLeft: PropTypes.func.isRequired,
  funcCountPaddingTop: PropTypes.func.isRequired,
  funcCountPaddingRight: PropTypes.func.isRequired,
  funcCountPaddingBottom: PropTypes.func.isRequired,
  funcCountPaddingLeft: PropTypes.func.isRequired,
  funcCountPaddingTopForIos: PropTypes.func.isRequired,
  funcCountPaddingRightForIos: PropTypes.func.isRequired,
  funcCountPaddingBottomForIos: PropTypes.func.isRequired,
  funcCountPaddingLeftForIos: PropTypes.func.isRequired,
  funcCountPaddingTopForAndroid: PropTypes.func.isRequired,
  funcCountPaddingRightForAndroid: PropTypes.func.isRequired,
  funcCountPaddingBottomForAndroid: PropTypes.func.isRequired,
  funcCountPaddingLeftForAndroid: PropTypes.func.isRequired,
  funcCountBorderColor: PropTypes.func.isRequired,
  funcCountBorderRadius: PropTypes.func.isRequired,
  funcCountBackgroundColor: PropTypes.func.isRequired,
  funcCountBackgroundColorHex: PropTypes.func.isRequired,
  funcCountTop: PropTypes.func.isRequired,
  funcCountLeft: PropTypes.func.isRequired,
  funcCountTextAlign: PropTypes.func.isRequired,
  funcCountFont: PropTypes.func.isRequired,
  funcCountGoogleFont: PropTypes.func.isRequired,
  funcCountFontColor: PropTypes.func.isRequired,
  funcCountFontSize: PropTypes.func.isRequired,
  funcCountFontStyle: PropTypes.func.isRequired,
  funcCountFontWeight: PropTypes.func.isRequired,

  funcFreeImage: PropTypes.func.isRequired,
  funcFreeImageType: PropTypes.func.isRequired,
  funcFreeImageVerticalAlign: PropTypes.func.isRequired,
  funcFreeImageWidth: PropTypes.func.isRequired,
  funcFreeImageHeight: PropTypes.func.isRequired,
  funcFreeImageMarginTop: PropTypes.func.isRequired,
  funcFreeImageMarginRight: PropTypes.func.isRequired,
  funcFreeImageMarginBottom: PropTypes.func.isRequired,
  funcFreeImageMarginLeft: PropTypes.func.isRequired,

  funcFreeUploadImage: PropTypes.func.isRequired,
  funcFreeUploadImageFile: PropTypes.func.isRequired,
  funcFreeUploadImageUrl: PropTypes.func.isRequired,
  funcFreeUploadImageAlt: PropTypes.func.isRequired,
  funcFreeUploadImageVerticalAlign: PropTypes.func.isRequired,
  funcFreeUploadImageWidth: PropTypes.func.isRequired,
  funcFreeUploadImageHeight: PropTypes.func.isRequired,
  funcFreeUploadImageMarginTop: PropTypes.func.isRequired,
  funcFreeUploadImageMarginRight: PropTypes.func.isRequired,
  funcFreeUploadImageMarginBottom: PropTypes.func.isRequired,
  funcFreeUploadImageMarginLeft: PropTypes.func.isRequired,

  funcBoxMarginTop: PropTypes.func.isRequired,
  funcBoxMarginRight: PropTypes.func.isRequired,
  funcBoxMarginBottom: PropTypes.func.isRequired,
  funcBoxMarginLeft: PropTypes.func.isRequired,
  funcMarginTop: PropTypes.func.isRequired,
  funcMarginRight: PropTypes.func.isRequired,
  funcMarginBottom: PropTypes.func.isRequired,
  funcMarginLeft: PropTypes.func.isRequired,

  funcSortShareObj: PropTypes.func.isRequired,

  funcAjaxSaveTheme: PropTypes.func.isRequired,

};

ContentEditForm.defaultProps = {

  name: '',

  shareButton: true,
  shareCount: true,
  shareCountDefaultText: '',
  shareCountMin: '',
  shareCountMax: '',

  shareImageVerticalAlign: 'middle',
  shareImageWidth: '',
  shareImageHeight: '',
  shareImageMarginTop: 10,
  shareImageMarginRight: 0,
  shareImageMarginBottom: 0,
  shareImageMarginLeft: 0,

  countInput: '',
  countInputMin: 0,
  countInputMax: 9999,
  count: true,
  countDirection: 'top',
  countVerticalAlign: 'middle',
  countWidth: '',
  countHeight: '',
  countMarginTop: 0,
  countMarginRight: 0,
  countMarginBottom: 0,
  countMarginLeft: 0,
  countPaddingTop: 0,
  countPaddingRight: 0,
  countPaddingBottom: 0,
  countPaddingLeft: 0,
  countPaddingTopForIos: 0,
  countPaddingRightForIos: 0,
  countPaddingBottomForIos: 0,
  countPaddingLeftForIos: 0,
  countPaddingTopForAndroid: 0,
  countPaddingRightForAndroid: 0,
  countPaddingBottomForAndroid: 0,
  countPaddingLeftForAndroid: 0,
  countBorderColor: '',
  countBorderRadius: 3,
  countTop: 0,
  countLeft: 0,
  countTextAlign: 'center',
  countFont: '',
  countGoogleFont: '',
  countFontColor: '',
  countFontSize: 16,
  countFontStyle: 'normal',
  countFontWeight: 400,

  freeImageType: 1,

};


export default ContentEditForm;
