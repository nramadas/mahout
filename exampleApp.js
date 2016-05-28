import './normalize.css';
import './App.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const T = React.PropTypes;

export function App(props) {
  return (
    <div></div>
  );
};

App.propTypes = {
  state: T.object,
};

const selector = createSelector(
  state => state,
  state => state
);

export default connect(selector)(App);
