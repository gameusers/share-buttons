// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'alias-node-modules/react';
import PropTypes from 'alias-node-modules/prop-types';
import Button from 'alias-node-modules/react-bootstrap/lib/Button';
import Pagination from 'alias-node-modules/react-bootstrap/lib/Pagination';
import Panel from 'alias-node-modules/react-bootstrap/lib/Panel';
import { Map, List } from 'alias-node-modules/immutable';

import { OFFICIAL_THEME_DESIGN_URL, instanceGameUsersShareButtonsOption, Model } from '../models/model';



class ContentEdit extends React.Component {


  /**
   * デザインテーマの一覧を出力する
   * @return {array} コードの配列
   */
  renderShareButtonsDesignThemes() {


    // --------------------------------------------------
    //   デザインテーマがない場合は処理停止
    // --------------------------------------------------

    if (this.props.designThemesMap.count() === 0) {
      return;
    }


    // --------------------------------------------------
    //   Set Value
    // --------------------------------------------------

    const codeArr = [];


    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    this.props.designThemesMap.entrySeq().forEach((entry) => {

      let codeShareButtons = null;

      const themeNameId = entry[0];
      const value = entry[1];
      const author = value.get('author');
      const websiteName = value.get('websiteName');
      const websiteUrl = value.get('websiteUrl');
      const dataObj = JSON.parse(this.props.designThemesMap.getIn([themeNameId, 'data']));


      if (dataObj) {
        instanceGameUsersShareButtonsOption.setJsonObj(dataObj);
        codeShareButtons = { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('design', OFFICIAL_THEME_DESIGN_URL, false) };
      }


      codeArr.push(
        <div className="theme-box" key={themeNameId}>
          <div className="menu-box">
            <div className="name-box">
              <div className="name">{themeNameId}</div>
              <div className="author">Author: {author}</div>
            </div>
            {(() => {
              if (!this.props.editThemesList.includes(themeNameId)) {
                return (
                  <div className="button-box">
                    <Button
                      bsStyle="danger"
                      bsSize="xsmall"
                      className="ladda-button buttons"
                      data-style="slide-right"
                      data-size="xs"
                      onClick={e => this.props.funcAjaxMoveEditTab(this.props.stateModel, e.currentTarget, themeNameId)}
                    >
                      <span className="ladda-label">編集タブに移動</span>
                    </Button>
                  </div>
                );
              }
            })()}
          </div>

          <div id="game-users-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />

          {(() => {
            if (websiteName && websiteUrl && author !== 'Game Users') {
              return (
                <div className="website">{websiteName}: <a href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteUrl}</a></div>
              );
            }
          })()}
        </div>
      );

    });


    // --------------------------------------------------
    //   Pagination
    // --------------------------------------------------

    const items = Math.ceil(this.props.designThemesTotal / this.props.contentsNumberOfLines);

    codeArr.push(
      <Pagination
        key="pagination"
        prev
        next
        first
        last
        ellipsis={false}
        boundaryLinks
        items={items}
        maxButtons={5}
        activePage={this.props.designThemesPage}
        onSelect={e => this.props.funcChangeShareButtonsList(this.props.stateModel, 'designThemes', e)}
      />
    );

    return codeArr;

  }



  render() {
    return (
      <div>

        <p>
          簡単に利用できるテーマを用意しています。利用したいテーマが見つかったら「編集タブに移動」ボタンを押してください。
        </p>

        <Panel collapsible header="テーマ募集！" bsStyle="success" className="recruitment">
          オリジナルのテーマを提供してくれる方を募集しています。テーマとして採用された方には、ビジネスプラン（￥3000 相当）の利用券を差し上げます。すべて自作の画像（あなたが権利を保有している）を利用したテーマを作成して、編集タブからダウンロードした game-users-share-buttons.zip ファイルをメールに添付して送ってください。メールのタイトルを「Game Users Share Buttons テーマ提供」にして、こちらのアドレス <strong>mail@gameusers.org</strong> までよろしくお願いします。<br /><br />

          <strong>提供用のテーマを作成する場合は、一時的にビジネスプランを利用してください（プランを購入する必要はありません）。</strong>プランタブでビジネスプランに変更すると、黒猫の画像が編集できるようになりますので、自作のアイコンに変更したり、自サイトへのリンクを貼ることができます。作成したテーマを利用する人が出てくると、ユーザーの各ブログ記事からあなたのサイトへのリンクが貼られることになりますので、宣伝効果も非常に大きいです。<br /><br />

          絵が描けたり、デザインが行える方は、ぜひともご参加よろしくお願いします。<br /><br />

          ※ テーマに利用する画像を作成する前に、編集タブ &gt; シェアボタン新規作成ボタン &gt; 画像アップロードフォームの下にある「モバイル環境で綺麗に表示するには？」を必ずチェックしてください。
        </Panel>


        <hr id="design-themes-hr" className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        {this.renderShareButtonsDesignThemes()}

      </div>
    );
  }

}

ContentEdit.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,

  editThemesList: PropTypes.instanceOf(List).isRequired,
  designThemesMap: PropTypes.instanceOf(Map).isRequired,
  designThemesTotal: PropTypes.number.isRequired,
  contentsNumberOfLines: PropTypes.number.isRequired,
  designThemesPage: PropTypes.number.isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcChangeShareButtonsList: PropTypes.func.isRequired,
  funcAjaxMoveEditTab: PropTypes.func.isRequired,


};


export default ContentEdit;
