// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Well } from 'react-bootstrap';

import { OFFICIAL_THEME_DESIGN_URL, OFFICIAL_THEME_ICON_URL, instanceGameUsersShareButtonsOption } from '../models/model';



class ContentTop extends React.Component {

  /**
   * ランダムなシェアボタンを表示する
   * デザインテーマとアイコンテーマから2つずつ
   * @return {array} コードの配列
   */
  renderShareButtonsRandom() {


    // --------------------------------------------------
    //   デザインテーマまたはアイコンテーマが2つ未満の場合、処理停止
    // --------------------------------------------------

    if (this.props.designRandomMap.count() < 1 || this.props.iconRandomMap.count() < 2) {
      return;
    }


    const codeArr = [];


    // --------------------------------------------------
    //   Design Themes
    // --------------------------------------------------

    this.props.designRandomMap.keySeq().forEach((themeNameId) => {

      const dataObj = JSON.parse(this.props.designRandomMap.getIn([themeNameId, 'data']));

      instanceGameUsersShareButtonsOption.setJsonObj(dataObj);
      const codeShareButtons = { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('design', OFFICIAL_THEME_DESIGN_URL, false) };

      codeArr.push(
        <div className="top-share-buttons-margin" id="gameusers-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} key={themeNameId} />
      );

    });


    // --------------------------------------------------
    //   Icon Themes
    // --------------------------------------------------

    this.props.iconRandomMap.keySeq().forEach((themeNameId) => {

      const dataObj = JSON.parse(this.props.iconRandomMap.getIn([themeNameId, 'data']));

      instanceGameUsersShareButtonsOption.setJsonObj(dataObj);
      const codeShareButtons = { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('icon', OFFICIAL_THEME_ICON_URL, false) };

      codeArr.push(
        <div className="top-share-buttons-margin" id="gameusers-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} key={themeNameId} />
      );

    });


    return codeArr;

  }



  render() {

    return (
      <div>

        <p className="title-top">Game Users Share Buttons</p>

        <p style={{ margin: '0 0 20px 0' }}>
          Game Users Share Buttonsは優れた機能を提供しています。
        </p>

        <ul className="list-top1">
          <li>動作が軽快</li>
          <li>様々なデザインのテーマを利用できます</li>
          <li>自由度の高いカスタマイズが行え、オリジナルのシェアボタンが作れます</li>
          <li>商用利用可能です</li>
        </ul>


        <p className="sns">
          <strong>対応SNS</strong>: 全10サイト + RSS & Mail ボタン
        </p>

        <ul className="list-top2">
          <li><strong>Twitter</strong>: <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">https://twitter.com/</a></li>
          <li><strong>Facebook</strong>: <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/</a></li>
          <li><strong>Google+</strong>: <a href="https://plus.google.com/about" target="_blank" rel="noopener noreferrer">https://plus.google.com/about</a></li>
          <li><strong>Pocket</strong>: <a href="https://getpocket.com/" target="_blank" rel="noopener noreferrer">https://getpocket.com/</a></li>
          <li><strong>Pinterest</strong>: <a href="https://about.pinterest.com/" target="_blank" rel="noopener noreferrer">https://about.pinterest.com/</a></li>
          <li><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/</a></li>
          <li><strong>Tumblr</strong>: <a href="https://www.tumblr.com/" target="_blank" rel="noopener noreferrer">https://www.tumblr.com/</a></li>
          <li><strong>はてなブックマーク</strong>: <a href="http://b.hatena.ne.jp/" target="_blank" rel="noopener noreferrer">http://b.hatena.ne.jp/</a></li>
          <li><strong>LINE</strong>: <a href="https://line.me/" target="_blank" rel="noopener noreferrer">https://line.me/</a></li>
          <li><strong>Feedly</strong>: <a href="https://feedly.com/" target="_blank" rel="noopener noreferrer">https://feedly.com/</a></li>
        </ul>


        <hr className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        {this.renderShareButtonsRandom()}


        <hr className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        <p className="title-sub">使い方</p>

        <p style={{ margin: '0 0 20px 0' }}>
          初めて使う方はまず<strong>テーマタブ</strong>でテーマをチェックしてみてください。気に入ったテーマが見つかったら編集タブに送って簡単に利用することができます。<br /><br />

          また<strong>アイコンタブ</strong>では、シェアボタンに利用できる素材サイトを紹介しています。テーマタブに比べると少し手間はかかりますが、自分で素材をダウンロードしてきてオリジナルのシェアボタンを作成することが可能です。<br /><br />

          <strong>Game Users Share Buttons</strong>は<strong><a href="https://gameusers.org/app/share-buttons">公式ページ</a></strong>と<strong>WordPressのプラグイン</strong>の2種類で提供されています。お使いのWordPress上でシェアボタンを使いたい場合は、WordPressのプラグインページで「Game Users Share Buttons」を検索してください。
        </p>


        <hr className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        <p className="title-sub">ダウンロードしたシェアボタンの使い方</p>

        <p style={{ margin: '0 0 40px 0' }}>
          公式サイトでシェアボタンを作成した場合、WordPressのプラグインで規定の場所以外にシェアボタンを表示したい場合は、編集タブでシェアボタンをダウンロードしてください。ダウンロードしたZIPファイルを解凍すると gameusers-share-buttons というフォルダが出てきますので、シェアボタンを設置したいウェブサイトのサーバーにアップロードしてください。
        </p>

        <p className="title-sub">ファイル構成</p>

        <div style={{ margin: '0 0 10px 10px' }}>gameusers-share-buttons /</div>
        <div style={{ margin: '0 0 10px 20px' }}>├ img /</div>
        <div style={{ margin: '0 0 10px 20px' }}>├ js /（Javascriptフォルダ）</div>
        <div style={{ margin: '0 0 10px 20px' }}>│<span style={{ margin: '0 0 0 10px' }} className="color-red">└ share-bundle.min.js</span></div>
        <div style={{ margin: '0 0 10px 20px' }}>├ json /</div>
        <div style={{ margin: '0 0 10px 20px' }}>├ php /</div>
        <div style={{ margin: '0 0 10px 20px' }}>└ themes /（テーマフォルダ）</div>
        <div style={{ margin: '0 0 10px 40px' }} className="color-red">├ gameusers1-olxdmwzh</div>
        <div style={{ margin: '0 0 10px 40px' }} className="color-red">└ gameusers2-vd2bwk79</div>

        <p style={{ margin: '40px 0 20px 0' }}>
          ダウンロードしたシェアボタンを使用する場合は、上記赤文字のファイルが重要になります。まず最初に share-bundle.min.js ファイルを読み込むコードを作成します。以下のコードの赤文字部分に、share-bundle.min.js ファイルまでの絶対パスまたは相対パスを入力してください。<br /><br />絶対パスの例）https://example.com/gameusers-share-buttons/js/share-bundle.min.js
        </p>

        <Well className="well">
          {'<script type="text/javascript" src="'}<span className="color-red">gameusers-share-buttons/js/share-bundle.min.js</span>{'"></script>'}
        </Well>

        <p style={{ margin: '20px 0 20px 0' }}>
          次にシェアボタンのコードを作成します。利用したいテーマの名前を以下のコードの赤文字部分に入力してください。シェアボタンのコードは複数貼ることが可能です。
        </p>

        <Well className="well">
          {'<div id="gameusers-share-buttons" data-theme="'}<span className="color-red">gameusers1-olxdmwzh</span>{'"></div>'}
        </Well>

        <p style={{ margin: '20px 0 20px 0' }}>
          それぞれのコードが用意できたらシェアボタンを表示するページのHTML内に貼り付けてください。share-bundle.min.js のコードは{'</body>'}の直前、または{'<head></head>'}の内部に貼り付け、 シェアボタンのコードは{'<body></body>'}内に貼り付けてください。
        </p>

        <Well className="well">
          {'<!doctype html>'}<br /><br />

          {'<html lang="ja">'}<br />
          {'<head>'}<br />
          <div style={{ margin: '0 0 0 10px' }}>
            {'<meta charset="utf-8" />'}<br />
            {'<title>Sample HTML</title>'}<br />
          </div>
          {'</head>'}<br /><br />

          {'<body>'}<br />
          <div className="color-red" style={{ margin: '0 0 0 10px' }}>
            {'<div id="gameusers-share-buttons" data-theme="gameusers1-olxdmwzh"></div>'}<br />
            {'<div id="gameusers-share-buttons" data-theme="gameusers2-vd2bwk79"></div>'}<br />
            {'<script type="text/javascript" src="gameusers-share-buttons/js/share-bundle.min.js"></script>'}<br />
          </div>
          {'</body>'}<br />
          {'</html>'}<br />
        </Well>

        <p style={{ margin: '20px 0 20px 0' }}>
          上記の例ではシェアボタンが2つ表示されます。share-bundle.min.js のコードは表示するシェアボタンの数に関わらず、<strong>ひとつだけ</strong>貼り付けるようにしてください。
        </p>

      </div>
    );
  }

}

ContentTop.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  designRandomMap: PropTypes.instanceOf(Map).isRequired,
  iconRandomMap: PropTypes.instanceOf(Map).isRequired,


};


export default ContentTop;
