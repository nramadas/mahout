import './index.less';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'app/components/Button';
import * as screenActions from 'app/actions/screen';
import { PAGE_TYPES } from 'lib/constants';

const T = React.PropTypes;

export function StartScreen(props) {
  const { onStartNewProject } = props;

  return (
    <div className='StartScreen'>
      <div className='StartScreen__hero'>
        <div className='StartScreen__logo'/>
        <div className='StartScreen__title'>
          Mahout
        </div>
      </div>
      <div className='StartScreen__new'>
        <Button text='New Project' onClick={ onStartNewProject }/>
      </div>
    </div>
  );
}

StartScreen.propTypes = {
  onStartNewProject: T.func,
};

StartScreen.defaultProps = {
  onStartNewProject: () => {},
};

const dispatcher = dispatch => ({
  onStartNewProject: () => dispatch(screenActions.gotoScreen(PAGE_TYPES.NEW_PROJECT_FORM)),
});

export default connect(null, dispatcher)(StartScreen);
