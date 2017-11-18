// --------------------------------------------------
//   Font 関数
// --------------------------------------------------


/**
 * Google Fonts を表示する
 * @param {array} importFontsArr 表示する Google Fonts の配列
 * @param {string} id            スタイルシートに設定する ID名
 */
export const setGoogleFonts = (importFontsArr, id) => {

  if (importFontsArr.length > 0) {

    let fonts = importFontsArr.join('|');
    const elementGoogleFonts = document.querySelector(`#${id}`);


    // --------------------------------------------------
    //   すでにスタイルシートが存在する場合
    // --------------------------------------------------

    if (elementGoogleFonts) {

      const href = elementGoogleFonts.getAttribute('href');
      const already = href.replace('https://fonts.googleapis.com/css?family=', '');

      // すでにフォントがある場合は追加分と合成して表示する
      if (already) {

        const alreadyArr = already.split('|');
        const mergedArr = importFontsArr.concat(alreadyArr);

        // 重複削除
        const fontsArr = mergedArr.filter((x, i, self) => self.indexOf(x) === i);

        fonts = fontsArr.join('|');
        // console.log('alreadyArr = ', alreadyArr);
        // console.log('mergedArr = ', mergedArr);
        // console.log('fontsArr = ', fontsArr);
        // console.log('fonts = ', fonts);

      }

      elementGoogleFonts.href = `https://fonts.googleapis.com/css?family=${fonts}`;


    // --------------------------------------------------
    //   新規にスタイルシートを追加する
    // --------------------------------------------------

    } else {

      const css = document.createElement('link');
      css.type = 'text/css';
      css.rel = 'stylesheet';
      css.id = id;
      css.href = `https://fonts.googleapis.com/css?family=${fonts}`;
      document.getElementsByTagName('head').item(0).appendChild(css);

    }

    // console.log('fonts = ', fonts);

  }

};



export default setGoogleFonts;
