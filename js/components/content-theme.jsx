// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'alias-node-modules/react';
import PropTypes from 'alias-node-modules/prop-types';
import Button from 'alias-node-modules/react-bootstrap/lib/Button';
import Pagination from 'alias-node-modules/react-bootstrap/lib/Pagination';
// import Panel from 'alias-node-modules/react-bootstrap/lib/Panel';
import { Map, List } from 'alias-node-modules/immutable';

import { OFFICIAL_THEME_DESIGN_URL, instanceGameUsersShareButtonsOption, Model } from '../models/model';



class ContentTheme extends React.Component {


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

          {/* <div id="game-users-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} /> */}
          <div data-game-users-share-buttons={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />

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

    // const items = Math.ceil(this.props.designThemesTotal / this.props.contentsNumberOfLines);
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
    //     activePage={this.props.designThemesPage}
    //     onSelect={e => this.props.funcChangeShareButtonsList(this.props.stateModel, 'designThemes', e)}
    //   />
    // );

    const total = Math.ceil(this.props.designThemesTotal / this.props.contentsNumberOfLines);

    const itemsArr = [];
    for (let number = 1; number <= total; number += 1) {
      itemsArr.push(
        <Pagination.Item
          active={number === this.props.designThemesPage}
          key={number}
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'designThemes', number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    codeArr.push(
      <Pagination bsSize="medium" key="pagination">
        <Pagination.First
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'designThemes', 1)}
        />
        {itemsArr}
        <Pagination.Last
          onClick={() => this.props.funcChangeShareButtonsList(this.props.stateModel, 'designThemes', total)}
        />
      </Pagination>
    );



    return codeArr;

  }



  render() {
    return (
      <div>

        <p>
          簡単に利用できるテーマを用意しています。利用したいテーマが見つかったら「編集タブに移動」ボタンを押してください。
        </p>


        <hr id="design-themes-hr" className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        {this.renderShareButtonsDesignThemes()}

      </div>
    );
  }

}

ContentTheme.propTypes = {


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


export default ContentTheme;
