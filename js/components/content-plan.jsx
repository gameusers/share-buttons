// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Radio } from 'react-bootstrap';

import { Model } from '../models/model';



class ContentPlan extends React.Component {

  render() {

    let checkedFree = false;
    let checkedPremium = false;
    let checkedBusiness = false;

    if (this.props.plan === 'free') {
      checkedFree = true;
    } else if (this.props.plan === 'premium') {
      checkedPremium = true;
    } else {
      checkedBusiness = true;
    }


    return (
      <div>

        <p>
          Game Users Share Buttons は商用・非商用、どちらの用途でもフリープランで利用することができます。<br /><br />

          フリープランではシェアボタンの右端にフリー画像（黒いネコ / テーマによって変わります）が表示され、Game Users Share Buttons 公式サイトへのリンク（こちらもテーマによって変わります）が自動的に貼られます。有料プランではそのフリー画像を編集する権利を得ることができます。
        </p>

        <ul className="list-plan">
          <li>企業が運営するサイトで余計なリンクは表示したくない</li>
          <li>完全オリジナルのシェアボタンを作る予定でフリー画像も他の画像に差し替えたい</li>
          <li>フリー画像がブログのデザインに馴染まないので非表示にしたい</li>
        </ul>

        <p>
          有料プランは上記のようなケースで利用できます。有料プランを利用したい方は以下のページで有料プランに申し込んでから、こちらのタブでプランを変更してください。<br /><br />
          <a href="https://gameusers.org/app/pay" target="_blank" rel="noopener noreferrer">有料プラン申し込みページ</a>
        </p>



        <hr className="hr-slash" style={{ margin: '40px 0 40px 0' }} />


        <FormGroup bsClass="form-group-margin" validationState="success">
          <Radio name="plan" id="plan-free" value="free" defaultChecked={checkedFree}>フリープラン / ¥0</Radio>
          <Radio name="plan" id="plan-premium" value="premium" defaultChecked={checkedPremium}>プレミアムプラン / 非商用 / ¥1000</Radio>
          <Radio name="plan" id="plan-business" value="business" defaultChecked={checkedBusiness}>ビジネスプラン / 商用 / ¥3000</Radio>
        </FormGroup>


        <div className="form-group-margin">
          <Button
            bsStyle="success"
            bsSize="sm"
            className="ladda-button outline-none"
            data-style="expand-right"
            onClick={e => this.props.funcAjaxChangePlan(this.props.stateModel, e.currentTarget)}
          >
            <span className="ladda-label">保存する</span>
          </Button>
        </div>

      </div>
    );
  }

}

ContentPlan.propTypes = {


  // --------------------------------------------------
  //   Common
  // --------------------------------------------------

  stateModel: PropTypes.instanceOf(Model).isRequired,
  plan: PropTypes.string.isRequired,


  // --------------------------------------------------
  //   Function
  // --------------------------------------------------

  funcAjaxChangePlan: PropTypes.func.isRequired


};


export default ContentPlan;
