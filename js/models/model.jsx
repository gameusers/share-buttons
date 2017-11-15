// --------------------------------------------------
//   Import
// --------------------------------------------------

import { fromJS, Map, OrderedMap, Seq, Record } from 'alias-node-modules/immutable';
import 'alias-node-modules/whatwg-fetch';

import { GameUsersShareButtonsCommon, PLUGIN_URL, GameUsersShareButtons } from '../entry-share';



// --------------------------------------------------
//   Page Type / official or wordPressPlugin
// --------------------------------------------------

const pageType = typeof (gameUsersShareButtonsPageType) === 'undefined' ? 'official' : 'wordPressPlugin';


// --------------------------------------------------
//   Constant
// --------------------------------------------------

// export const OFFICIAL_BASE_URL = 'https://localhost/gameusers/public/';
export const OFFICIAL_BASE_URL = 'https://gameusers.org/';

export const OFFICIAL_API_URL = `${OFFICIAL_BASE_URL}api/public.json`;
export const OFFICIAL_PLUGIN_URL = `${OFFICIAL_BASE_URL}dev/blog/wp-content/plugins/game-users-share-buttons/`;
export const OFFICIAL_THEME_DESIGN_URL = `${OFFICIAL_BASE_URL}react/contents/app/share-buttons/themes-design`;
export const OFFICIAL_THEME_ICON_URL = `${OFFICIAL_BASE_URL}react/contents/app/share-buttons/themes-icon`;

export const LOCAL_PLUGIN_URL = pageType === 'wordPressPlugin' ? PLUGIN_URL : null;


// --------------------------------------------------
//   Share Object
//   シェアできるサイト / カウントできる場合はtrue
// --------------------------------------------------

export const shareObj = {
  twitter: {
    name: 'Twitter',
    count: true
  },
  facebook: {
    name: 'Facebook',
    count: true
  },
  'google-plus': {
    name: 'Google+',
    count: true
  },
  pocket: {
    name: 'Pocket',
    count: true
  },
  pinterest: {
    name: 'Pinterest',
    count: true
  },
  linkedin: {
    name: 'LinkedIn',
    count: true
  },
  tumblr: {
    name: 'Tumblr',
    count: false
  },
  hatena: {
    name: 'Hatena',
    count: true
  },
  line: {
    name: 'LINE',
    count: false
  },
  feedly: {
    name: 'Feedly',
    count: true
  },
  rss: {
    name: 'RSS',
    count: false
  },
  mail: {
    name: 'Mail',
    count: false
  }
};


// --------------------------------------------------
//   initial Data Obj / テーマの初期設定
// --------------------------------------------------

const initialDataObjType1 = {
  id: '',
  name: '',
  style: { type: 1, version: 1 },
  theme: { type: 1, version: 1 },
  share: {},

  shareImageVerticalAlign: 'top',
  shareImageDefaultWidth: '',
  shareImageDefaultHeight: '',
  shareImageWidth: '',
  shareImageHeight: '',
  shareImageMarginTop: 10,
  shareImageMarginRight: 0,
  shareImageMarginBottom: 0,
  shareImageMarginLeft: 0,

  count: true,
  countDirection: 'top',
  countVerticalAlign: 'middle',
  countWidth: 50,
  countHeight: 30,
  countMarginTop: 0,
  countMarginRight: 0,
  countMarginBottom: 0,
  countMarginLeft: 0,
  countPaddingTop: 0,
  countPaddingRight: 0,
  countPaddingBottom: 0,
  countPaddingLeft: 0,
  countColor: '#ffffff',
  countBorderColor: '#bbbbbb',
  countBorderRadius: 3,
  countFont: '',
  countGoogleFont: '',
  countFontColor: '#000000',
  countFontSize: 16,
  countFontStyle: 'normal',
  countFontWeight: 400,

  freeImage: true,
  freeImageVerticalAlign: 'middle',
  freeImageDefaultWidth: 100,
  freeImageDefaultHeight: 110,
  freeImageWidth: 46,
  freeImageHeight: 54,
  freeImageMarginTop: 0,
  freeImageMarginRight: 0,
  freeImageMarginBottom: 0,
  freeImageMarginLeft: 0,

  freeUploadImage: false,
  freeUploadImageExtension: '',
  freeUploadImageUrl: '',
  freeUploadImageAlt: '',
  freeUploadImageVerticalAlign: 'top',
  freeUploadImageDefaultWidth: '',
  freeUploadImageDefaultHeight: '',
  freeUploadImageWidth: '',
  freeUploadImageHeight: '',
  freeUploadImageMarginTop: 0,
  freeUploadImageMarginRight: 0,
  freeUploadImageMarginBottom: 0,
  freeUploadImageMarginLeft: 0,

  boxMarginTop: 0,
  boxMarginRight: 8,
  boxMarginBottom: 6,
  boxMarginLeft: 0,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
};

const initialDataObjType2 = {
  id: '',
  name: '',
  style: { type: 2, version: 1 },
  theme: { type: 2, version: 1 },
  share: {},

  shareImageDefaultWidth: '',
  shareImageDefaultHeight: '',
  shareImageWidth: '',
  shareImageHeight: '',

  countWidth: '',
  countTop: 0,
  countLeft: 0,
  countTextAlign: 'center',
  countFont: '',
  countGoogleFont: '',
  countFontColor: '#000000',
  countFontSize: 16,
  countFontStyle: 'normal',
  countFontWeight: 400,

  freeImage: true,
  freeImageVerticalAlign: 'middle',
  freeImageDefaultWidth: 100,
  freeImageDefaultHeight: 110,
  freeImageWidth: 46,
  freeImageHeight: 54,
  freeImageMarginTop: 0,
  freeImageMarginRight: 0,
  freeImageMarginBottom: 0,
  freeImageMarginLeft: 0,

  freeUploadImage: false,
  freeUploadImageExtension: '',
  freeUploadImageUrl: '',
  freeUploadImageAlt: '',
  freeUploadImageVerticalAlign: 'top',
  freeUploadImageDefaultWidth: '',
  freeUploadImageDefaultHeight: '',
  freeUploadImageWidth: '',
  freeUploadImageHeight: '',
  freeUploadImageMarginTop: 0,
  freeUploadImageMarginRight: 0,
  freeUploadImageMarginBottom: 0,
  freeUploadImageMarginLeft: 0,

  boxMarginTop: 0,
  boxMarginRight: 8,
  boxMarginBottom: 6,
  boxMarginLeft: 0,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
};


// --------------------------------------------------
//   initial State / 初期状態
// --------------------------------------------------

const initialStateObj = {

  pageType,

  formMap: {
    toggleEditForm: false,
    checkStickySampleTheme: true,
    currentThemeNameId: 'new-theme',
    currentThemeType: 'type1',
    optionType: '',
    shareType: '',
    shareImageAspectRatioFixed: true,
    freeImageAspectRatioFixed: true,
    freeUploadImageAspectRatioFixed: true,
    countInput: '',
    countInputMin: 0,
    countInputMax: 9999,
    countBackgroundColor: false,
    countBackgroundColorHex: '',
    checkDownloadThemesList: []
  },

  dataSampleThemesMap: {
    'new-theme': {
      type1: initialDataObjType1,
      type2: initialDataObjType2,
      openedThemeType: 'type1'
    }
  },

  dataEditThemesMap: {},
  dataDesignThemesMap: {},
  dataIconThemesMap: {},

  uploadImageMap: {},
  uploadImageOfficialMap: {},
  googleFontsList: [],

  editThemesList: [],
  designThemesMap: {},
  iconThemesMap: {},

  designThemesTotal: 0,
  iconThemesTotal: 0,

  designRandomMap: {},
  iconRandomMap: {},

  contentsNumberOfLines: 20,
  editThemesPage: 1,
  designThemesPage: 1,
  iconThemesPage: 1,

  randomDesignThemesList: [],
  randomIconThemesList: [],

};


// --------------------------------------------------
//   Option Object / 設定
// --------------------------------------------------

let optionObj = {
  databaseVersion: 1,
  topTheme: '',
  bottomTheme: '',
  editThemesArr: [],
  php: 0,
  twitterApiType: '',
  rssUrl: '',
  plan: 'free',
};

// ---------------------------------------------
//   - Official Site
//   Local Strageから設定データを取得する
// ---------------------------------------------

if (pageType === 'official') {

  if (localStorage.getItem('php')) {
    optionObj.php = parseInt(localStorage.getItem('php'), 10);
  }

  if (localStorage.getItem('twitterApiType')) {
    optionObj.twitterApiType = localStorage.getItem('twitterApiType');
  }

  if (localStorage.getItem('rssUrl')) {
    optionObj.rssUrl = localStorage.getItem('rssUrl');
  }

  if (localStorage.getItem('plan')) {
    optionObj.plan = localStorage.getItem('plan');
  }

// ---------------------------------------------
//   - WordPress Plugin
//   PHPで作成した関数から設定データを取得する
// ---------------------------------------------

} else {

  optionObj = gameUsersShareButtonsAdminOptionObj();

}

initialStateObj.topTheme = optionObj.topTheme || '';
initialStateObj.bottomTheme = optionObj.bottomTheme || '';
initialStateObj.php = optionObj.php;
initialStateObj.twitterApiType = optionObj.twitterApiType;
initialStateObj.rssUrl = optionObj.rssUrl;
initialStateObj.plan = optionObj.plan;



// console.log('initialStateObj = ', initialStateObj);



// --------------------------------------------------
//   Class GameUsersShareButtonsOption
//   オプションページ用のシェアボタンを出力するクラス
//   entry-share.jsx の GameUsersShareButtons を継承して作成
// --------------------------------------------------

class GameUsersShareButtonsOption extends GameUsersShareButtons {

  constructor() {

    super();

    this.uploadImageMap = Map();
    this.countInput = '';
    this.countInputMin = 0;
    this.countInputMax = 9999;
    this.id = '';

    Object.keys(shareObj).forEach((key) => {
      this.countObj[key] = null;
    });

    if (pageType === 'official') {
      this.shareButtonsBaseUrl = OFFICIAL_PLUGIN_URL;
    } else {
      this.shareButtonsBaseUrl = LOCAL_PLUGIN_URL;
    }

    this.shareButtonsFreeImageUrl = `${OFFICIAL_BASE_URL}react/contents/app/img/free.png`;

    this.containerSelector = '#game-users-share-buttons-option ';

  }



  setUploadImageObj(value) {
    this.uploadImageMap = value;
  }



  setCountInput(value) {
    this.countInput = value;
  }

  setCountInputMin(value) {
    this.countInputMin = value;
  }

  setCountInputMax(value) {
    this.countInputMax = value;
  }



  /**
   * 編集タブに表示する編集用のサンプルテーマを出力する
   * @param  {string} addClassName       クラスに追加する名前 - これがないとサンプルと一覧のスタイルシートが一緒になる
   * @param  {string} themeUrl           テーマのURL
   * @param  {boolean} uploadImageActive アップロードした画像を表示するかしないか - true / false
   * @return {string}                    シェアボタンのコード
   */
  shareButtonsSampleTheme(addClassName, themeUrl, uploadImageActive) {

    this.code = '';

    const themeName = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.name);
    const themeId = GameUsersShareButtonsCommon.escapeHtml(this.jsonObj.id);

    this.className = `game-users-share-buttons-${themeName}-${themeId}-${addClassName}`;


    if (this.jsonObj.style.type === 1 && this.jsonObj.style.version === 1) {
      this.styleType1Ver1();
    } else if (this.jsonObj.style.type === 2 && this.jsonObj.style.version === 1) {
      this.styleType2Ver1();
    }

    if (this.jsonObj.theme.type === 1 && this.jsonObj.theme.version === 1) {
      this.themeType1Ver1(themeUrl, uploadImageActive);
    } else if (this.jsonObj.theme.type === 2 && this.jsonObj.theme.version === 1) {
      this.themeType2Ver1(themeUrl, uploadImageActive);
    }

    return this.code;

  }



  // ---------------------------------------------
  //   カウントの数字をランダムな数字にする
  // ---------------------------------------------

  countRandom() {
    let count = '';

    if (this.countInput) {
      count = this.countInput;
    } else {
      const countMin = this.countInputMin || 0;
      const countMax = this.countInputMax ? this.countInputMax + (1 - this.countInputMin) : 9999;
      count = countMin + Math.floor(Math.random() * countMax);
    }

    return count;
  }


  countTwitter() {
    const type = 'twitter';

    if (!this.optionJsonObj.twitterApiType) {
      return;
    }

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countFacebook() {
    const type = 'facebook';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countHatena() {
    const type = 'hatena';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countPocket() {
    const type = 'pocket';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countPinterest() {
    const type = 'pinterest';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countLinkedIn() {
    const type = 'linkedin';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }

  countFeedly() {
    const type = 'feedly';

    this.countObj[type] = this.countRandom();
    this.countApply(type);
  }



  /**
   * ランダムなIDを作成する / 8文字
   * @return {string} ランダムなID
   */
  createId() {

    const str = 'abcdefghijklmnopqrstuvwxyz0123456789';

    this.id = '';
    for (let i = 0; i < 8; i += 1) {
      this.id += str[Math.floor(Math.random() * str.length)];
    }

    return this.id;

  }

}

export const instanceGameUsersShareButtonsOption = new GameUsersShareButtonsOption();



// --------------------------------------------------
//   Set Option
//   設定情報を GameUsersShareButtonsOption のインスタンスにセットする
// --------------------------------------------------

const optionJsonObj = {
  php: optionObj.php,
  twitterApiType: optionObj.twitterApiType,
  rssUrl: optionObj.rssUrl
};

instanceGameUsersShareButtonsOption.setOptionJsonObj(optionJsonObj);



// --------------------------------------------------
//   Immutable fromJSOrdered
//   Javascript のオブジェクト＆配列の順番を維持したまま
//   Immutable.js の Map / List に変換する
// --------------------------------------------------

export const fromJSOrdered = (data) => {

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return Seq(data).map(fromJSOrdered).toList();
  }

  return Seq(data).map(fromJSOrdered).toOrderedMap();

};



// --------------------------------------------------
//   Class Model
//   Immutable.js の Reacord クラスを継承して Model クラスを作成する
//   アプリケーションの State を担う
// --------------------------------------------------

const ModelRecord = Record(initialStateObj);

export class Model extends ModelRecord {

  constructor() {

    let map = fromJS(initialStateObj);

    if (Object.prototype.toString.call(optionObj.editThemesArr) === '[Array Array]') {
      map = map.set('editThemesList', fromJSOrdered([]));
    } else {
      map = map.set('editThemesList', fromJSOrdered(optionObj.editThemesArr));
    }

    super(map);

    // console.log('map = ', map.toJS());

  }



  setToggleEditForm(themeNameId) {

    let map = this;


    // --------------------------------------------------
    //   ToggleEditForm
    // --------------------------------------------------

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const toggleEditForm = map.getIn(['formMap', 'toggleEditForm']);

    if (!themeNameId) {
      return map.setIn(['formMap', 'toggleEditForm'], false);
    }

    if (toggleEditForm && themeNameId === currentThemeNameId) {
      return map.setIn(['formMap', 'toggleEditForm'], false);
    }

    map = map.setIn(['formMap', 'toggleEditForm'], true);


    // --------------------------------------------------
    //   CurrentThemeNameId
    // --------------------------------------------------

    map = map.setIn(['formMap', 'currentThemeNameId'], themeNameId);


    // --------------------------------------------------
    //   Data Edit Object
    // --------------------------------------------------

    if (!map.hasIn(['dataSampleThemesMap', themeNameId])) {
      const dataEditThemesMap = map.getIn(['dataEditThemesMap', themeNameId]);
      map = map.setIn(['dataSampleThemesMap', themeNameId], dataEditThemesMap);
    }


    // --------------------------------------------------
    //   Data Obj openedThemeType
    // --------------------------------------------------

    const openedThemeType = map.getIn(['dataSampleThemesMap', themeNameId, 'openedThemeType']);
    map = map.setIn(['formMap', 'currentThemeType'], openedThemeType);


    // --------------------------------------------------
    //   Share Type
    // --------------------------------------------------

    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const share = map.getIn(['dataSampleThemesMap', themeNameId, currentThemeType, 'share']);

    if (share.count() > 0) {
      map = map.setIn(['formMap', 'shareType'], share.keySeq().first());
    } else {
      map = map.setIn(['formMap', 'shareType'], '');
    }

    return map;

  }


  setShareImage(file, src, width, height, extension) {

    let map = this;


    // --------------------------------------------------
    //   データ取得
    // --------------------------------------------------

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);

    const shareImageWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth']);
    const shareImageHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight']);

    const { selectedIndex } = document.querySelector('#share-image-type');
    const shareImageType = document.querySelector('#share-image-type').options[selectedIndex].value;


    // --------------------------------------------------
    //   Upload Image に画像を登録
    // --------------------------------------------------

    map = map.setIn(['uploadImageMap', currentThemeNameId, currentThemeType, shareImageType, 'file'], file);
    map = map.setIn(['uploadImageMap', currentThemeNameId, currentThemeType, shareImageType, 'src'], src);


    // --------------------------------------------------
    //   画像のデフォルトサイズを入力
    // --------------------------------------------------

    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultWidth'], width);
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultHeight'], height);


    // --------------------------------------------------
    //   画像のサイズを入力
    // --------------------------------------------------

    if (shareImageWidth === '' && shareImageHeight === '') {
      map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth'], width);
      map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight'], height);
    }


    // --------------------------------------------------
    //   個別設定のフォームで表示する画像タイプ
    // --------------------------------------------------

    map = map.setIn(['formMap', 'shareType'], shareImageType);


    // --------------------------------------------------
    //   アップロードした画像のタイプがすでに存在する場合は、拡張子を更新
    //   存在しない場合はデータを新規挿入
    // --------------------------------------------------

    if (map.hasIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareImageType])) {

      map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareImageType, 'extension'], extension);

    } else {

      const tempObj = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share']).toJS();

      tempObj[shareImageType] = {
        button: true, count: true, extension, countDefaultText: '', countMin: '', countMax: ''
      };

      map = map.setIn(
        ['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share'],
        fromJSOrdered(tempObj)
      );

    }


    instanceGameUsersShareButtonsOption.setUploadImageObj(map.get('uploadImageMap'));

    return map;

  }

  setShareImageWidth(width) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const shareImageAspectRatioFixed = map.getIn(['formMap', 'shareImageAspectRatioFixed']);

    const shareImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultWidth']);
    const shareImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultHeight']);


    const widthNumber = width ? parseInt(width, 10) : '';


    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth'], widthNumber);

    if (shareImageAspectRatioFixed) {

      if (widthNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight'], '');
      } else {
        const height = Math.round(widthNumber * (shareImageDefaultHeight / shareImageDefaultWidth));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight'], height);
      }

    }

    return map;

  }

  setShareImageHeight(height) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const shareImageAspectRatioFixed = map.getIn(['formMap', 'shareImageAspectRatioFixed']);

    const shareImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultWidth']);
    const shareImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageDefaultHeight']);


    const heightNumber = height ? parseInt(height, 10) : '';
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight'], heightNumber);

    if (shareImageAspectRatioFixed) {

      if (heightNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth'], '');
      } else {
        const width = Math.round(heightNumber * (shareImageDefaultWidth / shareImageDefaultHeight));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth'], width);
      }

    }

    return map;

  }





  setFreeImageWidth(width) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const freeImageAspectRatioFixed = map.getIn(['formMap', 'freeImageAspectRatioFixed']);

    const freeImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageDefaultWidth']);
    const freeImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageDefaultHeight']);


    const widthNumber = width ? parseInt(width, 10) : '';
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageWidth'], widthNumber);

    if (freeImageAspectRatioFixed) {

      if (widthNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageHeight'], '');
      } else {
        const height = Math.round(widthNumber * (freeImageDefaultHeight / freeImageDefaultWidth));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageHeight'], height);
      }

    }

    return map;

  }

  setFreeImagHeight(height) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const freeImageAspectRatioFixed = map.getIn(['formMap', 'freeImageAspectRatioFixed']);

    const freeImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageDefaultWidth']);
    const freeImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageDefaultHeight']);


    const heightNumber = height ? parseInt(height, 10) : '';
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageHeight'], heightNumber);

    if (freeImageAspectRatioFixed) {

      if (heightNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageWidth'], '');
      } else {
        const width = Math.round(heightNumber * (freeImageDefaultWidth / freeImageDefaultHeight));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageWidth'], width);
      }

    }

    return map;

  }


  setFreeUploadImageWidth(width) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const freeUploadImageAspectRatioFixed = map.getIn(['formMap', 'freeUploadImageAspectRatioFixed']);

    const freeUploadImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultWidth']);
    const freeUploadImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultHeight']);


    const widthNumber = width ? parseInt(width, 10) : '';
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth'], widthNumber);

    if (freeUploadImageAspectRatioFixed) {

      if (widthNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight'], '');
      } else {
        const height = Math.round(widthNumber * (freeUploadImageDefaultHeight / freeUploadImageDefaultWidth));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight'], height);
      }

    }

    return map;

  }

  setFreeUploadImageHeight(height) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);
    const freeUploadImageAspectRatioFixed = map.getIn(['formMap', 'freeUploadImageAspectRatioFixed']);

    const freeUploadImageDefaultWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultWidth']);
    const freeUploadImageDefaultHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultHeight']);


    const heightNumber = height ? parseInt(height, 10) : '';
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight'], heightNumber);

    if (freeUploadImageAspectRatioFixed) {

      if (heightNumber === '') {
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth'], '');
      } else {
        const width = Math.round(heightNumber * (freeUploadImageDefaultWidth / freeUploadImageDefaultHeight));
        map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth'], width);
      }

    }

    return map;

  }

  setFreeUploadImageFile(file, src, width, height, extension) {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);

    const freeUploadImageWidth = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth']);
    const freeUploadImageHeight = map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight']);

    map = map.setIn(['uploadImageMap', currentThemeNameId, currentThemeType, 'freeUploadImage', 'file'], file);
    map = map.setIn(['uploadImageMap', currentThemeNameId, currentThemeType, 'freeUploadImage', 'src'], src);

    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultWidth'], width);
    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageDefaultHeight'], height);

    if (freeUploadImageWidth === '' && freeUploadImageHeight === '') {
      map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth'], width);
      map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight'], height);
    }

    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageExtension'], extension);

    return map;

  }


  setSortShareObj() {

    let map = this;

    const currentThemeNameId = map.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = map.getIn(['formMap', 'currentThemeType']);

    const selectors = document.querySelectorAll(`#sample-theme .game-users-share-buttons-${currentThemeNameId}-sample-box`);

    let tempMap = OrderedMap();

    Object.keys(selectors).forEach((key) => {

      const id = selectors[key].id.split('game-users-share-buttons-')[1];
      tempMap = tempMap.set(id, map.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', id]));

    });

    map = map.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share'], tempMap);

    return map;

  }



  /**
   * 公式サイト用 / テーマを追加する
   * @param  {string} themeNameId   テーマの名前とID
   * @return {Model}                Modelクラスのインスタンス
   */
  addEditThemesMap(themeNameId) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   存在していない場合に追加
    // --------------------------------------------------

    let editThemesList = map.get('editThemesList');

    if (!editThemesList.includes(themeNameId)) {
      editThemesList = editThemesList.unshift(themeNameId);
      map = map.set('editThemesList', editThemesList);
    }

    return map;


  }


  /**
   * 公式サイト用 / テーマを削除する
   * @param  {string} themeNameId   テーマの名前とID
   * @return {Model}                Modelクラスのインスタンス
   */
  deleteThemeOfficial(themeNameId) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   削除
    // --------------------------------------------------

    let editThemesList = map.get('editThemesList');

    if (editThemesList.includes(themeNameId)) {

      const key = editThemesList.indexOf(themeNameId);
      editThemesList = editThemesList.delete(key);
      map = map.set('editThemesList', editThemesList);

      map = map.deleteIn(['dataEditThemesMap', themeNameId]);

    }

    return map;


  }



  /**
   * WordPress Plugin用
   * テーマを新しく保存したときに New Theme のデータをリセットする
   * @param  {string} namePrev    過去のテーマの名前
   * @param  {string} idPrev      過去のテーマのID
   * @return {Model}              Modelクラスのインスタンス
   */
  resetNewTheme(namePrev, idPrev) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   New Theme の場合に処理
    // --------------------------------------------------

    if (!namePrev && !idPrev) {

      // --------------------------------------------------
      //   アップロードされた画像をリセットする
      // --------------------------------------------------

      map = map.deleteIn(['uploadImageMap', 'new-theme']);


      // --------------------------------------------------
      //   New Theme をリセット
      // --------------------------------------------------

      const newThemeMap = fromJS({
        type1: initialDataObjType1,
        type2: initialDataObjType2,
        openedThemeType: 'type1'
      });

      map = map.setIn(['dataSampleThemesMap', 'new-theme'], newThemeMap);

    }

    return map;

  }



  /**
   * 公式サイト用 / テーマタブで編集タブに移動ボタンを押したときに
   * 画像の情報（src）を uploadImageOfficialMap に登録する
   * @param  {string} themeNameId   テーマの名前とID
   * @param  {object} loadedDataObj data.json
   * @return {Model}                Modelクラスのインスタンス
   */
  setUploadImageOfficialMap(themeNameId, loadedDataObj) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   Theme Type / テーマタイプ
    // --------------------------------------------------

    let type = 'type1';

    if (loadedDataObj[themeNameId].type === 2) {
      type = 'type2';
    }


    // --------------------------------------------------
    //   Loop
    //   画像の src を作成する
    // --------------------------------------------------

    let tempMap = Map();

    const loopObj = loadedDataObj[themeNameId].share;

    Object.keys(loopObj).forEach((key) => {

      const src = `${OFFICIAL_THEME_DESIGN_URL}/${themeNameId}/${key}.${loopObj[key].extension}`;
      tempMap = tempMap.setIn([type, key, 'src'], src);

    });


    // --------------------------------------------------
    //   Set
    // --------------------------------------------------

    map = map.setIn(['uploadImageOfficialMap', themeNameId], tempMap);
    map = map.setIn(['uploadImageMap', themeNameId], tempMap);


    return map;

  }


  /**
   * 公式サイト用 / テーマを保存したときに
   * そのテーマのUploadImageMapをuploadImageOfficialMapにコピーする
   * @param  {string} themeNameId テーマの名前とID
   * @param  {string} namePrev    過去のテーマの名前
   * @param  {string} idPrev      過去のテーマのID
   * @return {Model}              Modelクラスのインスタンス
   */
  setUploadImageMapAndUploadImageOfficialMap(themeNameId, namePrev, idPrev) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   New Theme の場合、新しい名前のテーマをコピー
    // --------------------------------------------------

    if (!namePrev && !idPrev) {

      // --------------------------------------------------
      //   新しい名前のテーマをコピーする
      // --------------------------------------------------

      const uploadImageNewThemeMap = map.getIn(['uploadImageMap', 'new-theme']);
      map = map.setIn(['uploadImageMap', themeNameId], uploadImageNewThemeMap);


      // --------------------------------------------------
      //   アップロードされた画像をリセットする
      // --------------------------------------------------

      map = map.deleteIn(['uploadImageMap', 'new-theme']);


      // --------------------------------------------------
      //   New Theme のデータをリセット
      // --------------------------------------------------

      const newThemeMap = fromJS({
        type1: initialDataObjType1,
        type2: initialDataObjType2,
        openedThemeType: 'type1'
      });

      map = map.setIn(['dataSampleThemesMap', 'new-theme'], newThemeMap);

    }


    // --------------------------------------------------
    //   UploadImageMap を uploadImageOfficialMap にコピーする
    // --------------------------------------------------

    const uploadImageMap = map.getIn(['uploadImageMap', themeNameId]);
    map = map.setIn(['uploadImageOfficialMap', themeNameId], uploadImageMap);


    return map;

  }


  setDataObj(contentType, loadedDataObj) {

    let map = this;
    let googleFontsList = map.getIn(['googleFontsList']);


    if (!loadedDataObj) {
      return map;
    }


    let dataType = 'dataEditThemesMap';

    if (contentType === 'designThemes') {
      dataType = 'dataDesignThemesMap';
    } else if (contentType === 'iconThemes') {
      dataType = 'dataIconThemesMap';
    }


    // --------------------------------------------------
    //   編集のテーマがすべて削除された場合
    // --------------------------------------------------

    if (contentType === 'editThemes' && Object.keys(loadedDataObj).length === 0) {
      map = map.set('dataEditThemesMap', Map({}));
      return map;
    }



    Object.keys(loadedDataObj).forEach((key) => {

      const value = loadedDataObj[key];

      if (!value) {
        return;
      }


      const themeType = `type${value.theme.type}`;


      map = map.setIn([dataType, key, themeType], fromJS(value));


      let shareMap = OrderedMap();

      Object.keys(value.share).forEach((key2) => {
        const value2 = value.share[key2];
        shareMap = shareMap.set(key2, Map(value2));
      });

      map = map.setIn([dataType, key, themeType, 'share'], shareMap);


      if (!map.hasIn([dataType, key, 'type1'])) {
        map = map.setIn([dataType, key, 'type1'], fromJS(initialDataObjType1));
      }

      if (!map.hasIn([dataType, key, 'type2'])) {
        map = map.setIn([dataType, key, 'type2'], fromJS(initialDataObjType2));
      }

      map = map.setIn([dataType, key, 'namePrev'], value.name);
      map = map.setIn([dataType, key, 'idPrev'], value.id);
      map = map.setIn([dataType, key, 'openedThemeType'], themeType);


      // --------------------------------------------------
      //   Data Sample Themes Object
      // --------------------------------------------------

      if (contentType === 'editThemes' && !map.hasIn(['dataSampleThemesMap', key])) {
        const dataObj = map.getIn([dataType, key]);
        map = map.setIn(['dataSampleThemesMap', key], dataObj);
      }


      // --------------------------------------------------
      //   Google Fonts
      // --------------------------------------------------

      const countGoogleFont = map.getIn([dataType, key, themeType, 'countGoogleFont']);

      if (countGoogleFont && !googleFontsList.includes(countGoogleFont)) {
        googleFontsList = googleFontsList.push(countGoogleFont);
      }

    });

    map = map.set('googleFontsList', googleFontsList);


    return map;

  }




  /**
   * Google Font を入力する
   * @param {object} dataObj data.json を読み込んだオブジェクト
   * @return {Model}         Modelクラスのインスタンス
   */
  setCountGoogleFont(dataObj) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    // --------------------------------------------------
    //   Set Value
    // --------------------------------------------------

    let googleFontsList = map.getIn(['googleFontsList']);

    if (!dataObj) {
      return map;
    }


    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    Object.keys(dataObj).forEach((key) => {


      // --------------------------------------------------
      //   Google Fonts
      // --------------------------------------------------

      const googleFontObj = JSON.parse(dataObj[key].data);
      const googleFont = googleFontObj.countGoogleFont;

      if (!googleFontsList.includes(googleFont)) {
        googleFontsList = googleFontsList.push(googleFont);
      }


    });


    map = map.set('googleFontsList', googleFontsList);


    return map;

  }



  /**
   * currentThemeNameId（編集用に現在表示しているサンプルテーマ）を変更
   * 名前が変更されている場合は、その変更を適用する
   * @param  {string} name     テーマの名前
   * @param  {string} id       テーマのID
   * @param  {string} namePrev 過去のテーマの名前
   * @param  {string} idPrev   過去のテーマのID
   * @return {Model}           Modelクラスのインスタンス
   */
  setAjaxSaveTheme(name, id, namePrev, idPrev) {


    // --------------------------------------------------
    //   Copy State
    // --------------------------------------------------

    let map = this;


    const currentThemeNameId = `${name}-${id}`;
    const prevThemeNameId = `${namePrev}-${idPrev}`;


    // --------------------------------------------------
    //   現在のサンプルテーマ変更
    // --------------------------------------------------

    map = map.setIn(['formMap', 'currentThemeNameId'], currentThemeNameId);


    // --------------------------------------------------
    //   名前が変更されている場合
    // --------------------------------------------------

    if (namePrev && idPrev && (currentThemeNameId !== prevThemeNameId)) {

      map = map.deleteIn(['dataSampleThemesMap', prevThemeNameId]);
      map = map.deleteIn(['dataEditThemesMap', prevThemeNameId]);

      const uploadImageMap = map.getIn(['uploadImageMap', prevThemeNameId]);
      map = map.deleteIn(['uploadImageMap', prevThemeNameId]);
      map = map.setIn(['uploadImageMap', currentThemeNameId], uploadImageMap);

      if (map.get('pageType') === 'official') {
        const uploadImageOfficialMap = map.getIn(['uploadImageOfficialMap', prevThemeNameId]);
        map = map.deleteIn(['uploadImageOfficialMap', prevThemeNameId]);
        map = map.setIn(['uploadImageOfficialMap', currentThemeNameId], uploadImageOfficialMap);
      }

    }

    return map;

  }



  setCheckDownloadThemesList(themeNameId) {

    let map = this;

    let checkDownloadThemesList = map.getIn(['formMap', 'checkDownloadThemesList']);


    if (checkDownloadThemesList.includes(themeNameId)) {
      const number = checkDownloadThemesList.indexOf(themeNameId);
      checkDownloadThemesList = checkDownloadThemesList.delete(number);
    } else {
      checkDownloadThemesList = checkDownloadThemesList.push(themeNameId);
    }

    map = map.setIn(['formMap', 'checkDownloadThemesList'], checkDownloadThemesList);

    return map;

  }



}
