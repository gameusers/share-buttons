// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'alias-node-modules/react';
import PropTypes from 'alias-node-modules/prop-types';
import Pagination from 'alias-node-modules/react-bootstrap/lib/Pagination';
import { Map } from 'alias-node-modules/immutable';

import { OFFICIAL_THEME_ICON_URL, instanceGameUsersShareButtonsOption, Model } from '../models/model';



class ContentIcon extends React.Component {


  /**
   * アイコンテーマの一覧を出力する
   * @return {array} コードの配列
   */
  renderShareButtonsIconThemes() {


    // --------------------------------------------------
    //   アイコンテーマがない場合は処理停止
    // --------------------------------------------------

    if (this.props.iconThemesMap.count() === 0) {
      return;
    }


    // --------------------------------------------------
    //   Set Value
    // --------------------------------------------------

    const codeArr = [];


    // --------------------------------------------------
    //   Loop
    // --------------------------------------------------

    this.props.iconThemesMap.entrySeq().forEach((e) => {

      let codeShareButtons = null;

      const themeNameId = e[0];
      const value = e[1];
      const author = value.get('author');
      const websiteName = value.get('websiteName');
      const websiteUrl = value.get('websiteUrl');
      const fileFormat = value.get('fileFormat').split(',').join(', ');
      const dataObj = JSON.parse(this.props.iconThemesMap.getIn([themeNameId, 'data']));


      if (dataObj) {
        instanceGameUsersShareButtonsOption.setJsonObj(dataObj);
        codeShareButtons = { __html: instanceGameUsersShareButtonsOption.shareButtonsSampleTheme('icon', OFFICIAL_THEME_ICON_URL, false) };
      }


      codeArr.push(
        <div className="theme-box" key={themeNameId}>
          <div className="menu-box">
            <div className="name-box">
              <div className="name">{themeNameId}</div>
              <div className="author">Author: {author}</div>
            </div>
          </div>

          {/* <div id="game-users-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} /> */}
          <div data-game-users-share-buttons={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />

          <div className="file-format">File Format: {fileFormat}</div>

          {(() => {
            if (websiteName && websiteUrl) {
              return (
                <div className="website">Web Site: <a href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteName}</a></div>
              );
            }
          })()}
        </div>
      );

    });


    // --------------------------------------------------
    //   Pagination
    // --------------------------------------------------

    // const items = Math.ceil(this.props.iconThemesTotal / this.props.contentsNumberOfLines);
    //
    // codeArr.push(
    //   <Pagination
    //     key="pagination"
    //     prev
    //     next
    //     first
    //     last
    //     ellipsis={false}
    //     boundaryLinks
    //     items={items}
    //     maxButtons={5}
    //     activePage={this.props.iconThemesPage}
    //     onSelect={e => this.props.funcChangeShareButtonsList(this.props.stateModel, 'iconThemes', e)}
    //   />
    // );


    const total = Math.ceil(this.props.iconThemesTotal / this.props.contentsNumberOfLines);

    const itemsArr = [];
    for (let number = 1; number <= total; number += 1) {
      itemsArr.push(
        <Pagination.Item
          active={number === this.props.iconThemesPage}
          key={number}
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'iconThemes', number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    codeArr.push(
      <Pagination bsSize="medium" key="pagination">
        <Pagination.First
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'iconThemes', 1)}
        />
        {itemsArr}
        <Pagination.Last
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'iconThemes', total)}
        />
      </Pagination>
    );



    return codeArr;

  }



  render() {
    return (
      <div>

        <p>
          シェアボタンに使えるアイコン画像を提供してくれている素材サイトを紹介しています。気に入ったアイコンが見つかったら画像をダウンロードしてシェアボタンを作成してみてください。<br /><br />
          ※ 素材を提供してくれているサイトの利用規約を確認してから利用させてもらいましょう。
        </p>


        <hr id="icon-themes-hr" className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        {this.renderShareButtonsIconThemes()}


      </div>
    );
  }

}

ContentIcon.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,

  iconThemesMap: PropTypes.instanceOf(Map).isRequired,
  iconThemesTotal: PropTypes.number.isRequired,
  contentsNumberOfLines: PropTypes.number.isRequired,
  iconThemesPage: PropTypes.number.isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcChangeShareButtonsList: PropTypes.func.isRequired


};


export default ContentIcon;
