// --------------------------------------------------
//   Import
// --------------------------------------------------

import { fromJSOrdered, Model } from '../models/model';



const reducer = (state = new Model(), action) => {

  const currentThemeNameId = state.getIn(['formMap', 'currentThemeNameId']);
  const currentThemeType = state.getIn(['formMap', 'currentThemeType']);
  const shareType = state.getIn(['formMap', 'shareType']);

  switch (action.type) {

    case 'INITIAL_ASYNCHRONOUS': {
      return state
        .set('designThemesMap', action.designThemesMap)
        .set('iconThemesMap', action.iconThemesMap)
        .set('designThemesTotal', action.designThemesTotal)
        .set('iconThemesTotal', action.iconThemesTotal)
        .set('designRandomMap', action.designRandomMap)
        .set('iconRandomMap', action.iconRandomMap)
        .setDataObj('editThemes', action.editThemesDataObj)
        .setCountGoogleFont(action.designThemesMap.toJS())
        .setCountGoogleFont(action.iconThemesMap.toJS())
        .setCountGoogleFont(action.designRandomMap.toJS())
        .setCountGoogleFont(action.iconRandomMap.toJS());
    }



    case 'TOP_THEME': {
      return state.set('topTheme', action.value);
    }

    case 'BOTTOM_THEME': {
      return state.set('bottomTheme', action.value);
    }



    case 'PLAN': {
      return state.set('plan', action.value);
    }



    case 'TOGGLE_EDIT_FORM': {
      return state.setToggleEditForm(action.value);
    }



    case 'CHECK_STICKY_SAMPLE_THEME': {
      return state.setIn(['formMap', 'checkStickySampleTheme'], action.value);
    }

    case 'CURRENT_THEME_TYPE': {
      return state
        .setIn(['formMap', 'currentThemeType'], action.value)
        .setIn(['dataSampleThemesMap', currentThemeNameId, 'openedThemeType'], action.value);
    }




    case 'SHARE_IMAGE_ASPECT_RATIO_FIXED': {
      return state.setIn(['formMap', 'shareImageAspectRatioFixed'], action.value);
    }

    case 'FREE_IMAGE_ASPECT_RATIO_FIXED': {
      return state.setIn(['formMap', 'freeImageAspectRatioFixed'], action.value);
    }

    case 'FREE_UPLOAD_IMAGE_ASPECT_RATIO_FIXED': {
      return state.setIn(['formMap', 'freeUploadImageAspectRatioFixed'], action.value);
    }

    case 'NAME': {
      return state
        .setIn(['dataSampleThemesMap', currentThemeNameId, 'type1', 'name'], action.value)
        .setIn(['dataSampleThemesMap', currentThemeNameId, 'type2', 'name'], action.value);
    }

    case 'SHARE_IMAGE': {
      return state.setShareImage(action.file, action.src, action.width, action.height, action.extension);
    }

    case 'OPTION_TYPE': {
      return state.setIn(['formMap', 'optionType'], action.value);
    }

    case 'SHARE_TYPE': {
      return state.setIn(['formMap', 'shareType'], action.value);
    }

    case 'SHARE_BUTTON': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'button'], action.value);
    }

    case 'SHARE_COUNT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'count'], action.value);
    }

    case 'SHARE_COUNT_DEFAULT_TEXT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countDefaultText'], action.value);
    }

    case 'SHARE_COUNT_MIN': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countMin'], number);
    }

    case 'SHARE_COUNT_MAX': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType, 'countMax'], number);
    }

    case 'SHARE_IMAGE_DELETE': {
      return state
        .deleteIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'share', shareType])
        .deleteIn(['uploadImageMap', currentThemeNameId, currentThemeType, shareType]);
    }


    case 'SHARE_IMAGE_VERTICAL_ALIGN': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageVerticalAlign'], action.value);
    }

    case 'SHARE_IMAGE_WIDTH': {
      return state.setShareImageWidth(action.value);
    }

    case 'SHARE_IMAGE_HEIGHT': {
      return state.setShareImageHeight(action.value);
    }

    case 'SHARE_IMAGE_MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginTop'], number);
    }

    case 'SHARE_IMAGE_MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginRight'], number);
    }

    case 'SHARE_IMAGE_MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginBottom'], number);
    }

    case 'SHARE_IMAGE_MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'shareImageMarginLeft'], number);
    }



    case 'COUNT_INPUT': {
      return state.setIn(['formMap', 'countInput'], action.value);
    }

    case 'COUNT_INPUT_MIN': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['formMap', 'countInputMin'], number);
    }

    case 'COUNT_INPUT_MAX': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['formMap', 'countInputMax'], number);
    }

    case 'COUNT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'count'], action.value);
    }

    case 'COUNT_DIRECTION': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countDirection'], action.value);
    }

    case 'COUNT_VERTICAL_ALIGN': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countVerticalAlign'], action.value);
    }

    case 'COUNT_WIDTH': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countWidth'], number);
    }

    case 'COUNT_HEIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countHeight'], number);
    }

    case 'COUNT_MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginTop'], number);
    }

    case 'COUNT_MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginRight'], number);
    }

    case 'COUNT_MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginBottom'], number);
    }

    case 'COUNT_MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countMarginLeft'], number);
    }

    case 'COUNT_PADDING_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingTop'], number);
    }

    case 'COUNT_PADDING_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingRight'], number);
    }

    case 'COUNT_PADDING_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingBottom'], number);
    }

    case 'COUNT_PADDING_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countPaddingLeft'], number);
    }

    case 'COUNT_BORDER_COLOR': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countBorderColor'], action.value);
    }

    case 'COUNT_BORDER_RADIUS': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countBorderRadius'], number);
    }

    case 'COUNT_BACKGROUND_COLOR': {
      return state.setIn(['formMap', 'countBackgroundColor'], action.value);
    }

    case 'COUNT_BACKGROUND_COLOR_HEX': {
      return state.setIn(['formMap', 'countBackgroundColorHex'], action.value);
    }

    case 'COUNT_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countTop'], number);
    }

    case 'COUNT_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countLeft'], number);
    }

    case 'COUNT_TEXT_ALIGN': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countTextAlign'], action.value);
    }

    case 'COUNT_FONT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFont'], action.value);
    }

    case 'COUNT_GOOGLE_FONT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countGoogleFont'], action.value);
    }

    case 'COUNT_FONT_COLOR': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontColor'], action.value);
    }

    case 'COUNT_FONT_SIZE': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontSize'], number);
    }

    case 'COUNT_FONT_STYLE': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontStyle'], action.value);
    }

    case 'COUNT_FONT_WEIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'countFontWeight'], number);
    }



    case 'FREE_IMAGE': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImage'], action.value);
    }

    case 'FREE_IMAGE_TYPE': {
      return state.setFreeImageType(action.value);
    }

    case 'FREE_IMAGE_VERTICAL_ALIGN': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageVerticalAlign'], action.value);
    }

    case 'FREE_IMAGE_WIDTH': {
      return state.setFreeImageWidth(action.value);
    }

    case 'FREE_IMAGE_HEIGHT': {
      return state.setFreeImagHeight(action.value);
    }

    case 'FREE_IMAGE_MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginTop'], number);
    }

    case 'FREE_IMAGE_MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginRight'], number);
    }

    case 'FREE_IMAGE_MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginBottom'], number);
    }

    case 'FREE_IMAGE_MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeImageMarginLeft'], number);
    }



    case 'FREE_UPLOAD_IMAGE': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImage'], action.value);
    }

    case 'FREE_UPLOAD_IMAGE_FILE': {
      return state.setFreeUploadImageFile(action.file, action.src, action.width, action.height, action.extension);
    }

    case 'FREE_UPLOAD_IMAGE_URL': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageUrl'], action.value);
    }

    case 'FREE_UPLOAD_IMAGE_ALT': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageAlt'], action.value);
    }

    case 'FREE_UPLOAD_IMAGE_VERTICAL_ALIGN': {
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageVerticalAlign'], action.value);
    }

    case 'FREE_UPLOAD_IMAGE_WIDTH': {
      return state.setFreeUploadImageWidth(action.value);
    }

    case 'FREE_UPLOAD_IMAGE_HEIGHT': {
      return state.setFreeUploadImageHeight(action.value);
    }

    case 'FREE_UPLOAD_IMAGE_MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginTop'], number);
    }

    case 'FREE_UPLOAD_IMAGE_MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginRight'], number);
    }

    case 'FREE_UPLOAD_IMAGE_MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginBottom'], number);
    }

    case 'FREE_UPLOAD_IMAGE_MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'freeUploadImageMarginLeft'], number);
    }



    case 'BOX_MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginTop'], number);
    }

    case 'BOX_MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginRight'], number);
    }

    case 'BOX_MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginBottom'], number);
    }

    case 'BOX_MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'boxMarginLeft'], number);
    }

    case 'MARGIN_TOP': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginTop'], number);
    }

    case 'MARGIN_RIGHT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginRight'], number);
    }

    case 'MARGIN_BOTTOM': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginBottom'], number);
    }

    case 'MARGIN_LEFT': {
      const number = action.value ? parseInt(action.value, 10) : '';
      return state.setIn(['dataSampleThemesMap', currentThemeNameId, currentThemeType, 'marginLeft'], number);
    }



    case 'SORT_SHARE_OBJ': {
      return state.setSortShareObj();
    }



    case 'CHANGE_SHARE_BUTTONS_LIST': {

      if (action.contentType === 'editThemes') {

        return state
          .setDataObj(action.contentType, action.dataObj)
          .set('editThemesPage', action.page);

      } else if (action.contentType === 'designThemes') {

        return state
          .set('designThemesMap', fromJSOrdered(action.dataObj))
          .set('designThemesPage', action.page)
          .setCountGoogleFont(action.dataObj);

      }

      return state
        .set('iconThemesMap', fromJSOrdered(action.dataObj))
        .set('iconThemesPage', action.page)
        .setCountGoogleFont(action.dataObj);

    }



    case 'AJAX_SAVE_THEME': {
      return state
        .set('editThemesList', action.editThemesList)
        .setAjaxSaveTheme(action.name, action.id, action.namePrev, action.idPrev)
        .setDataObj('editThemes', action.loadedDataObj)
        .resetNewTheme(action.namePrev, action.idPrev);
    }

    case 'AJAX_SAVE_THEME_OFFICIAL': {
      return state
        .deleteThemeOfficial(`${action.namePrev}-${action.idPrev}`)
        .addEditThemesMap(action.themeNameId)
        .setAjaxSaveTheme(action.name, action.id, action.namePrev, action.idPrev)
        .setDataObj('editThemes', action.loadedDataObj)
        .setUploadImageMapAndUploadImageOfficialMap(action.themeNameId, action.namePrev, action.idPrev);
    }

    case 'AJAX_DELETE_THEME': {
      return state
        .set('editThemesList', action.editThemesList)
        .setDataObj('editThemes', action.loadedDataObj);
    }

    case 'AJAX_DELETE_THEME_OFFICIAL': {
      return state.deleteThemeOfficial(action.value);
    }

    case 'AJAX_MOVE_EDIT_TAB': {
      return state
        .set('editThemesList', action.editThemesList)
        .setDataObj('editThemes', action.loadedDataObj);
    }

    case 'AJAX_MOVE_EDIT_TAB_OFFICIAL': {
      return state
        .addEditThemesMap(action.themeNameId)
        .setUploadImageOfficialMap(action.themeNameId, action.loadedDataObj)
        .setDataObj('editThemes', action.loadedDataObj);
    }

    case 'AJAX_SAVE_OPTION': {
      const numberPhp = parseInt(action.php, 10);
      return state
        .set('php', numberPhp)
        .set('twitterApiType', action.twitterApiType)
        .set('rssUrl', action.rssUrl);
    }



    case 'CHECK_DOWNLOAD_THEMES': {
      return state.setCheckDownloadThemesList(action.value);
    }



    default: {
      return state;
    }

  }

};



export default reducer;
