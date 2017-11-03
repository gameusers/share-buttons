// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'react-bootstrap';
import { Map, List } from 'immutable';

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

          <div id="gameusers-share-buttons" data-theme={themeNameId} dangerouslySetInnerHTML={codeShareButtons} />

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
