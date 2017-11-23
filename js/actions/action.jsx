// --------------------------------------------------
//   Action Creators
// --------------------------------------------------

export const funcInitialAsynchronous = (designThemesMap, iconThemesMap, designThemesTotal, iconThemesTotal, designRandomMap, iconRandomMap, editThemesDataObj) => ({
  type: 'INITIAL_ASYNCHRONOUS',
  designThemesMap,
  iconThemesMap,
  designThemesTotal,
  iconThemesTotal,
  designRandomMap,
  iconRandomMap,
  editThemesDataObj
});

// export const funcInitialAsynchronous = (designThemesMap, iconThemesMap, loadedDataEditThemesObj, loadedDataDesignThemesObj, loadedDataIconThemesObj, randomDesignThemesArr, randomIconThemesArr) => ({
//   type: 'INITIAL_ASYNCHRONOUS',
//   designThemesMap,
//   iconThemesMap,
//   loadedDataEditThemesObj,
//   loadedDataDesignThemesObj,
//   loadedDataIconThemesObj,
//   randomDesignThemesArr,
//   randomIconThemesArr
// });



export const funcTopTheme = value => ({
  type: 'TOP_THEME',
  value
});

export const funcBottomTheme = value => ({
  type: 'BOTTOM_THEME',
  value
});



export const funcPlan = value => ({
  type: 'PLAN',
  value
});



export const funcToggleEditForm = value => ({
  type: 'TOGGLE_EDIT_FORM',
  value
});



export const funcCheckStickySampleTheme = value => ({
  type: 'CHECK_STICKY_SAMPLE_THEME',
  value
});

export const funcCurrentThemeType = value => ({
  type: 'CURRENT_THEME_TYPE',
  value
});




export const funcShareImageAspectRatioFixed = value => ({
  type: 'SHARE_IMAGE_ASPECT_RATIO_FIXED',
  value
});

export const funcFreeImageAspectRatioFixed = value => ({
  type: 'FREE_IMAGE_ASPECT_RATIO_FIXED',
  value
});

export const funcFreeUploadImageAspectRatioFixed = value => ({
  type: 'FREE_UPLOAD_IMAGE_ASPECT_RATIO_FIXED',
  value
});

export const funcName = value => ({
  type: 'NAME',
  value
});

export const funcShareImage = (file, src, width, height, extension) => ({
  type: 'SHARE_IMAGE',
  file,
  src,
  width,
  height,
  extension
});

export const funcOptionType = value => ({
  type: 'OPTION_TYPE',
  value
});

export const funcShareType = value => ({
  type: 'SHARE_TYPE',
  value
});

export const funcShareButton = value => ({
  type: 'SHARE_BUTTON',
  value
});

export const funcShareCount = value => ({
  type: 'SHARE_COUNT',
  value
});

export const funcShareCountDefaultText = value => ({
  type: 'SHARE_COUNT_DEFAULT_TEXT',
  value
});

export const funcShareCountMin = value => ({
  type: 'SHARE_COUNT_MIN',
  value
});

export const funcShareCountMax = value => ({
  type: 'SHARE_COUNT_MAX',
  value
});

export const funcShareImageDelete = () => ({
  type: 'SHARE_IMAGE_DELETE'
});



export const funcShareImageVerticalAlign = value => ({
  type: 'SHARE_IMAGE_VERTICAL_ALIGN',
  value
});

export const funcShareImageWidth = value => ({
  type: 'SHARE_IMAGE_WIDTH',
  value
});

export const funcShareImageHeight = value => ({
  type: 'SHARE_IMAGE_HEIGHT',
  value
});

export const funcShareImageMarginTop = value => ({
  type: 'SHARE_IMAGE_MARGIN_TOP',
  value
});

export const funcShareImageMarginRight = value => ({
  type: 'SHARE_IMAGE_MARGIN_RIGHT',
  value
});

export const funcShareImageMarginBottom = value => ({
  type: 'SHARE_IMAGE_MARGIN_BOTTOM',
  value
});

export const funcShareImageMarginLeft = value => ({
  type: 'SHARE_IMAGE_MARGIN_LEFT',
  value
});



export const funcCountInput = value => ({
  type: 'COUNT_INPUT',
  value
});

export const funcCountInputMin = value => ({
  type: 'COUNT_INPUT_MIN',
  value
});

export const funcCountInputMax = value => ({
  type: 'COUNT_INPUT_MAX',
  value
});

export const funcCount = value => ({
  type: 'COUNT',
  value
});

export const funcCountDirection = value => ({
  type: 'COUNT_DIRECTION',
  value
});

export const funcCountVerticalAlign = value => ({
  type: 'COUNT_VERTICAL_ALIGN',
  value
});

export const funcCountWidth = value => ({
  type: 'COUNT_WIDTH',
  value
});

export const funcCountHeight = value => ({
  type: 'COUNT_HEIGHT',
  value
});

export const funcCountMarginTop = value => ({
  type: 'COUNT_MARGIN_TOP',
  value
});

export const funcCountMarginRight = value => ({
  type: 'COUNT_MARGIN_RIGHT',
  value
});

export const funcCountMarginBottom = value => ({
  type: 'COUNT_MARGIN_BOTTOM',
  value
});

export const funcCountMarginLeft = value => ({
  type: 'COUNT_MARGIN_LEFT',
  value
});

export const funcCountPaddingTop = value => ({
  type: 'COUNT_PADDING_TOP',
  value
});

export const funcCountPaddingRight = value => ({
  type: 'COUNT_PADDING_RIGHT',
  value
});

export const funcCountPaddingBottom = value => ({
  type: 'COUNT_PADDING_BOTTOM',
  value
});

export const funcCountPaddingLeft = value => ({
  type: 'COUNT_PADDING_LEFT',
  value
});

export const funcCountPaddingTopForIos = value => ({
  type: 'COUNT_PADDING_TOP_FOR_IOS',
  value
});

export const funcCountPaddingRightForIos = value => ({
  type: 'COUNT_PADDING_RIGHT_FOR_IOS',
  value
});

export const funcCountPaddingBottomForIos = value => ({
  type: 'COUNT_PADDING_BOTTOM_FOR_IOS',
  value
});

export const funcCountPaddingLeftForIos = value => ({
  type: 'COUNT_PADDING_LEFT_FOR_IOS',
  value
});

export const funcCountPaddingTopForAndroid = value => ({
  type: 'COUNT_PADDING_TOP_FOR_ANDROID',
  value
});

export const funcCountPaddingRightForAndroid = value => ({
  type: 'COUNT_PADDING_RIGHT_FOR_ANDROID',
  value
});

export const funcCountPaddingBottomForAndroid = value => ({
  type: 'COUNT_PADDING_BOTTOM_FOR_ANDROID',
  value
});

export const funcCountPaddingLeftForAndroid = value => ({
  type: 'COUNT_PADDING_LEFT_FOR_ANDROID',
  value
});

export const funcCountBackgroundColor = value => ({
  type: 'COUNT_BACKGROUND_COLOR',
  value
});

export const funcCountBackgroundColorHex = value => ({
  type: 'COUNT_BACKGROUND_COLOR_HEX',
  value
});

export const funcCountTop = value => ({
  type: 'COUNT_TOP',
  value
});

export const funcCountLeft = value => ({
  type: 'COUNT_LEFT',
  value
});

export const funcCountTextAlign = value => ({
  type: 'COUNT_TEXT_ALIGN',
  value
});



export const funcCountBorderColor = value => ({
  type: 'COUNT_BORDER_COLOR',
  value
});

export const funcCountBorderRadius = value => ({
  type: 'COUNT_BORDER_RADIUS',
  value
});

export const funcCountFont = value => ({
  type: 'COUNT_FONT',
  value
});

export const funcCountGoogleFont = value => ({
  type: 'COUNT_GOOGLE_FONT',
  value
});

export const funcCountFontColor = value => ({
  type: 'COUNT_FONT_COLOR',
  value
});

export const funcCountFontSize = value => ({
  type: 'COUNT_FONT_SIZE',
  value
});

export const funcCountFontStyle = value => ({
  type: 'COUNT_FONT_STYLE',
  value
});

export const funcCountFontWeight = value => ({
  type: 'COUNT_FONT_WEIGHT',
  value
});



export const funcFreeImage = value => ({
  type: 'FREE_IMAGE',
  value
});

export const funcFreeImageType = value => ({
  type: 'FREE_IMAGE_TYPE',
  value
});

export const funcFreeImageVerticalAlign = value => ({
  type: 'FREE_IMAGE_VERTICAL_ALIGN',
  value
});

export const funcFreeImageWidth = value => ({
  type: 'FREE_IMAGE_WIDTH',
  value
});

export const funcFreeImageHeight = value => ({
  type: 'FREE_IMAGE_HEIGHT',
  value
});

export const funcFreeImageMarginTop = value => ({
  type: 'FREE_IMAGE_MARGIN_TOP',
  value
});

export const funcFreeImageMarginRight = value => ({
  type: 'FREE_IMAGE_MARGIN_RIGHT',
  value
});

export const funcFreeImageMarginBottom = value => ({
  type: 'FREE_IMAGE_MARGIN_BOTTOM',
  value
});

export const funcFreeImageMarginLeft = value => ({
  type: 'FREE_IMAGE_MARGIN_LEFT',
  value
});



export const funcFreeUploadImage = value => ({
  type: 'FREE_UPLOAD_IMAGE',
  value
});

export const funcFreeUploadImageFile = (file, src, width, height, extension) => ({
  type: 'FREE_UPLOAD_IMAGE_FILE',
  file,
  src,
  width,
  height,
  extension
});

export const funcFreeUploadImageUrl = value => ({
  type: 'FREE_UPLOAD_IMAGE_URL',
  value
});

export const funcFreeUploadImageAlt = value => ({
  type: 'FREE_UPLOAD_IMAGE_ALT',
  value
});

export const funcFreeUploadImageVerticalAlign = value => ({
  type: 'FREE_UPLOAD_IMAGE_VERTICAL_ALIGN',
  value
});

export const funcFreeUploadImageWidth = value => ({
  type: 'FREE_UPLOAD_IMAGE_WIDTH',
  value
});

export const funcFreeUploadImageHeight = value => ({
  type: 'FREE_UPLOAD_IMAGE_HEIGHT',
  value
});

export const funcFreeUploadImageMarginTop = value => ({
  type: 'FREE_UPLOAD_IMAGE_MARGIN_TOP',
  value
});

export const funcFreeUploadImageMarginRight = value => ({
  type: 'FREE_UPLOAD_IMAGE_MARGIN_RIGHT',
  value
});

export const funcFreeUploadImageMarginBottom = value => ({
  type: 'FREE_UPLOAD_IMAGE_MARGIN_BOTTOM',
  value
});

export const funcFreeUploadImageMarginLeft = value => ({
  type: 'FREE_UPLOAD_IMAGE_MARGIN_LEFT',
  value
});



export const funcBoxMarginTop = value => ({
  type: 'BOX_MARGIN_TOP',
  value
});

export const funcBoxMarginRight = value => ({
  type: 'BOX_MARGIN_RIGHT',
  value
});

export const funcBoxMarginBottom = value => ({
  type: 'BOX_MARGIN_BOTTOM',
  value
});

export const funcBoxMarginLeft = value => ({
  type: 'BOX_MARGIN_LEFT',
  value
});

export const funcMarginTop = value => ({
  type: 'MARGIN_TOP',
  value
});

export const funcMarginRight = value => ({
  type: 'MARGIN_RIGHT',
  value
});

export const funcMarginBottom = value => ({
  type: 'MARGIN_BOTTOM',
  value
});

export const funcMarginLeft = value => ({
  type: 'MARGIN_LEFT',
  value
});



export const funcSortShareObj = () => ({
  type: 'SORT_SHARE_OBJ'
});



export const funcChangeShareButtonsList = (dataObj, contentType, page) => ({
  type: 'CHANGE_SHARE_BUTTONS_LIST',
  dataObj,
  contentType,
  page
});



export const funcAjaxSaveTheme = (loadedDataObj, name, id, namePrev, idPrev, editThemesList) => ({
  type: 'AJAX_SAVE_THEME',
  loadedDataObj,
  name,
  id,
  namePrev,
  idPrev,
  editThemesList
});

export const funcAjaxSaveThemeOfficial = (loadedDataObj, name, id, namePrev, idPrev, themeNameId) => ({
  type: 'AJAX_SAVE_THEME_OFFICIAL',
  loadedDataObj,
  name,
  id,
  namePrev,
  idPrev,
  themeNameId
});

export const funcAjaxDeleteTheme = (editThemesList, loadedDataObj) => ({
  type: 'AJAX_DELETE_THEME',
  editThemesList,
  loadedDataObj
});

export const funcAjaxDeleteThemeOfficial = value => ({
  type: 'AJAX_DELETE_THEME_OFFICIAL',
  value
});

export const funcAjaxMoveEditTab = (editThemesList, loadedDataObj) => ({
  type: 'AJAX_MOVE_EDIT_TAB',
  editThemesList,
  loadedDataObj
});

export const funcAjaxMoveEditTabOfficial = (themeNameId, loadedDataObj) => ({
  type: 'AJAX_MOVE_EDIT_TAB_OFFICIAL',
  themeNameId,
  loadedDataObj
});



export const funcAjaxSaveOption = (php, twitterApiType, rssUrl) => ({
  type: 'AJAX_SAVE_OPTION',
  php,
  twitterApiType,
  rssUrl
});



export const funcCheckDownloadThemes = value => ({
  type: 'CHECK_DOWNLOAD_THEMES',
  value
});
