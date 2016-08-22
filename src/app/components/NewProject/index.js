import './index.less';
import React from 'react';

import Input from 'app/components/Input';

export default function NewProject() {
  return (
    <div className='NewProject'>
      <div className='NewProject__left'>
        { renderHeader() }
        { renderForm() }
      </div>
      <div className='NewProject__right'>
        <div className='NewProject__continue fa fa-arrow-right'/>
      </div>
    </div>
  );
}

const renderHeader = () => (
  <div className='NewProject__header'>
    New Project
  </div>
);

const renderForm = () => (
  <div className='NewProject__form'>
    { renderInput('name', 'Project Name', 'The name that will appear in your package.json') }
    { renderInput('description', 'Project Description', 'A few words describing your project') }
    { renderInput('repo', 'Git Repository', 'Where can we find your project?') }
    { renderInput('author', 'Author', 'Who are you?') }
    { renderInput('license', 'License', 'Go ahead, open source it') }
  </div>
);

const renderInput = (name, title, desc) => (
  <div className='NewProject__inputContainer'>
    <Input
      name={ name }
      title={ title }
      description={ desc }
    />
  </div>
);
