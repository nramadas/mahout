import './index.less';
import React from 'react';

const T = React.PropTypes;

export default function Button(props) {
  const { text, onClick } = props;

  return (
    <div className='Button' onClick={ onClick }>
      { text }
    </div>
  );
}

Button.propTypes = {
  text: T.string.isRequired,
  onClick: T.func,
};

Button.defaultProps = {
  onClick: () => {},
};
