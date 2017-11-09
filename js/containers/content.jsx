// --------------------------------------------------
//   Import
// --------------------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'whatwg-fetch';
import JSZip from 'jszip';
import iziToast from 'izitoast';
import { saveAs } from 'file-saver';

import { OFFICIAL_BASE_URL, OFFICIAL_API_URL, LOCAL_PLUGIN_URL, instanceGameUsersShareButtonsOption, fromJSOrdered } from '../models/model';
import * as actions from '../actions/action';

import Content from '../components/content';

import '../../node_modules/izitoast/dist/css/iziToast.min.css';



const mapStateToProps = (state) => {

  const currentThemeNameId = state.getIn(['formMap', 'currentThemeNameId']);
  const currentThemeType = state.getIn(['formMap', 'currentThemeType']);
  const shareType = state.getIn(['formMap', 'shareType']);

  return ({


    // --------------------------------------------------
    //   Common
    // --------------------------------------------------

    stateModel: state,

    pageType: state.get('pageType'),
    topTheme: state.get('topTheme'),
    bottomTheme: state.get('bottomTheme'),
    php: state.get('php'),
    twitterApiType: state.get('twitterApiType'),
    rssUrl: state.get('rssUrl'),
    plan: state.get('plan'),

    editThemesList: state.get('editThemesList'),
    designThemesMap: state.get('designThemesMap'),
    iconThemesMap: state.get('iconThemesMap'),

    designThemesTotal: state.get('designThemesTotal'),
    iconThemesTotal: state.get('iconThemesTotal'),

    designRandomMap: state.get('designRandomMap'),
    iconRandomMap: state.get('iconRandomMap'),

    contentsNumberOfLines: state.get('contentsNumberOfLines'),
    editThemesPage: state.get('editThemesPage'),
    designThemesPage: state.get('designThemesPage'),
    iconThemesPage: state.get('iconThemesPage'),

    randomDesignThemesList: state.get('randomDesignThemesList'),
    randomIconThemesList: state.get('randomIconThemesList'),

    googleFontsList: state.get('googleFontsList'),

    toggleEditForm: state.getIn(['formMap', 'toggleEditForm']),
    editThemeFormErrorObj: state.getIn(['formMap', 'editThemeFormErrorObj']),
    checkStickySampleTheme: state.getIn(['formMap', 'checkStickySampleTheme']),
    currentThemeNameId,
    currentThemeType,
    optionType: state.getIn(['formMap', 'optionType']),
    shareType,
    shareImageAspectRatioFixed: state.getIn(['formMap', 'shareImageAspectRatioFixed']),
    freeImageAspectRatioFixed: state.getIn(['formMap', 'freeImageAspectRatioFixed']),
    freeUploadImageAspectRatioFixed: state.getIn(['formMap', 'freeUploadImageAspectRatioFixed']),
    countInput: state.getIn(['formMap', 'countInput']),
    countInputMin: state.getIn(['formMap', 'countInputMin']),
    countInputMax: state.getIn(['formMap', 'countInputMax']),
    countBackgroundColor: state.getIn(['formMap', 'countBackgroundColor']),
    countBackgroundColorHex: state.getIn(['formMap', 'countBackgroundColorHex']),
    checkDownloadThemesList: state.getIn(['formMap', 'checkDownloadThemesList']),

    dataSampleThemesMap: state.get('dataSampleThemesMap'),
    dataEditThemesMap: state.get('dataEditThemesMap'),
    dataDesignThemesMap: state.get('dataDesignThemesMap'),
    dataIconThemesMap: state.get('dataIconThemesMap'),
    uploadImageMap: state.get('uploadImageMap'),
    uploadImageOfficialMap: state.get('uploadImageOfficialMap'),


    // --------------------------------------------------
    //   Edit Form / 編集フォームで利用する値
    // --------------------------------------------------

    name: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'name']),

    shareButton: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'button']),
    shareCount: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'count']),
    shareCountDefaultText: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countDefaultText']),
    shareCountMin: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countMin']),
    shareCountMax: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countMax']),

    shareImageVerticalAlign: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageVerticalAlign']),
    shareImageWidth: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageWidth']),
    shareImageHeight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageHeight']),
    shareImageMarginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginTop']),
    shareImageMarginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginRight']),
    shareImageMarginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginBottom']),
    shareImageMarginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginLeft']),

    count: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'count']),
    countDirection: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countDirection']),
    countVerticalAlign: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countVerticalAlign']),
    countWidth: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countWidth']),
    countHeight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countHeight']),
    countMarginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginTop']),
    countMarginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginRight']),
    countMarginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginBottom']),
    countMarginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginLeft']),
    countPaddingTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingTop']),
    countPaddingRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingRight']),
    countPaddingBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingBottom']),
    countPaddingLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingLeft']),
    countBorderColor: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countBorderColor']),
    countBorderRadius: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countBorderRadius']),
    countTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countTop']),
    countLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countLeft']),
    countTextAlign: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countTextAlign']),
    countFont: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFont']),
    countGoogleFont: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countGoogleFont']),
    countFontColor: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontColor']),
    countFontSize: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontSize']),
    countFontStyle: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontStyle']),
    countFontWeight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontWeight']),

    freeImage: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImage']),
    freeImageVerticalAlign: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageVerticalAlign']),
    freeImageWidth: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageWidth']),
    freeImageHeight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageHeight']),
    freeImageMarginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginTop']),
    freeImageMarginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginRight']),
    freeImageMarginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginBottom']),
    freeImageMarginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginLeft']),

    freeUploadImage: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImage']),
    freeUploadImageUrl: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageUrl']),
    freeUploadImageAlt: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageAlt']),
    freeUploadImageVerticalAlign: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageVerticalAlign']),
    freeUploadImageWidth: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageWidth']),
    freeUploadImageHeight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageHeight']),
    freeUploadImageMarginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginTop']),
    freeUploadImageMarginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginRight']),
    freeUploadImageMarginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginBottom']),
    freeUploadImageMarginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginLeft']),

    boxMarginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginTop']),
    boxMarginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginRight']),
    boxMarginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginBottom']),
    boxMarginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginLeft']),
    marginTop: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginTop']),
    marginRight: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginRight']),
    marginBottom: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginBottom']),
    marginLeft: state.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginLeft']),

  });
};



const mapDispatchToProps = (dispatch) => {

  const bindActionObj = bindActionCreators(actions, dispatch);


  /**
   * ボタン画像をアップロードする
   * @param  {File} file ファイルオブジェクト
   */
  bindActionObj.funcShareImage = (file) => {

    const shareImageSizeLimit = 500000;

    if (!file) {
      return;
    }

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      iziToast.error({
        title: 'Error',
        message: '最新のブラウザを利用してください。'
      });
      return;
    }

    if (!file.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      iziToast.error({
        title: 'Error',
        message: 'アップロードできるのはPNG,GIF,JPEG,SVGの画像ファイルです。'
      });
      return;
    }

    if (shareImageSizeLimit < file.size) {
      iziToast.error({
        title: 'Error',
        message: '画像のサイズが大きすぎます。'
      });
      return;
    }


    const fileReader = new FileReader();

    fileReader.onload = () => {

      const img = new Image();
      img.src = fileReader.result;

      img.onload = () => {

        const { width } = img;
        const { height } = img;

        let extension = null;

        if (file.type === 'image/gif') {
          extension = 'gif';
        } else if (file.type === 'image/jpeg') {
          extension = 'jpg';
        } else if (file.type === 'image/png') {
          extension = 'png';
        } else {
          extension = 'svg';
        }

        dispatch(actions.funcShareImage(file, fileReader.result, width, height, extension));

      };

    };

    fileReader.readAsDataURL(file);

  };

  /**
   * ボタン画像を削除する
   */
  bindActionObj.funcShareImageDelete = () => {

    jQuery.confirm({
      icon: 'glyphicon glyphicon-question-sign',
      title: 'Question',
      content: 'シェアボタンを削除しますか？',
      theme: 'material',
      closeIcon: true,
      animation: 'scale',
      type: 'orange',
      backgroundDismiss: true,
      buttons: {
        OK: {
          text: 'OK',
          btnClass: 'btn-success',
          keys: ['enter'],
          action() {
            dispatch(actions.funcShareImageDelete());
          }
        },
        CANCEL: {
          text: 'CANCEL',
          btnClass: 'btn-default',
        }
      }
    });

  };

  /**
   * フリー画像をアップロードする
   * @param  {File} file ファイルオブジェクト
   */
  bindActionObj.funcFreeUploadImageFile = (file) => {

    const shareImageSizeLimit = 500000;


    if (!file) {
      return;
    }

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      iziToast.error({
        title: 'Error',
        message: '最新のブラウザを利用してください。'
      });
      return;
    }

    if (!file.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      iziToast.error({
        title: 'Error',
        message: 'アップロードできるのはPNG,GIF,JPEG,SVGの画像ファイルです。'
      });
      return;
    }

    if (shareImageSizeLimit < file.size) {
      iziToast.error({
        title: 'Error',
        message: '画像のサイズが大きすぎます。'
      });
      return;
    }


    const fileReader = new FileReader();

    fileReader.onload = () => {

      const img = new Image();
      img.src = fileReader.result;

      img.onload = () => {

        const { width } = img;
        const { height } = img;

        let extension = null;

        if (file.type === 'image/gif') {
          extension = 'gif';
        } else if (file.type === 'image/jpeg') {
          extension = 'jpg';
        } else if (file.type === 'image/png') {
          extension = 'png';
        } else {
          extension = 'svg';
        }

        dispatch(actions.funcFreeUploadImageFile(file, fileReader.result, width, height, extension));

      };

    };

    fileReader.readAsDataURL(file);

  };

  /**
   * テーマをダウンロードする
   * @param  {Model}   stateModel    Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   * @param  {string}  type          すべてのテーマをダウンロード all / チェックしたテーマをダウンロード check
   */
  bindActionObj.funcDownloadThemes = async (stateModel, currentTarget, type) => {


    // --------------------------------------------------
    //   Loading Start
    // --------------------------------------------------

    const instanceLadda = Ladda.create(currentTarget);
    instanceLadda.start();


    // --------------------------------------------------
    //   Set Value
    // --------------------------------------------------

    const pageType = stateModel.get('pageType');
    const dataEditThemesMap = stateModel.get('dataEditThemesMap');
    const uploadImageOfficialMap = stateModel.get('uploadImageOfficialMap');

    const queryControlCache = Math.floor(Math.random() * ((99999999 + 1) - 10000000)) + 10000000;
    const php = stateModel.get('php');
    const twitterApiType = stateModel.get('twitterApiType');
    const rssUrl = stateModel.get('rssUrl');


    // --------------------------------------------------
    //   JSZip
    // --------------------------------------------------

    const zip = new JSZip();


    // --------------------------------------------------
    //   Loop Object / ループ用のオブジェクトを作成する
    // --------------------------------------------------

    let loopArr = [];

    if (type === 'all') {
      loopArr = stateModel.get('editThemesList').toJS();
    } else {
      loopArr = stateModel.getIn(['formMap', 'checkDownloadThemesList']).toJS();
    }



    // --------------------------------------------------
    //   Internal Function
    // --------------------------------------------------

    /**
     * base64形式の文字列をBlob形式のファイルに変換する
     * @param  {string} base64   base64形式の文字列
     * @param  {string} mimeType image/png
     * @return {blob}            Blob形式のファイル / false
     */
    const toBlob = (base64, mimeType) => {

      const bin = atob(base64.replace(/^.*,/, ''));

      const buffer = new Uint8Array(bin.length);

      for (let i = 0; i < bin.length; i += 1) {
        buffer[i] = bin.charCodeAt(i);
      }

      // Blobを作成
      let blob = false;
      try {
        blob = new Blob([buffer.buffer], {
          type: mimeType,
        });
      } catch (e) {
        return false;
      }

      return blob;

    };



    /**
     * データを取得する
     * @param  {string} url          アクセスするURL
     * @param  {string} responseType text / blob
     * @return {data}                取得したデータ
     */
    const funcPromiseGet = (url, responseType) => new Promise((resolve) => {

      fetch(url, {
        method: 'GET',
        mode: 'same-origin'
      })
        .then((response) => {

          if (response.ok) {
            let responseValue = '';

            if (responseType === 'text') {
              responseValue = response.text();
            } else if (responseType === 'blob') {
              responseValue = response.blob();
            }

            return responseValue;
          }
        })
        .then((value) => {
          resolve(value);
        });

    });



    // --------------------------------------------------
    //   Await
    // --------------------------------------------------

    try {


      // --------------------------------------------------
      //   ダウンロードするテーマがない場合は処理停止
      // --------------------------------------------------

      if (loopArr.length === 0) {
        throw new Error('Error');
      }


      // --------------------------------------------------
      //   ダウンロードするファイルの URL を作成
      // --------------------------------------------------

      let urlShareBundleJs = null;
      let urlFreeImage = null;
      let urlPhp = null;

      if (pageType === 'official') {

        urlShareBundleJs = `${OFFICIAL_BASE_URL}react/contents/app/share-buttons/js/share-bundle.min.js`;
        urlFreeImage = `${OFFICIAL_BASE_URL}react/contents/app/share-buttons/img/free.png`;
        urlPhp = `${OFFICIAL_BASE_URL}react/contents/app/share-buttons/php/count.txt`;

      } else {

        urlShareBundleJs = `${LOCAL_PLUGIN_URL}js/share-bundle.min.js`;
        urlFreeImage = `${LOCAL_PLUGIN_URL}img/free.png`;
        urlPhp = `${LOCAL_PLUGIN_URL}php/count.txt`;

      }


      // --------------------------------------------------
      //   Get share-bundle.min.js
      // --------------------------------------------------

      const shareBundleJs = await funcPromiseGet(
        urlShareBundleJs,
        'text'
      );

      zip.file('gameusers-share-buttons/js/share-bundle.min.js', shareBundleJs, { binary: false });


      // --------------------------------------------------
      //   Get free.png / Black Cat Image
      // --------------------------------------------------

      const freeImage = await funcPromiseGet(
        urlFreeImage,
        'blob'
      );

      zip.file('gameusers-share-buttons/img/free.png', freeImage, { binary: true });


      // --------------------------------------------------
      //   Get count.php
      // --------------------------------------------------

      const countPhp = await funcPromiseGet(
        urlPhp,
        'text'
      );

      zip.file('gameusers-share-buttons/php/count.php', countPhp, { binary: false });


      // --------------------------------------------------
      //   Get option.json
      // --------------------------------------------------

      const optionObj = {
        queryControlCache,
        php,
        twitterApiType,
        rssUrl
      };

      const optionJs = JSON.stringify(optionObj);

      zip.file('gameusers-share-buttons/json/option.json', optionJs, { binary: false });



      // console.log('LOCAL_PLUGIN_URL = ', LOCAL_PLUGIN_URL);
      // console.log('LOCAL_PLUGIN_URL = ', `${LOCAL_PLUGIN_URL}js/share-bundle.min.js`);
      // return;


      // --------------------------------------------------
      //  Loop
      // --------------------------------------------------

      await Promise.all(Object.keys(loopArr).map(async (key) => {


        const themeNameId = loopArr[key];


        // --------------------------------------------------
        //   Official Site
        // --------------------------------------------------

        if (pageType === 'official') {


          // ---------------------------------------------
          //   - Get data.json
          // ---------------------------------------------

          const openedThemeType = dataEditThemesMap.getIn([themeNameId, 'openedThemeType']);
          const dataObj = dataEditThemesMap.getIn([themeNameId, openedThemeType]).toJS();
          const dataJson = JSON.stringify(dataObj);

          zip.file(`gameusers-share-buttons/themes/${themeNameId}/data.json`, dataJson, { binary: false });


          // ---------------------------------------------
          //   - Get Images
          // ---------------------------------------------

          const loopObj = uploadImageOfficialMap.getIn([themeNameId, openedThemeType]).toJS();


          await Promise.all(Object.keys(loopObj).map(async (shareImageType) => {

            const imageSrc = loopObj[shareImageType].src;


            // ---------------------------------------------
            //   Base64 Image
            // ---------------------------------------------

            if (imageSrc.indexOf('data:image') !== -1) {

              let fileName = loopObj[shareImageType].file.name;

              if (shareImageType === 'freeUploadImage') {
                fileName = `free.${dataObj.freeUploadImageExtension}`;
              }


              const fileType = loopObj[shareImageType].file.type;
              const blob = toBlob(imageSrc, fileType);

              zip.file(`gameusers-share-buttons/themes/${themeNameId}/${fileName}`, blob, { binary: true });


            // ---------------------------------------------
            //   Network Image
            // ---------------------------------------------

            } else {

              const tempArr = imageSrc.split(themeNameId)[1].split('.');
              const extension = tempArr[1];
              const imageName = `${shareImageType}.${extension}`;

              const image = await funcPromiseGet(
                imageSrc,
                'blob'
              );

              zip.file(`gameusers-share-buttons/themes/${themeNameId}/${imageName}`, image, { binary: true });

            }

          }));


        // --------------------------------------------------
        //   WordPress Plugin
        // --------------------------------------------------

        } else {


          // ---------------------------------------------
          //   - Get data.json
          // ---------------------------------------------

          const dataJson = await funcPromiseGet(
            `${LOCAL_PLUGIN_URL}themes/${themeNameId}/data.json`,
            'text'
          );

          zip.file(`gameusers-share-buttons/themes/${themeNameId}/data.json`, dataJson, { binary: false });


          // ---------------------------------------------
          //   - Get Images
          // ---------------------------------------------

          const dataObj = JSON.parse(dataJson);

          await Promise.all(Object.keys(dataObj.share).map(async (shareImageType) => {

            const imageName = `${shareImageType}.${dataObj.share[shareImageType].extension}`;

            const image = await funcPromiseGet(
              `${LOCAL_PLUGIN_URL}themes/${themeNameId}/${imageName}`,
              'blob'
            );

            zip.file(`gameusers-share-buttons/themes/${themeNameId}/${imageName}`, image, { binary: true });

          }));

        }

      }));


      // --------------------------------------------------
      //   Download Zip File
      // --------------------------------------------------

      zip.generateAsync({ type: 'blob' })
        .then((content) => {
          saveAs(content, 'gameusers-share-buttons.zip');

          iziToast.success({
            title: 'OK',
            message: 'ダウンロードしました。'
          });

        });

    } catch (e) {

      iziToast.error({
        title: 'Error',
        message: 'ダウンロードできませんでした。'
      });

    }


    // --------------------------------------------------
    //   Loading Stop
    // --------------------------------------------------

    instanceLadda.stop();

  };




  // --------------------------------------------------
  //   Async Promise
  // --------------------------------------------------

  const promiseReadDataJson = (dataObj, contentsNumberOfLines, list, ajaxBasicUrl, page) => new Promise((resolve) => {

    const limit = contentsNumberOfLines;

    let slicedList = null;
    let count = 0;
    const returnObj = {};

    const beginNum = limit * (page - 1);
    const endNum = beginNum + limit;

    slicedList = list.slice(beginNum, endNum);


    if (slicedList.count() === 0) {
      resolve({});
      // return;
    }


    slicedList.valueSeq().forEach((themeNameId) => {

      if (dataObj.has(themeNameId)) {
        count += 1;

        if (count >= slicedList.count()) {
          resolve();
        }

        return;
      }


      const ajaxUrl = `${ajaxBasicUrl}/${themeNameId}/data.json`;

      fetch(ajaxUrl, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'same-origin',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((jsonObj) => {
          returnObj[themeNameId] = jsonObj;
          count += 1;

          if (count >= slicedList.count()) {
            resolve(returnObj);
          }
        });

    });

  });



  /**
   * APIにアクセスしてJSONで取得したオブジェクトを返す
   * @param  {string} url         API の URL
   * @param  {string} method      POST / GET
   * @param  {string} credentials クッキーを送信するか - omit：決してクッキーを送信しない / same-origin：URL が呼び出し元のスクリプトと同一オリジンだった場合のみ、クッキーを送信する / include：クロスオリジンの呼び出しであっても、常にクッキーを送信する
   * @param  {string} mode        モード - cors / no-cors / same-origin : https://developer.mozilla.org/ja/docs/Web/API/Request/mode
   * @param  {FormData} formData  new FormData で作成したオブジェクト
   * @return {Promise}            Promise オブジェクト
   */
  const fetchApi = (url, method, credentials, mode, formData) => new Promise((resolve) => {

    const optionObj = {
      method,
      credentials,
      mode
    };

    if (method === 'POST') {
      optionObj.body = formData;
    }


    fetch(url, optionObj)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonObj) => {
        resolve(jsonObj);
      });

  });



  /**
   * 最初に非同期通信を行って必要なデータを取得する
   * 各テーマの data.json など
   * @param {Model} stateModel Modelクラスのインスタンス
   */
  bindActionObj.funcInitialAsynchronous = async (stateModel) => {

    // console.log('funcInitialAsynchronous');

    // --------------------------------------------------
    //   Set Data
    // --------------------------------------------------

    const pageType = stateModel.get('pageType');
    const contentsNumberOfLines = stateModel.get('contentsNumberOfLines');
    const page = 1;


    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    formData.append('apiType', 'shareButtonsFirstThemes');
    formData.append('limit', contentsNumberOfLines);
    formData.append('page', page);


    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    try {


      // --------------------------------------------------
      //   designThemesMap & iconThemesMap
      // --------------------------------------------------

      const returnObj = await fetchApi(OFFICIAL_API_URL, 'POST', 'omit', 'cors', formData);

      const designThemesMap = fromJSOrdered(returnObj.designArr);
      const iconThemesMap = fromJSOrdered(returnObj.iconArr);
      const { designThemesTotal } = returnObj;
      const { iconThemesTotal } = returnObj;
      const designRandomMap = fromJSOrdered(returnObj.designRandomArr);
      const iconRandomMap = fromJSOrdered(returnObj.iconRandomArr);


      // --------------------------------------------------
      //   data.json を取得する
      //   ワードプレスプラグインの場合のみ
      // --------------------------------------------------

      const editThemesDataObj = {};

      if (pageType === 'wordPressPlugin') {

        const loopArr = [];

        const editThemesList = stateModel.get('editThemesList');
        const slicedEditThemesList = editThemesList.slice(0, contentsNumberOfLines);

        slicedEditThemesList.valueSeq().forEach((themeNameId) => {
          loopArr.push(themeNameId);
        });

        // console.log('editThemesList = ', editThemesList.toJS());
        // console.log('slicedEditThemesList = ', slicedEditThemesList.toJS());
        // console.log('loopArr = ', loopArr);


        await Promise.all(Object.keys(loopArr).map(async (key) => {
          // console.log(key);

          const themeNameId = loopArr[key];
          // console.log(themeNameId);
          editThemesDataObj[themeNameId] = await fetchApi(`${LOCAL_PLUGIN_URL}themes/${themeNameId}/data.json`, 'GET', 'omit', 'same-origin', null);

        }));

      }


      // --------------------------------------------------
      //   Dispatch
      // --------------------------------------------------

      dispatch(actions.funcInitialAsynchronous(designThemesMap, iconThemesMap, designThemesTotal, iconThemesTotal, designRandomMap, iconRandomMap, editThemesDataObj));


    } catch (e) {
      //
    }

  };


  /**
   * テーマを取得して表示する
   * @param  {Model}   stateModel  Modelクラスのインスタンス
   * @param  {string}  contentType 表示するテーマの種類 / editThemes / designThemes / iconThemes
   * @param  {number}  page        表示するページ
   */
  bindActionObj.funcChangeShareButtonsList = async (stateModel, contentType, page) => {


    // --------------------------------------------------
    //   Set Value
    // --------------------------------------------------

    let returnObj = {};

    let list = null;
    let ajaxBasicUrl = '';
    let dataObj = '';
    let selector = null;
    const contentsNumberOfLines = stateModel.get('contentsNumberOfLines');


    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    formData.append('limit', contentsNumberOfLines);
    formData.append('page', page);


    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    if (contentType === 'editThemes') {

      dataObj = stateModel.get('dataEditThemesMap');
      list = stateModel.get('editThemesList');
      ajaxBasicUrl = `${LOCAL_PLUGIN_URL}themes`;
      returnObj = await promiseReadDataJson(dataObj, contentsNumberOfLines, list, ajaxBasicUrl, page);

      selector = document.querySelector('#edit-themes-hr');

    } else if (contentType === 'designThemes') {

      formData.append('apiType', 'shareButtonsDesignThemes');
      returnObj = await fetchApi(OFFICIAL_API_URL, 'POST', 'omit', 'cors', formData);
      selector = document.querySelector('#design-themes-hr');

    } else {

      formData.append('apiType', 'shareButtonsIconThemes');
      returnObj = await fetchApi(OFFICIAL_API_URL, 'POST', 'omit', 'cors', formData);
      selector = document.querySelector('#icon-themes-hr');

    }

    dispatch(actions.funcChangeShareButtonsList(returnObj, contentType, page));


    // --------------------------------------------------
    //   ページ上部に移動
    // --------------------------------------------------

    const clientRect = selector.getBoundingClientRect();
    const { top } = clientRect;
    const pageY = window.pageYOffset + top;
    window.scrollTo(0, pageY - 50);


  };





  // --------------------------------------------------
  //   Ajax
  // --------------------------------------------------

  /**
   * 編集タブでテーマを保存する
   * @param  {Model}   stateModel    Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   */
  bindActionObj.funcAjaxSaveTheme = async (stateModel, currentTarget) => {


    // --------------------------------------------------
    //   Loading Start
    // --------------------------------------------------

    const instanceLadda = Ladda.create(currentTarget);
    instanceLadda.start();


    // --------------------------------------------------
    //   Get Data
    // --------------------------------------------------

    const currentThemeNameId = stateModel.getIn(['formMap', 'currentThemeNameId']);
    const currentThemeType = stateModel.getIn(['formMap', 'currentThemeType']);

    let dataObj = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType]);
    const share = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share']);
    const uploadImageMap = stateModel.getIn(['uploadImageMap', currentThemeNameId, currentThemeType]);
    const name = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'name']);
    const id = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'id']);
    const namePrev = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, 'namePrev']);
    const idPrev = stateModel.getIn(['dataSampleThemesMap', currentThemeNameId, 'idPrev']);


    // --------------------------------------------------
    //   Stop
    // --------------------------------------------------

    if (!name.match(/^[a-z0-9]{1,20}$/) || share.count() === 0) {
      instanceLadda.stop();
      return;
    }


    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    if (name !== namePrev && idPrev) {
      formData.append('themeNameIdPrev', `${namePrev}-${idPrev}`);
    }

    if (!id) {
      if (idPrev) {
        dataObj = dataObj.set('id', idPrev);
      } else {
        dataObj = dataObj.set('id', instanceGameUsersShareButtonsOption.createId());
      }
    }

    formData.append('dataJson', encodeURIComponent(JSON.stringify(dataObj.toJS())));


    if (uploadImageMap) {

      uploadImageMap.entrySeq().forEach((e) => {

        const key = e[0];
        const value = e[1];
        const file = value.get('file');

        formData.append(`${key}`, file);

      });

    }



    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    try {


      const pageType = stateModel.get('pageType');


      // ---------------------------------------------
      //   - Official Site
      //   stateに指定テーマを保存する
      // ---------------------------------------------

      if (pageType === 'official') {

        const loadedDataObj = {};
        loadedDataObj[`${dataObj.get('name')}-${dataObj.get('id')}`] = dataObj.toJS();

        const themeNameId = `${dataObj.get('name')}-${dataObj.get('id')}`;


        dispatch(actions.funcAjaxSaveThemeOfficial(loadedDataObj, dataObj.get('name'), dataObj.get('id'), namePrev, idPrev, themeNameId));


      // ---------------------------------------------
      //   - WordPress Plugin
      //   APIにアクセスしてPHP上でテーマを保存する
      // ---------------------------------------------

      } else {

        const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_save_theme`, 'POST', 'same-origin', 'same-origin', formData);

        if (returnObj.error) {
          throw new Error();
        }

        const loadedDataObj = {};
        loadedDataObj[`${dataObj.get('name')}-${dataObj.get('id')}`] = dataObj.toJS();
        const editThemesList = fromJSOrdered(returnObj.editThemesArr);


        dispatch(actions.funcAjaxSaveTheme(loadedDataObj, dataObj.get('name'), dataObj.get('id'), namePrev, idPrev, editThemesList));

      }


      iziToast.success({
        title: 'OK',
        message: '保存しました。'
      });

    } catch (e) {

      iziToast.error({
        title: 'Error',
        message: '保存できませんでした。'
      });

    }


    // --------------------------------------------------
    //   Loading Stop
    // --------------------------------------------------

    instanceLadda.stop();

  };

  /**
   * 編集タブからテーマを削除する
   * @param  {Model}   stateModel    Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   * @param  {string}  themeNameId   テーマの名前とID
   */
  bindActionObj.funcAjaxDeleteTheme = async (stateModel, currentTarget, themeNameId) => {


    // --------------------------------------------------
    //   Function
    // --------------------------------------------------

    const func = async () => {


      // --------------------------------------------------
      //   Loading Start
      // --------------------------------------------------

      const instanceLadda = Ladda.create(currentTarget);
      instanceLadda.start();


      // --------------------------------------------------
      //   FormData
      // --------------------------------------------------

      const formData = new FormData();
      formData.append('themeNameId', themeNameId);


      // --------------------------------------------------
      //   Await
      // --------------------------------------------------

      try {


        const pageType = stateModel.get('pageType');


        // ---------------------------------------------
        //   - Official Site
        //   state から指定テーマを削除する
        // ---------------------------------------------

        if (pageType === 'official') {

          dispatch(actions.funcAjaxDeleteThemeOfficial(themeNameId));


        // ---------------------------------------------
        //   - WordPress Plugin
        //   APIにアクセスしてPHPからテーマファイルを削除する
        // ---------------------------------------------

        } else {

          const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_delete_theme`, 'POST', 'same-origin', 'same-origin', formData);

          if (returnObj.error) {
            throw new Error();
          }


          const editThemesList = fromJSOrdered(returnObj.editThemesArr);
          const dataObj = stateModel.get('dataSampleThemesMap');
          const contentsNumberOfLines = stateModel.get('contentsNumberOfLines');
          const ajaxBasicUrl = `${LOCAL_PLUGIN_URL}themes/`;
          const editThemesPage = stateModel.get('editThemesPage');


          const returnObjPromiseReadDataJson = await promiseReadDataJson(dataObj, contentsNumberOfLines, editThemesList, ajaxBasicUrl, editThemesPage);


          dispatch(actions.funcAjaxDeleteTheme(editThemesList, returnObjPromiseReadDataJson));

        }


        iziToast.success({
          title: 'OK',
          message: '削除しました。'
        });

      } catch (e) {

        iziToast.error({
          title: 'Error',
          message: '削除できませんでした。'
        });

      }


      // --------------------------------------------------
      //   Loading Stop
      // --------------------------------------------------

      instanceLadda.stop();

    };


    // --------------------------------------------------
    //   Confirm
    // --------------------------------------------------

    jQuery.confirm({
      icon: 'glyphicon glyphicon-question-sign',
      title: 'Question',
      content: 'このテーマを削除しますか？',
      theme: 'material',
      closeIcon: true,
      animation: 'scale',
      type: 'orange',
      backgroundDismiss: true,
      buttons: {
        OK: {
          text: 'OK',
          btnClass: 'btn-success',
          keys: ['enter'],
          action() {
            func();
          }
        },
        CANCEL: {
          text: 'CANCEL',
          btnClass: 'btn-default',
        }
      }
    });

  };

  /**
   * 記事の上部・下部に表示するシェアボタンを選択する
   * @param  {Model}   stateModel    Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   * @param  {string}  themeNameId   テーマの名前とID
   */
  bindActionObj.funcAjaxSetTopBottomTheme = async (stateModel, currentTarget, type, themeNameId) => {


    // --------------------------------------------------
    //   Loading Start
    // --------------------------------------------------

    let instanceLadda = null;

    if (currentTarget) {
      instanceLadda = Ladda.create(currentTarget);
      instanceLadda.start();
    }


    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    formData.append('type', type);
    formData.append('themeNameId', themeNameId);


    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    try {

      const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_set_top_bottom_theme`, 'POST', 'same-origin', 'same-origin', formData);

      if (returnObj.error) {
        throw new Error();
      }

      if (type === 'top') {
        dispatch(actions.funcTopTheme(returnObj.top));
      } else if (type === 'bottom') {
        dispatch(actions.funcBottomTheme(returnObj.bottom));
      }

      iziToast.success({
        title: 'OK',
        message: '変更しました。'
      });

    } catch (e) {

      iziToast.error({
        title: 'Error',
        message: '変更できませんでした。'
      });

    }


    // --------------------------------------------------
    //   Loading Stop
    // --------------------------------------------------

    if (currentTarget) {
      instanceLadda.stop();
    }

  };

  /**
   * 設定タブで設定を保存する
   * @param  {Model}  stateModel     Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   */
  bindActionObj.funcAjaxSaveOption = async (stateModel, currentTarget) => {


    // --------------------------------------------------
    //   Loading Start
    // --------------------------------------------------

    const instanceLadda = Ladda.create(currentTarget);
    instanceLadda.start();


    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    const php = document.querySelector('#option-php').options[document.querySelector('#option-php').selectedIndex].value;
    const twitterApiType = document.querySelector('#option-twitter-api-type').options[document.querySelector('#option-twitter-api-type').selectedIndex].value;
    const rssUrl = document.querySelector('#option-rss-url').value;

    formData.append('php', php);
    formData.append('twitterApiType', twitterApiType);
    formData.append('rssUrl', rssUrl);



    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    try {


      const pageType = stateModel.get('pageType');


      // ---------------------------------------------
      //   - Official Site
      //   Web Storage で設定データを保存する
      // ---------------------------------------------

      if (pageType === 'official') {

        localStorage.setItem('php', php);
        localStorage.setItem('twitterApiType', twitterApiType);
        localStorage.setItem('rssUrl', rssUrl);


      // ---------------------------------------------
      //   - WordPress Plugin
      //   APIにアクセスして設定データを保存する
      // ---------------------------------------------

      } else {

        const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_save_option`, 'POST', 'same-origin', 'same-origin', formData);

        if (returnObj.error) {
          throw new Error();
        }

      }


      dispatch(actions.funcAjaxSaveOption(php, twitterApiType, rssUrl));


      // ---------------------------------------------
      //   データを設定しなおす
      // ---------------------------------------------

      const optionJsonObj = {
        php,
        twitterApiType,
        rssUrl
      };

      instanceGameUsersShareButtonsOption.setOptionJsonObj(optionJsonObj);


      iziToast.success({
        title: 'OK',
        message: '保存しました。'
      });

    } catch (e) {

      iziToast.error({
        title: 'Error',
        message: '保存できませんでした。'
      });

    }


    // --------------------------------------------------
    //   Loading Stop
    // --------------------------------------------------

    instanceLadda.stop();

  };

  /**
   * プランタブでプランを変更する
   * @param  {Model}  stateModel     Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   */
  bindActionObj.funcAjaxChangePlan = async (stateModel, currentTarget) => {


    // --------------------------------------------------
    //   Function
    //   Confirm内で使用するため処理を関数化している
    //   プランを変更しますか？ → OKで処理スタート
    // --------------------------------------------------

    const func = async () => {


      // --------------------------------------------------
      //   Loading Start
      // --------------------------------------------------

      const instanceLadda = Ladda.create(currentTarget);
      instanceLadda.start();


      // --------------------------------------------------
      //   FormData
      // --------------------------------------------------

      const formData = new FormData();

      let plan = 'free';

      if (document.querySelector('#plan-free').checked) {
        plan = 'free';
      } else if (document.querySelector('#plan-premium').checked) {
        plan = 'premium';
      } else if (document.querySelector('#plan-business').checked) {
        plan = 'business';
      }

      formData.append('plan', plan);


      // --------------------------------------------------
      //   Await & Dispatch
      // --------------------------------------------------

      try {

        const pageType = stateModel.get('pageType');


        // ---------------------------------------------
        //   - Official Site
        //   Web Storage でプランを保存する
        // ---------------------------------------------

        if (pageType === 'official') {

          localStorage.setItem('plan', plan);


        // ---------------------------------------------
        //   - WordPress Plugin
        //   APIにアクセスしてプランを保存する
        // ---------------------------------------------

        } else {

          const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_change_plan`, 'POST', 'same-origin', 'same-origin', formData);

          if (returnObj.error) {
            throw new Error();
          }

        }


        dispatch(actions.funcPlan(plan));

        iziToast.success({
          title: 'OK',
          message: '変更しました。'
        });

      } catch (e) {

        iziToast.error({
          title: 'Error',
          message: '変更できませんでした。'
        });

      }


      // --------------------------------------------------
      //   Loading Stop
      // --------------------------------------------------

      instanceLadda.stop();

    };


    // --------------------------------------------------
    //   Confirm
    // --------------------------------------------------

    jQuery.confirm({
      icon: 'glyphicon glyphicon-question-sign',
      title: 'Question',
      content: 'プランを変更しますか？',
      theme: 'material',
      closeIcon: true,
      animation: 'scale',
      type: 'orange',
      backgroundDismiss: true,
      buttons: {
        OK: {
          text: 'OK',
          btnClass: 'btn-success',
          keys: ['enter'],
          action() {
            func();
          }
        },
        CANCEL: {
          text: 'CANCEL',
          btnClass: 'btn-default',
        }
      }
    });

  };

  /**
   * テーマタブから編集タブにテーマを移動させる
   * @param  {Model}  stateModel     Modelクラスのインスタンス
   * @param  {string}  currentTarget クリックしたボタンのエレメント
   * @param  {string}  themeNameId   テーマの名前とID
   */
  bindActionObj.funcAjaxMoveEditTab = async (stateModel, currentTarget, themeNameId) => {


    // --------------------------------------------------
    //   Loading Start
    // --------------------------------------------------

    const instanceLadda = Ladda.create(currentTarget);
    instanceLadda.start();


    // --------------------------------------------------
    //   Get Data
    // --------------------------------------------------

    const designThemesMap = stateModel.getIn(['designThemesMap', themeNameId]).delete('data');
    // designThemesMap.delete('data');
    // console.log('designThemesMap = ', designThemesMap.toJS());
    // return;

    // --------------------------------------------------
    //   FormData
    // --------------------------------------------------

    const formData = new FormData();

    formData.append('themeNameId', themeNameId);

    if (designThemesMap) {
      formData.append('themeData', encodeURIComponent(JSON.stringify(designThemesMap.toJS())));
    }


    // --------------------------------------------------
    //   Await & Dispatch
    // --------------------------------------------------

    try {


      const pageType = stateModel.get('pageType');
      // console.log('pageType = ', pageType);
      // console.log('stateModel = ', stateModel.toJS());


      // ---------------------------------------------
      //   - Official Site
      //   デザインテーマから data.json を取得するだけ
      // ---------------------------------------------

      if (pageType === 'official') {

        const loadedDataObj = {};
        // loadedDataObj[themeNameId] = await funcPromiseGetDataJson(OFFICIAL_THEME_DESIGN_URL, themeNameId);
        // loadedDataObj[themeNameId] = await fetchApi(`${OFFICIAL_THEME_DESIGN_URL}/${themeNameId}/data.json`, 'GET', 'omit', 'same-origin', null);


        loadedDataObj[themeNameId] = JSON.parse(stateModel.getIn(['designThemesMap', themeNameId, 'data']));
        // console.log('loadedDataObj', loadedDataObj);


        dispatch(actions.funcAjaxMoveEditTabOfficial(themeNameId, loadedDataObj));


      // ---------------------------------------------
      //   - WordPress Plugin
      //   APIにアクセスしてPHP側でテーマをコピーする
      // ---------------------------------------------

      } else {

        const returnObj = await fetchApi(`${gameUsersShareButtonsAdminAjaxUrl()}?action=gameusers_share_buttons_ajax_move_edit_tab`, 'POST', 'same-origin', 'same-origin', formData);

        if (returnObj.error) {
          throw new Error();
        }


        const editThemesList = fromJSOrdered(returnObj.editThemesArr);

        const loadedDataObj = {};
        // loadedDataObj[themeNameId] = await funcPromiseGetDataJson(`${LOCAL_PLUGIN_URL}themes`, themeNameId);
        loadedDataObj[themeNameId] = await fetchApi(`${LOCAL_PLUGIN_URL}themes/${themeNameId}/data.json`, 'GET', 'omit', 'same-origin', null);


        dispatch(actions.funcAjaxMoveEditTab(editThemesList, loadedDataObj));

      }

      iziToast.success({
        title: 'OK',
        message: '移動しました。'
      });

    } catch (e) {

      iziToast.error({
        title: 'Error',
        message: '移動できませんでした。'
      });

    }


    // --------------------------------------------------
    //   Loading Stop
    // --------------------------------------------------

    instanceLadda.stop();

  };



  return bindActionObj;

};



const ContainerContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);



export default ContainerContent;
