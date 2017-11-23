/**
 * アクセスしたデバイスの種類とOSを返す
 * @return {object} デバイスとOS
 */
export const getDeviceAndOs = () => {

  const ua = navigator.userAgent;

  const returnObj = {};

  returnObj.device = 'other';
  returnObj.os = 'other';

  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0) {

    returnObj.device = 'smartphone';
    returnObj.os = 'iOS';

  } else if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {

    returnObj.device = 'smartphone';
    returnObj.os = 'Android';

  } else if (ua.indexOf('Windows Phone') > 0) {

    returnObj.device = 'smartphone';
    returnObj.os = 'Windows';

  } else if (ua.indexOf('iPad') > 0) {

    returnObj.device = 'tablet';
    returnObj.os = 'iOS';

  } else if (ua.indexOf('Android') > 0) {

    returnObj.device = 'tablet';
    returnObj.os = 'Android';

  }

  return returnObj;

};

export default getDeviceAndOs;
