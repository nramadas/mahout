import './normalize.less';
import './font-awesome.less';
import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import StartScreen from 'app/components/StartScreen';
import NewProject from 'app/components/NewProject';
import { PAGE_TYPES } from 'lib/constants';
import values from 'lib/values';

const T = React.PropTypes;

export function App(props) {
  const { currentScreen } = props;

  return (
    <div className='App'>
      { renderScreen(currentScreen) }
    </div>
  );
}

App.propTypes = {
  currentScreen: T.oneOf(values(PAGE_TYPES)).isRequired,
};

const renderScreen = currentScreen => {
  switch (currentScreen) {
    case PAGE_TYPES.START_SCREEN: return <StartScreen/>;
    case PAGE_TYPES.NEW_PROJECT: return <NewProject/>;
    default: null;
  }
};

const selector = createSelector(
  state => state.screen,
  currentScreen => ({ currentScreen })
);

export default connect(selector)(App);
