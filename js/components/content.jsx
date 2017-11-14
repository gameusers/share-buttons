// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import { Model } from '../models/model';

import ContentTop from './content-top';
import ContentEdit from './content-edit';
import ContentTheme from './content-theme';
import ContentIcon from './content-icon';
import ContentOption from './content-option';
import ContentPlan from './content-plan';

import '../../css/option.css';



class Content extends React.Component {


  // --------------------------------------------------
  //   Lifecycle Methods
  // --------------------------------------------------

  componentWillMount() {
    this.props.funcInitialAsynchronous(this.props.stateModel);
  }


  render() {
    return (
      <Tabs defaultActiveKey="top" id="option-tab">
        <Tab eventKey="top" title="トップ" className="option-content"><ContentTop {...this.props} /></Tab>
        <Tab eventKey="edit" title="編集" className="option-content"><ContentEdit {...this.props} /></Tab>
        <Tab eventKey="themes" title="テーマ" className="option-content"><ContentTheme {...this.props} /></Tab>
        <Tab eventKey="icons" title="アイコン" className="option-content"><ContentIcon {...this.props} /></Tab>
        <Tab eventKey="option" title="設定" className="option-content"><ContentOption {...this.props} /></Tab>
        <Tab eventKey="plan" title="プラン" className="option-content"><ContentPlan {...this.props} /></Tab>
      </Tabs>
    );
  }

}

Content.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcInitialAsynchronous: PropTypes.func.isRequired,


};

export default Content;
