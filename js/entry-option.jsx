// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import ContainerContent from './containers/content';



// --------------------------------------------------
//   Store
// --------------------------------------------------

const store = createStore(reducer);


// --------------------------------------------------
//   WordPress Plugin
// --------------------------------------------------

if (typeof (gameUsersShareButtonsPageType) !== 'undefined' && gameUsersShareButtonsPageType === 'wordPressPlugin') {

  ReactDOM.render(
    <Provider store={store}>
      <ContainerContent />
    </Provider>,
    document.querySelector('#game-users-share-buttons-option')
  );

}


// --------------------------------------------------
//   Output Function for Official Site
// --------------------------------------------------

export default function optionOutput() {

  ReactDOM.render(
    <Provider store={store}>
      <ContainerContent />
    </Provider>,
    document.querySelector('#game-users-share-buttons-option')
  );

}
