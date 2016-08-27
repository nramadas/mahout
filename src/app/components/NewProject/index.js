import './index.less';
import React from 'react';

import Input from 'app/components/Input';
import Select from 'app/components/Select';

import getFormValues from 'lib/getFormValues';

const LANGUAGE_OPTIONS = [
  { text: 'Javascript ES6/7', value: 'esnext' },
  { text: 'TypeScript', value: 'typescript' },
];

const SERVER_OPTIONS = [
  { text: 'I don\'t need a server', value: '' },
  { text: 'Koa2', value: 'koa' },
];

export default function NewProject() {
  return (
    <form className='NewProject' onSubmit={ e => {
      e.preventDefault();
      const form = e.target;
      console.log(getFormValues(form));
    } }>
      <div className='NewProject__left'>
        { renderHeader() }
        { renderForm() }
      </div>
      <div className='NewProject__right'>
        <button className='NewProject__continue fa fa-arrow-right' type='submit'/>
      </div>
    </form>
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
    { renderSelect('language', 'Language', 'What do you prefer to code in?', LANGUAGE_OPTIONS) }
    { renderSelect('server', 'Server', 'Maybe you need a node server', SERVER_OPTIONS) }
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

const renderSelect = (name, title, desc, options) => (
  <div className='NewProject__inputContainer'>
    <Select
      name={ name }
      title={ title }
      description={ desc }
      options={ options }
    />
  </div>
);
