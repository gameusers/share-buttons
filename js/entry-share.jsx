// --------------------------------------------------
//   Import
// --------------------------------------------------

import setGoogleFonts from './modules/font';



export class GameUsersShareButtonsCommon {
  static escapeHtml(value) {
    if (typeof value !== 'string') {
      return value;
    }
    return value.replace(/[&'`"<>]/g, (match) => {
      const string = {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match];
      return string;
    });
  }
}



export const PLUGIN_URL = (() => {

  let src = null;
  if (document.currentScript) {
    ({ src } = document.currentScript);
  } else {
    const scripts = document.getElementsByTagName('script');
    const script = scripts[scripts.length - 1];
    if (script.src) {
      ({ src } = script);
    }
  }
  const directoryName = 'game-users-share-buttons';
  const scrArr = src.split(directoryName);

  return GameUsersShareButtonsCommon.escapeHtml(`${scrArr[0]}${directoryName}/`);

})();



export class GameUsersShareButtons {

  constructor() {

    this.gameUsersShareButtonsWebUrl = 'https://gameusers.org/app/share-buttons';
    this.gameUsersShareButtonsFreeImageAlt = 'Game Users Share Buttons';

    this.countObj = {};
    this.importGoogleFontsArr = [];

    this.shareObj = {
      twitter: 'Twitter',
      facebook: 'Facebook',
      'google-plus': 'Google+',
      pocket: 'Pocket',
      pinterest: 'Pinterest',
      linkedin: 'LinkedIn',
      tumblr: 'Tumblr',
      hatena: 'Hatena',
      line: 'Line',
      feedly: 'Feedly',
      rss: 'RSS',
      mail: 'Mail'
    };

    this.optionJsonObj = {};

    this.jsonObj = {};
    this.code = '';
    this.className = '';

    this.shareButtonsBaseUrl = PLUGIN_URL;
    this.shareButtonsFreeImageBaseUrl = `${this.shareButtonsBaseUrl}img/`;


    this.containerSelector = '';

    if (document.getElementById('game-users-share-buttons-official')) {
      this.containerSelector = '#game-users-share-buttons-official ';
    }

  }


  setJsonObj(value) {
    this.jsonObj = value;
  }


  setOptionJsonObj(value) {
    this.optionJsonObj = value;
  }


  shareButtons() {

    this.code = '';

    const themeName = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.name);
    const themeId = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.id);
    this.className = `game-users-share-buttons-${themeName}-${themeId}`;

    if (this.jsonObj.style.type === 1 && this.jsonObj.style.version === 1) {
      this.styleType1Ver1();
    } else if (this.jsonObj.style.type === 2 && this.jsonObj.style.version === 1) {
      this.styleType2Ver1();
    }

    if (this.jsonObj.theme.type === 1 && this.jsonObj.theme.version === 1) {
      this.themeType1Ver1();
    } else if (this.jsonObj.theme.type === 2 && this.jsonObj.theme.version === 1) {
      this.themeType2Ver1();
    }

    return this.code;

  }


  static styleAddPx(argument) {
    let value = null;

    if (argument > 0) {
      value = `${argument}px`;
    } else {
      value = '0';
    }

    return GameUsersShareButtonsCommon.escapeHtml(value);
  }

  static styleAddPxPlus(argumentValue, argumentStyle) {
    let value = null;

    if (argumentValue === null) {
      value = '';
    } else if (argumentValue > 0) {
      value = `${argumentStyle}: ${argumentValue}px;`;
    } else {
      value = `${argumentStyle}: 0;`;
    }

    return GameUsersShareButtonsCommon.escapeHtml(value);
  }

  static styleVerticalAlign(argument) {
    let value = '';

    if (argument === 'top') {

      value += '-webkit-box-align: start;';
      value += '-ms-flex-align: start;';
      value += 'align-items: flex-start;';

    } else if (argument === 'middle') {

      value += '-webkit-box-align: center;';
      value += '-ms-flex-align: center;';
      value += 'align-items: center;';

    } else {

      value += '-webkit-box-align: end;';
      value += '-ms-flex-align: end;';
      value += 'align-items: flex-end;';

    }

    return GameUsersShareButtonsCommon.escapeHtml(value);
  }



  styleType1Ver1() {


    // --------------------------------------------------
    //   Margin
    // --------------------------------------------------

    const marginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.marginTop);
    const marginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.marginRight);
    const marginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.marginBottom);
    const marginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.marginLeft);


    // --------------------------------------------------
    //   Share Image
    // --------------------------------------------------

    const shareImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.shareImageWidth, 'width');
    const shareImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.shareImageHeight, 'height');
    const shareImageVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.shareImageVerticalAlign);
    const shareImageMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.shareImageMarginTop);
    const shareImageMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.shareImageMarginRight);
    const shareImageMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.shareImageMarginBottom);
    const shareImageMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.shareImageMarginLeft);


    // --------------------------------------------------
    //   Count
    // --------------------------------------------------

    const countDirection = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countDirection);
    const countWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.countWidth, 'width');
    const countHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.countHeight, 'height');
    const countVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.countVerticalAlign);
    const countMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.countMarginTop);
    const countMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.countMarginRight);
    const countMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.countMarginBottom);
    const countMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.countMarginLeft);
    const countPaddingTop = GameUsersShareButtons.styleAddPx(this.jsonObj.countPaddingTop);
    const countPaddingRight = GameUsersShareButtons.styleAddPx(this.jsonObj.countPaddingRight);
    const countPaddingBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.countPaddingBottom);
    const countPaddingLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.countPaddingLeft);
    const countColor = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countColor);
    const countBorderColor = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countBorderColor);
    const countBorderRadius = GameUsersShareButtons.styleAddPx(this.jsonObj.countBorderRadius);

    const countFontColor = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontColor);

    // Count GoogleFont
    let countFont = '';

    if (this.jsonObj.countGoogleFont) {
      const replacedStr = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countGoogleFont.replace(/ /, '+'));

      if (this.importGoogleFontsArr.indexOf(replacedStr) === -1) {
        this.importGoogleFontsArr.push(replacedStr);
      }

      countFont += `'${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countGoogleFont)}', `;
    }

    if (this.jsonObj.countFont) {
      countFont += `'${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFont)}', `;
    }

    countFont += 'cursive';
    const countFontSize = GameUsersShareButtons.styleAddPx(this.jsonObj.countFontSize);
    const countFontStyle = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontStyle);
    const countFontWeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontWeight);


    // --------------------------------------------------
    //   Free Image
    // --------------------------------------------------

    let freeImageVerticalAlign = '';
    let freeImageWidth = '';
    let freeImageHeight = '';
    let freeImageMarginTop = '';
    let freeImageMarginRight = '';
    let freeImageMarginBottom = '';
    let freeImageMarginLeft = '';

    if (this.jsonObj.freeUploadImage) {
      freeImageVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.freeUploadImageVerticalAlign);
      freeImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeUploadImageWidth, 'width');
      freeImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeUploadImageHeight, 'height');
      freeImageMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginTop);
      freeImageMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginRight);
      freeImageMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginBottom);
      freeImageMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginLeft);
    } else {
      freeImageVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.freeImageVerticalAlign);
      freeImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeImageWidth, 'width');
      freeImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeImageHeight, 'height');
      freeImageMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginTop);
      freeImageMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginRight);
      freeImageMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginBottom);
      freeImageMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginLeft);
    }


    // --------------------------------------------------
    //   Box Margin
    // --------------------------------------------------

    const boxMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginTop);
    const boxMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginRight);
    const boxMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginBottom);
    const boxMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginLeft);


    let boxFlexFlow = '';

    if (countDirection === 'top' || countDirection === 'bottom') {

      boxFlexFlow += '-webkit-box-orient: vertical;';
      boxFlexFlow += '-webkit-box-direction: normal;';
      boxFlexFlow += '-ms-flex-flow: column nowrap;';
      boxFlexFlow += 'flex-flow: column nowrap;';

    } else {

      boxFlexFlow += '-webkit-box-orient: horizontal;';
      boxFlexFlow += '-webkit-box-direction: normal;';
      boxFlexFlow += '-ms-flex-flow: row nowrap;';
      boxFlexFlow += 'flex-flow: row nowrap;';

    }


    // --------------------------------------------------
    //   Code
    // --------------------------------------------------

    this.code += '<style type="text/css">';

    this.code += `.${this.className} {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += '  -webkit-box-orient: horizontal;';
    this.code += '  -webkit-box-direction: normal;';
    this.code += '  -ms-flex-flow: row wrap;';
    this.code += '  flex-flow: row wrap;';
    this.code += `  margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft};`;
    this.code += '  padding: 0;';
    this.code += '  border: 0;';
    this.code += '  font-size: 100%;';
    this.code += '  font: inherit;';
    this.code += '  line-height: 1;';
    // this.code += '  vertical-align: baseline;';
    // this.code += '  vertical-align: top;';
    this.code += '}';

    this.code += `.${this.className}-free {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += `  ${freeImageVerticalAlign}`;
    this.code += '}';

    this.code += `.${this.className}-free a, .${this.className}-free a:hover, .${this.className}-free a:focus {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += '  outline: none;';
    this.code += '}';

    this.code += `.${this.className}-free img, .${this.className}-free a img {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += `  ${freeImageWidth}`;
    this.code += `  ${freeImageHeight}`;
    this.code += `  margin: ${freeImageMarginTop} ${freeImageMarginRight} ${freeImageMarginBottom} ${freeImageMarginLeft};`;
    this.code += '  vertical-align: top;';
    this.code += '}';

    this.code += `.${this.className}-box {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += `  ${boxFlexFlow}`;
    this.code += `  margin: ${boxMarginTop} ${boxMarginRight} ${boxMarginBottom} ${boxMarginLeft};`;
    this.code += '  cursor: pointer;';
    this.code += '}';

    this.code += `.${this.className}-box-image {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += '  -webkit-box-pack: center;';
    this.code += '  -ms-flex-pack: center;';
    this.code += '  justify-content: center;';
    this.code += `  ${shareImageVerticalAlign}`;
    this.code += `  margin: ${shareImageMarginTop} ${shareImageMarginRight} ${shareImageMarginBottom} ${shareImageMarginLeft};`;
    this.code += '}';

    this.code += `.${this.className}-box-image a, .${this.className}-box-image a:hover, .${this.className}-box-image a:focus, .${this.className}-box-count a, .${this.className}-box-count a:hover, .${this.className}-box-count a:focus {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += '  outline: none;';
    this.code += '}';

    this.code += `.${this.className}-box-image img, .${this.className}-box-image a img {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += `  ${shareImageWidth}`;
    this.code += `  ${shareImageHeight}`;
    this.code += '  vertical-align: top;';
    // this.code += '  vertical-align: baseline;';
    this.code += '}';

    this.code += `.${this.className}-box-count {`;
    // this.code += '  line-height: 1;';
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += '  -webkit-box-pack: center;';
    this.code += '  -ms-flex-pack: center;';
    this.code += '  justify-content: center;';
    this.code += `  ${countVerticalAlign}`;
    this.code += `  border-radius: ${countBorderRadius};`;
    this.code += `  margin: ${countMarginTop} ${countMarginRight} ${countMarginBottom} ${countMarginLeft};`;
    this.code += `  background-color: ${countColor};`;
    this.code += '}';

    this.code += `.${this.className}-box-count a {`;
    this.code += '  text-decoration: none;';
    this.code += '}';

    this.code += `.${this.className}-box-count-${countDirection} {`;
    this.code += '  position: relative;';
    this.code += '  -webkit-box-sizing: border-box;';
    this.code += '  box-sizing: border-box;';
    this.code += `  border: 1px solid ${countBorderColor};`;
    this.code += `  border-radius: ${countBorderRadius};`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += '  -webkit-box-pack: center;';
    this.code += '  -ms-flex-pack: center;';
    this.code += '  justify-content: center;';
    this.code += '  -webkit-box-align: center;';
    this.code += '  -ms-flex-align: center;';
    this.code += '  align-items: center;';
    this.code += `  color: ${countFontColor};`;
    this.code += `  font-size: ${countFontSize};`;
    this.code += `  font-style: ${countFontStyle};`;
    this.code += `  font-weight: ${countFontWeight};`;
    this.code += `  font-family: ${countFont};`;
    this.code += `  ${countWidth}`;
    this.code += `  ${countHeight}`;
    this.code += `  padding: ${countPaddingTop} ${countPaddingRight} ${countPaddingBottom} ${countPaddingLeft};`;
    this.code += '}';

    if (countDirection === 'top') {

      this.code += `.${this.className}-box-count-top::after {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  bottom: -13px;';
      this.code += '  left: 50%;';
      this.code += '  margin-left: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-top: 6px solid ${countBorderColor};`;
      this.code += '}';

      this.code += `.${this.className}-box-count-top::before {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  bottom: -11px;';
      this.code += '  left: 50%;';
      this.code += '  margin-left: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-top: 6px solid ${countColor};`;
      this.code += '  z-index: 1;';
      this.code += '}';

    } else if (countDirection === 'right') {

      this.code += `.${this.className}-box-count-right::after {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  left: -13px;';
      this.code += '  top: 50%;';
      this.code += '  margin-top: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-right: 6px solid ${countBorderColor};`;
      this.code += '}';

      this.code += `.${this.className}-box-count-right::before {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  left: -11px;';
      this.code += '  top: 50%;';
      this.code += '  margin-top: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-right: 6px solid ${countColor};`;
      this.code += '  z-index: 1;';
      this.code += '}';

    } else if (countDirection === 'bottom') {

      this.code += `.${this.className}-box-count-bottom::after {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  top: -13px;';
      this.code += '  left: 50%;';
      this.code += '  margin-left: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-bottom: 6px solid ${countBorderColor};`;
      this.code += '}';

      this.code += `.${this.className}-box-count-bottom::before {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  top: -11px;';
      this.code += '  left: 50%;';
      this.code += '  margin-left: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-bottom: 6px solid ${countColor};`;
      this.code += '  z-index: 1;';
      this.code += '}';

    } else if (countDirection === 'left') {

      this.code += `.${this.className}-box-count-left::after {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  right: -13px;';
      this.code += '  top: 50%;';
      this.code += '  margin-top: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-left: 6px solid ${countBorderColor};`;
      this.code += '}';

      this.code += `.${this.className}-box-count-left::before {`;
      this.code += '  content: \'\';';
      this.code += '  position: absolute;';
      this.code += '  right: -11px;';
      this.code += '  top: 50%;';
      this.code += '  margin-top: -6px;';
      this.code += '  border: 6px solid transparent;';
      this.code += `  border-left: 6px solid ${countColor};`;
      this.code += '  z-index: 1;';
      this.code += '}';

    }

    this.code += '</style>';

  }


  styleType2Ver1() {


    // --------------------------------------------------
    //   Margin
    // --------------------------------------------------

    const marginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.marginTop);
    const marginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.marginRight);
    const marginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.marginBottom);
    const marginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.marginLeft);


    // --------------------------------------------------
    //   Box Margin
    // --------------------------------------------------

    const boxMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginTop);
    const boxMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginRight);
    const boxMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginBottom);
    const boxMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.boxMarginLeft);


    // --------------------------------------------------
    //   Share Image
    // --------------------------------------------------

    const shareImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.shareImageWidth, 'width');
    const shareImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.shareImageHeight, 'height');


    // --------------------------------------------------
    //   Count
    // --------------------------------------------------

    const countWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.countWidth, 'width');
    const countTop = GameUsersShareButtons.styleAddPx(this.jsonObj.countTop);
    const countLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.countLeft);
    const countTextAlign = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countTextAlign);

    const countFontColor = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontColor);

    // Count GoogleFont
    let countFont = '';

    if (this.jsonObj.countGoogleFont) {
      const replacedStr = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countGoogleFont.replace(/ /, '+'));

      if (this.importGoogleFontsArr.indexOf(replacedStr) === -1) {
        this.importGoogleFontsArr.push(replacedStr);
      }

      countFont += `'${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countGoogleFont)}', `;
    }

    if (this.jsonObj.countFont) {
      countFont += `'${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFont)}', `;
    }

    countFont += 'cursive';
    const countFontSize = GameUsersShareButtons.styleAddPx(this.jsonObj.countFontSize);
    const countFontStyle = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontStyle);
    const countFontWeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countFontWeight);


    // --------------------------------------------------
    //   Free Image
    // --------------------------------------------------

    let freeImageVerticalAlign = '';
    let freeImageWidth = '';
    let freeImageHeight = '';
    let freeImageMarginTop = '';
    let freeImageMarginRight = '';
    let freeImageMarginBottom = '';
    let freeImageMarginLeft = '';

    if (this.jsonObj.freeUploadImage) {

      freeImageVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.freeUploadImageVerticalAlign);
      freeImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeUploadImageWidth, 'width');
      freeImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeUploadImageHeight, 'height');
      freeImageMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginTop);
      freeImageMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginRight);
      freeImageMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginBottom);
      freeImageMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.freeUploadImageMarginLeft);

    } else {

      freeImageVerticalAlign = GameUsersShareButtons.styleVerticalAlign(this.jsonObj.freeImageVerticalAlign);
      freeImageWidth = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeImageWidth, 'width');
      freeImageHeight = GameUsersShareButtons.styleAddPxPlus(this.jsonObj.freeImageHeight, 'height');
      freeImageMarginTop = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginTop);
      freeImageMarginRight = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginRight);
      freeImageMarginBottom = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginBottom);
      freeImageMarginLeft = GameUsersShareButtons.styleAddPx(this.jsonObj.freeImageMarginLeft);

    }


    // --------------------------------------------------
    //   Code
    // --------------------------------------------------

    this.code += '<style type="text/css">';

    this.code += `.${this.className} {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += '  -webkit-box-orient: horizontal;';
    this.code += '  -webkit-box-direction: normal;';
    this.code += '  -ms-flex-flow: row wrap;';
    this.code += '  flex-flow: row wrap;';
    this.code += `  margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft};`;
    this.code += '  line-height: 1;';
    this.code += '}';

    this.code += `.${this.className}-box {`;
    this.code += '  position: relative;';
    this.code += `  margin: ${boxMarginTop} ${boxMarginRight} ${boxMarginBottom} ${boxMarginLeft};`;
    this.code += '  cursor: pointer;';
    this.code += '}';

    this.code += `.${this.className}-box a, .${this.className}-box a:hover, .${this.className}-box a:focus {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += '  outline: none;';
    this.code += '}';

    this.code += `.${this.className}-box img, .${this.className}-box a img {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += `  ${shareImageWidth}`;
    this.code += `  ${shareImageHeight}`;
    this.code += '  vertical-align: top;';
    this.code += '}';

    this.code += `.${this.className}-box-count {`;
    // this.code += '  line-height: 1;';
    this.code += '  position: absolute;';
    this.code += `  ${countWidth}`;
    this.code += `  top: ${countTop};`;
    this.code += `  left: ${countLeft};`;
    this.code += `  text-align: ${countTextAlign};`;
    this.code += `  color: ${countFontColor};`;
    this.code += `  font-size: ${countFontSize};`;
    this.code += `  font-style: ${countFontStyle};`;
    this.code += `  font-weight: ${countFontWeight};`;
    this.code += `  font-family: ${countFont};`;
    this.code += '}';

    this.code += `.${this.className}-free {`;
    this.code += '  display: -webkit-box;';
    this.code += '  display: -ms-flexbox;';
    this.code += '  display: flex;';
    this.code += `  ${freeImageVerticalAlign}`;
    this.code += '}';

    this.code += `.${this.className}-free a, .${this.className}-free a:hover, .${this.className}-free a:focus {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += '  outline: none;';
    this.code += '}';

    this.code += `.${this.className}-free img, .${this.className}-free a img {`;
    this.code += '  -webkit-box-shadow: none;';
    this.code += '  box-shadow: none;';
    this.code += `  ${freeImageWidth}`;
    this.code += `  ${freeImageHeight}`;
    this.code += `  margin: ${freeImageMarginTop} ${freeImageMarginRight} ${freeImageMarginBottom} ${freeImageMarginLeft};`;
    this.code += '  vertical-align: top;';
    this.code += '}';

    this.code += '</style>';

  }



  themeType1Ver1(url, uploadImageActive) {

    const themeName = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.name);
    const themeId = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.id);

    let themeUrl = `${this.shareButtonsBaseUrl}themes`;

    if (url) {
      themeUrl = url;
    }

    const queryControlCache = GameUsersShareButtonsCommon.escapeHtml(this.optionJsonObj.queryControlCache) || 10000000;


    this.code += `<div class="${this.className}">`;


    // --------------------------------------------------
    //   Share Buttons
    // --------------------------------------------------

    Object.keys(this.jsonObj.share).forEach((key) => {

      const value = this.jsonObj.share[key];
      let codeCount = '';
      let codeImage = '';

      if (value.button === false) {
        return true;
      }

      const shareName = GameUsersShareButtonsCommon.escapeHtml(key);
      const shareImageExtension = GameUsersShareButtonsCommon.escapeHtml(value.extension);
      const shareImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.shareImageWidth);
      const shareImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.shareImageHeight);
      const shareFormalName = GameUsersShareButtonsCommon.escapeHtml(this.shareObj[key]);
      const shareCount = GameUsersShareButtonsCommon.escapeHtml(value.count);


      this.code += `<div class="${this.className}-box" id="game-users-share-buttons-${shareName}" data-count="${shareCount}">`;

      if (this.jsonObj.count) {

        const countDirection = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.countDirection);

        let countDefaultText = '';

        if (value.countDefaultText) {
          countDefaultText = GameUsersShareButtonsCommon.escapeHtml(value.countDefaultText);
        }

        const countMin = GameUsersShareButtonsCommon.escapeHtml(value.countMin);
        const countMax = GameUsersShareButtonsCommon.escapeHtml(value.countMax);



        if (key === 'pinterest') {

          codeCount = `<div class="${this.className}-box-count"><a data-pin-do="buttonBookmark" data-pin-custom="true" data-pin-save="false" href="https://www.pinterest.com/pin/create/button/"><div class="${this.className}-box-count-${countDirection}" data-min="${countMin}" data-max="${countMax}">${countDefaultText}</div></a></div>`;

        } else if (key === 'rss' && this.optionJsonObj.rssUrl) {

          const rssUrl = GameUsersShareButtonsCommon.escapeHtml(this.optionJsonObj.rssUrl);

          codeCount = `<div class="${this.className}-box-count"><a href="${rssUrl}" target="_blank"><div class="${this.className}-box-count-${countDirection}" data-min="${countMin}" data-max="${countMax}">${countDefaultText}</div></a></div>`;

        } else {

          codeCount = `<div class="${this.className}-box-count"><div class="${this.className}-box-count-${countDirection}" data-min="${countMin}" data-max="${countMax}">${countDefaultText}</div></div>`;

        }

      }



      // --------------------------------------------------
      //   Image Src
      //   画像のパスを作成 / アップロードした画像がある場合はそれを表示
      // --------------------------------------------------

      let imageSrc = `${themeUrl}/${themeName}-${themeId}/${shareName}.${shareImageExtension}?${queryControlCache}`;

      if (uploadImageActive && this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type1', shareName, 'src'])) {
        imageSrc = this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type1', shareName, 'src']);
      }



      if (key === 'pinterest') {

        codeImage = `<div class="${this.className}-box-image"><a data-pin-do="buttonBookmark" data-pin-custom="true" data-pin-save="false" href="https://www.pinterest.com/pin/create/button/"><img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" /></a></div>`;

      } else if (key === 'rss' && this.optionJsonObj.rssUrl) {

        const rssUrl = GameUsersShareButtonsCommon.escapeHtml(this.optionJsonObj.rssUrl);

        codeImage = `<div class="${this.className}-box-image"><a href="${rssUrl}" target="_blank"><img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" /></a></div>`;

      } else {


        // console.log('themeType1Ver1 / this.shareButtonsBaseUrl = ', this.shareButtonsBaseUrl);
        // console.log('themeType1Ver1 / themeUrl = ', themeUrl);
        // console.log('themeType1Ver1 / url = ', url);
        // console.log('themeType1Ver1 / 含む / imageSrc2 = ', imageSrc);
        // console.log('\n');

        codeImage = `<div class="${this.className}-box-image"><img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" /></div>`;

      }


      if (this.jsonObj.countDirection === 'top' || this.jsonObj.countDirection === 'left') {
        this.code += codeCount + codeImage;
      } else {
        this.code += codeImage + codeCount;
      }

      this.code += '</div>';

    });


    // --------------------------------------------------
    //   Free Image
    // --------------------------------------------------

    if (this.jsonObj.freeImage) {

      let freeImageUrl = '';
      let freeImageAlt = '';
      let freeImageSrc = '';
      let freeImageWidth = '';
      let freeImageHeight = '';

      if (this.jsonObj.freeUploadImage) {

        freeImageUrl = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageUrl);
        freeImageAlt = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageAlt);


        // --------------------------------------------------
        //   Free Image Src
        //   画像のパスを作成 / アップロードした画像がある場合はそれを表示
        // --------------------------------------------------

        freeImageSrc = `${themeUrl}/${themeName}-${themeId}/free.${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageExtension)}`;

        if (uploadImageActive && this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type1', 'freeUploadImage', 'src'])) {
          freeImageSrc = this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type1', 'freeUploadImage', 'src']);
        }

        freeImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageWidth);
        freeImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageHeight);

      } else {

        freeImageUrl = this.gameUsersShareButtonsWebUrl;
        freeImageAlt = this.gameUsersShareButtonsFreeImageAlt;
        freeImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageWidth);
        freeImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageHeight);

        let freeImageType = 1;
        if ('freeImageType' in this.jsonObj) {
          freeImageType = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageType);
        }
        freeImageSrc = `${this.shareButtonsFreeImageBaseUrl}free${freeImageType}.png?${queryControlCache}`;
        // freeImageSrc = `${this.shareButtonsBaseUrl}img/free${freeImageType}.png?${queryControlCache}`;


      }


      this.code += `<div class="${this.className}-free" id="game-users-share-buttons-free-image">`;

      if (freeImageUrl) {
        this.code += `<a href="${freeImageUrl}" target="_blank"><img src="${freeImageSrc}" widht="${freeImageWidth}" height="${freeImageHeight}" alt="${freeImageAlt}" /></a>`;
      } else {
        this.code += `<img src="${freeImageSrc}" widht="${freeImageWidth}" height="${freeImageHeight}" alt="${freeImageAlt}" />`;
      }

      this.code += '</div>';

    }


    this.code += '</div>';

  }


  themeType2Ver1(url, uploadImageActive) {

    // console.log('this.shareButtonsBaseUrl = ', this.shareButtonsBaseUrl);
    const themeName = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.name);
    const themeId = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.id);

    let themeUrl = `${this.shareButtonsBaseUrl}themes`;

    if (url) {
      themeUrl = url;
    }

    // console.log('url = ', url);
    // console.log('uploadImageActive = ', uploadImageActive);
    // console.log('themeName = ', themeName);
    // console.log('themeId = ', themeId);

    const queryControlCache = GameUsersShareButtonsCommon.escapeHtml(this.optionJsonObj.queryControlCache) || 10000000;

    this.code += `<div class="${this.className}">`;


    // --------------------------------------------------
    //   Share Buttons
    // --------------------------------------------------

    Object.keys(this.jsonObj.share).forEach((key) => {

      const value = this.jsonObj.share[key];

      if (value.button === false) {
        return true;
      }

      const shareName = GameUsersShareButtonsCommon.escapeHtml(key);
      const shareImageExtension = GameUsersShareButtonsCommon.escapeHtml(value.extension);
      const shareImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.shareImageWidth);
      const shareImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.shareImageHeight);
      const shareFormalName = GameUsersShareButtonsCommon.escapeHtml(this.shareObj[key]);
      const shareCount = GameUsersShareButtonsCommon.escapeHtml(value.count);

      this.code += `<div class="${this.className}-box" id="game-users-share-buttons-${shareName}" data-count="${shareCount}">`;


      // --------------------------------------------------
      //   Image Src
      //   画像のパスを作成 / アップロードした画像がある場合はそれを表示
      // --------------------------------------------------

      let imageSrc = `${themeUrl}/${themeName}-${themeId}/${shareName}.${shareImageExtension}?${queryControlCache}`;


      if (uploadImageActive && this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type2', shareName, 'src'])) {
        imageSrc = this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type2', shareName, 'src']);
      }
      // console.log('themeUrl = ', themeUrl);
      // console.log('imageSrc = ', imageSrc);



      if (key === 'pinterest') {

        this.code += `<a data-pin-do="buttonBookmark" data-pin-custom="true" data-pin-save="false" href="https://www.pinterest.com/pin/create/button/"><img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" /></a>`;

      } else if (key === 'rss' && this.optionJsonObj.rssUrl) {

        const rssUrl = GameUsersShareButtonsCommon.escapeHtml(this.optionJsonObj.rssUrl);

        this.code += `<a href="${rssUrl}" target="_blank"><img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" /></a>`;

      } else {

        this.code += `<img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" />`;

        // if (imageSrc.indexOf('https://gameusers.org/dev/blog/wp-content/plugins/game-users-share-buttons/') !== -1) {
        //   // console.log('this.shareButtonsBaseUrl = ', this.shareButtonsBaseUrl);
        //   // console.log('themeUrl = ', themeUrl);
        //   // console.log('url = ', url);
        //   // console.log('含む / imageSrc2 = ', imageSrc);
        //   // console.log('\n');
        // } else {
        //   this.code += `<img src="${imageSrc}" width="'${shareImageWidth}" height="${shareImageHeight}" alt="${shareFormalName}" />`;
        // }




      }


      let countDefaultText = '';
      if (value.countDefaultText) {
        countDefaultText = GameUsersShareButtonsCommon.escapeHtml(value.countDefaultText);
      }

      const countMin = GameUsersShareButtonsCommon.escapeHtml(value.countMin);
      const countMax = GameUsersShareButtonsCommon.escapeHtml(value.countMax);
      this.code += `<div class="${this.className}-box-count"><div data-min="${countMin}" data-max="${countMax}">${countDefaultText}</div></div>`;

      this.code += '</div>';

    });


    // --------------------------------------------------
    //   Free Image
    // --------------------------------------------------

    if (this.jsonObj.freeImage) {

      let freeImageUrl = '';
      let freeImageAlt = '';
      let freeImageSrc = '';
      let freeImageWidth = '';
      let freeImageHeight = '';

      if (this.jsonObj.freeUploadImage) {

        freeImageUrl = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageUrl);
        freeImageAlt = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageAlt);


        // --------------------------------------------------
        //   Free Image Src
        //   画像のパスを作成 / アップロードした画像がある場合はそれを表示
        // --------------------------------------------------

        freeImageSrc = `${themeUrl}/${themeName}-${themeId}/free.${GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageExtension)}`;

        if (uploadImageActive && this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type2', 'freeUploadImage', 'src'])) {
          freeImageSrc = this.uploadImageMap.getIn([`${themeName}-${themeId}`, 'type2', 'freeUploadImage', 'src']);
        }

        freeImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageWidth);
        freeImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeUploadImageHeight);

      } else {

        freeImageUrl = this.gameUsersShareButtonsWebUrl;
        freeImageAlt = this.gameUsersShareButtonsFreeImageAlt;
        freeImageWidth = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageWidth);
        freeImageHeight = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageHeight);

        let freeImageType = 1;
        if ('freeImageType' in this.jsonObj) {
          freeImageType = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.freeImageType);
        }
        freeImageSrc = `${this.shareButtonsFreeImageBaseUrl}free${freeImageType}.png?${queryControlCache}`;
        // freeImageSrc = `${this.shareButtonsBaseUrl}img/free${freeImageType}.png?${queryControlCache}`;


      }


      this.code += `<div class="${this.className}-free" id="game-users-share-buttons-free-image">`;

      if (freeImageUrl) {
        this.code += `<a href="${freeImageUrl}" target="_blank"><img src="${freeImageSrc}" widht="${freeImageWidth}" height="${freeImageHeight}" alt="${freeImageAlt}" /></a>`;
      } else {
        this.code += `<img src="${freeImageSrc}" widht="${freeImageWidth}" height="${freeImageHeight}" alt="${freeImageAlt}" />`;
      }

      this.code += '</div>';

    }


    this.code += '</div>';

  }



  renderAllShareButtons() {

    // console.log('renderAllShareButtons()');

    // --------------------------------------------------
    //   Set Variable
    // --------------------------------------------------

    const that = this;
    const cacheDataJsonObj = {};
    let loopCount = 0;


    // --------------------------------------------------
    //   コードを作成するための配列（elementsArr）
    //   data.json を読み込むための配列（themesArr）を作成する
    //
    //   const elementsArr = [...document.querySelectorAll(`${that.containerSelector}#game-users-share-buttons`)];
    //   上記の書き方は NodeList を forEach でループさせると IE とEdghe でエラーが出るため
    //   https://stackoverflow.com/questions/7459704/in-javascript-what-is-the-best-way-to-convert-a-nodelist-to-an-array/7459729#7459729
    // --------------------------------------------------

    const elementsArr = [...document.querySelectorAll(`${that.containerSelector}#game-users-share-buttons`)];
    const elementsArrCount = elementsArr.length;
    const themesArr = [];

    elementsArr.forEach((element) => {
      const themeNameId = element.dataset.theme;

      if (themeNameId && themesArr.indexOf(themeNameId) === -1) {
        themesArr.push(themeNameId);
      }
    });

    const themesArrCount = themesArr.length;

    // console.log('elementsArr = ', elementsArr);
    // console.log('elementsArrCount = ', elementsArrCount);
    // console.log('themesArr = ', themesArr);



    /**
     * Render Share Buttons
     */
    function render() {

      // console.log('render()');
      // console.log('cacheDataJsonObj = ', cacheDataJsonObj);

      // --------------------------------------------------
      //   Set Variable
      // --------------------------------------------------

      loopCount = 0;
      let existencePinterest = false;


      // --------------------------------------------------
      //   Loop
      // --------------------------------------------------

      elementsArr.forEach((element) => {


        // --------------------------------------------------
        //   Loop Count +1
        // --------------------------------------------------

        loopCount += 1;


        // --------------------------------------------------
        //   Get themeNameId
        // --------------------------------------------------

        const themeNameId = element.dataset.theme;
        // console.log('themeNameId = ', themeNameId);

        if (!themeNameId) {
          return;
        }


        // --------------------------------------------------
        //   Set Json Object
        // --------------------------------------------------

        const jsonObj = cacheDataJsonObj[themeNameId];
        that.setJsonObj(jsonObj);

        // console.log('jsonObj = ', jsonObj);


        // --------------------------------------------------
        //   Share Buttons を描画する
        // --------------------------------------------------

        const copyElement = element;
        copyElement.innerHTML = that.shareButtons();

        const elementDivArr = [...element.querySelectorAll('[id^=game-users-share-buttons-]')];

        elementDivArr.forEach((elementDiv) => {
          const elementCopy = elementDiv;
          const shareId = elementDiv.id.replace(/game-users-share-buttons-/g, '');

          if (elementCopy.dataset.count) {
            that.countObj[shareId] = null;
          }

          if (shareId === 'pinterest') {
            existencePinterest = true;
          }

          elementCopy.onclick = function () {
            that.share(shareId);
          };
        });


        // --------------------------------------------------
        //   ループの最後で行う処理
        // --------------------------------------------------

        if (elementsArrCount === loopCount) {

          // console.log('Render Last loopCount = ', loopCount);

          // --------------------------------------------------
          //   Add Google Fonts Style Sheet
          // --------------------------------------------------

          if (that.importGoogleFontsArr.length > 0) {
            setGoogleFonts(that.importGoogleFontsArr, 'game-users-share-buttons-google-fonts');
          }


          // --------------------------------------------------
          //   Add Pinterest Script
          // --------------------------------------------------

          const elementPinterestJs = document.querySelector('script[src^="//assets.pinterest.com/js/pinit"]');

          if (existencePinterest && !elementPinterestJs) {

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'game-users-share-buttons-pinit-js';
            script.src = '//assets.pinterest.com/js/pinit.js';
            document.getElementsByTagName('head').item(0).appendChild(script);

          }


          // --------------------------------------------------
          //   Count
          // --------------------------------------------------

          that.count();

        }

      });

    }


    // --------------------------------------------------
    //   Get Option JSON
    // --------------------------------------------------

    const xhrOption = new XMLHttpRequest();
    xhrOption.open('GET', `${this.shareButtonsBaseUrl}json/option.json?${Date.now()}`, true);
    xhrOption.onload = function () {
      if (xhrOption.readyState === 4 && xhrOption.status === 200) {


        // --------------------------------------------------
        //   Set Option Json Object
        // --------------------------------------------------

        that.setOptionJsonObj(JSON.parse(this.responseText));


        // --------------------------------------------------
        //   クエリを追加してキャッシュを効かなくさせる
        // --------------------------------------------------

        const queryControlCache = GameUsersShareButtonsCommon.escapeHtml(that.optionJsonObj.queryControlCache) || 10000000;


        // --------------------------------------------------
        //   Loop
        // --------------------------------------------------

        themesArr.forEach((themeNameId) => {


          // --------------------------------------------------
          //   data.json を読み込む
          // --------------------------------------------------

          const xhr = new XMLHttpRequest();
          xhr.open('GET', `${that.shareButtonsBaseUrl}themes/${themeNameId}/data.json?${queryControlCache}`, true);
          xhr.onload = function () {


            // --------------------------------------------------
            //   Loop Count +1
            // --------------------------------------------------

            loopCount += 1;


            // --------------------------------------------------
            //   cacheDataJsonObj に data.json をセットする
            // --------------------------------------------------

            if (xhr.readyState === 4 && xhr.status === 200) {
              const jsonObj = JSON.parse(this.responseText);
              cacheDataJsonObj[themeNameId] = jsonObj;
            }


            // --------------------------------------------------
            //   ループの最後に達したらシェアボタンを描画する
            // --------------------------------------------------

            if (loopCount === themesArrCount) {
              // console.log('data.json Last loopCount = ', loopCount);
              render();
            }

          };
          xhr.onerror = function () {
            loopCount += 1;
          };
          xhr.send(null);

        });

      }
    };
    xhrOption.send(null);

  }


  share(type) {

    const title = encodeURIComponent(document.title);
    const url = encodeURIComponent(window.location.href);
    // const url = encodeURIComponent('https://www.google.com/');
    // const url = encodeURIComponent('https://www.yahoo.co.jp/');
    // const url = 'https://gameusers.org/dev/blog/feed';
    let openAddress = null;


    if (type === 'twitter') {
      openAddress = `https://twitter.com/share?url=${url}&text=${title}`;
    } else if (type === 'facebook') {
      openAddress = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (type === 'google-plus') {
      openAddress = `https://plus.google.com/share?url=${url}`;
    } else if (type === 'pocket') {
      openAddress = `http://getpocket.com/edit?url=${url}`;
    } else if (type === 'linkedin') {
      openAddress = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
    } else if (type === 'tumblr') {
      openAddress = `http://www.tumblr.com/share/link?url=${url}`;
    } else if (type === 'hatena') {
      openAddress = `http://b.hatena.ne.jp/entry/${url}`;
    } else if (type === 'line') {
      openAddress = `http://line.me/R/msg/text/?${title}%20${url}`;
    } else if (type === 'feedly' && this.optionJsonObj.rssUrl) {
      openAddress = `http://www.feedly.com/home#subscription/feed/${this.optionJsonObj.rssUrl}`;
    } else if (type === 'mail') {
      window.location.href = `mailto:?subject=${document.title}&body=${window.location.href}`;
    }


    if (openAddress) {
      window.open(openAddress, '_blank');
    }

  }



  countApply(type) {

    const elementArr = [...document.querySelectorAll(`${this.containerSelector}#game-users-share-buttons-${type}`)];

    elementArr.forEach((element) => {

      const elementCountDiv = element.querySelector('div[class*="-box-count"] div');
      if (!elementCountDiv) {
        return;
      }

      const dataCount = element.dataset.count;
      if (dataCount === 'false') {
        return;
      }

      let count = this.countObj[type];

      const countMin = elementCountDiv.dataset.min ? parseInt(elementCountDiv.dataset.min, 10) : null;
      const countMax = elementCountDiv.dataset.max ? parseInt(elementCountDiv.dataset.max, 10) : null;


      if (count === null) {
        return;
      } else if (countMin && countMin > count) {
        return;
      } else if (countMax && countMax < count) {
        count = countMax;
      }

      const copyElement = elementCountDiv;
      copyElement.textContent = count;

    });

  }


  countTwitter(url) {

    const type = 'twitter';
    const that = this;


    if (!this.optionJsonObj.twitterApiType) {
      return;
    }


    (() => {

      const apiUrl = `https://jsoon.digitiminimi.com/twitter/count.json?url="${encodeURIComponent(url)}"&callback=gameUsersShareButtonsCallbackTwitter`;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${apiUrl}`;
      window.gameUsersShareButtonsCallbackTwitter = function (countJsonObj) {

        try {
          if (countJsonObj.count !== null) {
            that.countObj[type] = parseInt(countJsonObj.count, 10);
          } else {
            throw new Error();
          }
        } catch (e) {
          that.countObj[type] = null;
        }

        that.countApply(type);
      };
      document.body.appendChild(script);
    })();

  }


  countFacebook(url) {

    const type = 'facebook';
    const that = this;


    const xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function () {
      if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
        const countJsonObj = JSON.parse(this.responseText);

        try {
          if (countJsonObj.share.share_count !== null) {
            that.countObj[type] = parseInt(countJsonObj.share.share_count, 10);
          } else {
            throw new Error();
          }
        } catch (e) {
          that.countObj[type] = null;
        }

        that.countApply(type);

      }
    };
    xmlHttpReq.open('get', `https://graph.facebook.com/?id=${encodeURIComponent(url)}`, true);
    xmlHttpReq.send(null);

  }


  countHatena(url) {

    const type = 'hatena';
    const that = this;


    (() => {

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://b.hatena.ne.jp/entry.count?url=${encodeURIComponent(url)}&callback=gameUsersShareButtonsCallbackHatena`;
      window.gameUsersShareButtonsCallbackHatena = function (countJsonObj) {

        try {
          if (countJsonObj !== null) {
            that.countObj[type] = parseInt(countJsonObj, 10);
          } else {
            throw new Error();
          }
        } catch (e) {
          that.countObj[type] = null;
        }

        that.countApply(type);
      };
      document.body.appendChild(script);
    })();

  }


  countPocket(url) {

    const type = 'pocket';
    const that = this;


    if (this.optionJsonObj.php) {

      const xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.onreadystatechange = function () {
        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
          const countJsonObj = JSON.parse(this.responseText);

          try {
            if (countJsonObj.count !== null) {
              that.countObj[type] = parseInt(countJsonObj.count, 10);
            } else {
              throw new Error();
            }
          } catch (e) {
            that.countObj[type] = null;
          }

          that.countApply(type);

        }
      };
      xmlHttpReq.open('get', `${this.shareButtonsBaseUrl}php/count.php?type=${type}&url=${encodeURIComponent(url)}`, true);
      xmlHttpReq.send(null);

    }

  }


  countPinterest(url) {

    const type = 'pinterest';
    const that = this;


    (() => {

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://api.pinterest.com/v1/urls/count.json?url=${encodeURIComponent(url)}&callback=gameUsersShareButtonsCallbackPinterest`;
      window.gameUsersShareButtonsCallbackPinterest = function (countJsonObj) {

        try {
          if (countJsonObj.count !== null) {
            that.countObj[type] = parseInt(countJsonObj.count, 10);
          } else {
            throw new Error();
          }
        } catch (e) {
          that.countObj[type] = null;
        }

        that.countApply(type);
      };
      document.body.appendChild(script);
    })();

  }


  countLinkedIn(url) {

    const type = 'linkedin';
    const that = this;


    (() => {

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.linkedin.com/countserv/count/share?url=${encodeURIComponent(url)}&callback=gameUsersShareButtonsCallbackLinkedIn`;
      window.gameUsersShareButtonsCallbackLinkedIn = function (countJsonObj) {

        try {
          if (countJsonObj.count !== null) {
            that.countObj[type] = parseInt(countJsonObj.count, 10);
          } else {
            throw new Error();
          }
        } catch (e) {
          that.countObj[type] = null;
        }

        that.countApply(type);
      };
      document.body.appendChild(script);
    })();

  }


  countFeedly(url) {

    const type = 'feedly';
    const that = this;

    if (!url) {
      return;
    }


    if (this.optionJsonObj.php) {

      const xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.onreadystatechange = function () {
        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200) {
          const countJsonObj = JSON.parse(this.responseText);

          try {
            if (countJsonObj.count !== null) {
              that.countObj[type] = parseInt(countJsonObj.count, 10);
            } else {
              throw new Error();
            }
          } catch (e) {
            that.countObj[type] = null;
          }

          that.countApply(type);

        }
      };
      xmlHttpReq.open('get', `${this.shareButtonsBaseUrl}php/count.php?type=${type}&url=${encodeURIComponent(url)}`, true);
      xmlHttpReq.send(null);

    }

  }


  count() {

    const url = window.location.href;
    // const url = 'https://www.yahoo.co.jp/';
    // const url = 'https://www.google.com/';

    // console.log('this.countObj = ', this.countObj);


    Object.keys(this.countObj).forEach((key) => {
      if (key === 'twitter') {
        this.countTwitter(url);
      } else if (key === 'facebook') {
        this.countFacebook(url);
      } else if (key === 'hatena') {
        this.countHatena(url);
      } else if (key === 'pocket') {
        this.countPocket(url);
      } else if (key === 'pinterest') {
        this.countPinterest(url);
      } else if (key === 'linkedin') {
        this.countLinkedIn(url);
      } else if (key === 'feedly') {
        this.countFeedly(this.optionJsonObj.rssUrl);
      }
    });

  }

}



window.onload = function () {


  // --------------------------------------------------
  //   シェアボタンを描写する
  //
  //   シェアボタンを描写する場所は3種類ある
  //   1. 通常の使用（ブログの記事ページやコードを貼ったページなど）
  //   2. 公式ページのシェアボタン作成タブ
  //   3. WordPress プラグインのシェアボタン作成タブ
  //
  //   このうちの 2 & 3 のシェアボタン作成タブの場合、ここでは描写しない
  //   1 の通常使用時と公式ページの左メニュー部分のシェアボタンはこちらから描写する
  //   gameUsersShareButtonsPageType が存在しない場合、作成タブではないという判定
  // --------------------------------------------------

  if (typeof (gameUsersShareButtonsPageType) === 'undefined') {
    const instanceGameUsersShareButtons = new GameUsersShareButtons();
    instanceGameUsersShareButtons.renderAllShareButtons();
  }


};





// --------------------------------------------------
//   IE で Array.from のエラーが出るので Polyfill を直書きしてエラー回避
//   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// --------------------------------------------------

/* eslint no-var: 0, no-restricted-properties: 0, no-restricted-globals: 0, vars-on-top: 0, prefer-rest-params: 0, no-void: 0, prefer-destructuring: 0 */

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/* , mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
