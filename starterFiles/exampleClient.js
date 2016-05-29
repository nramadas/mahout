import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import App from 'app';
import reducers from 'app/reducers';

(() => {
  const data = {};
  const middleware = [];
  const reducers = combineReducers(reducers);

  const store = createStore(reducers, data, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  ReactDOM.render(
    <Provider store={ store }>
      <App/>
    </Provider>
    ,document.getElementById('container')
  );
})();
