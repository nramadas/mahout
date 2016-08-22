import './index.less';
import React from 'react';

const T = React.PropTypes;

export default function Input(props) {
  const { name, title, description } = props;

  return (
    <label className='Input' htmlFor={ `Input-${name}` }>
      <input className='Input__input' name={ name }/>
      { description
        ? <label className='Input__description' htmlFor={ `Input-${name}` }>{ description }</label>
        : null }
      { title
        ? <label className='Input__label' htmlFor={ `Input-${name}` }>{ title }</label>
        : null }
    </label>
  );
}

Input.propTypes = {
  name: T.string.isRequired,
  title: T.string,
  description: T.string,
};
