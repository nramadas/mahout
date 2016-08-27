import './index.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as selectActions from 'app/actions/select';

const T = React.PropTypes;

const makeDropdownId = props => `${props.name}-${props.title}`;

export class Select extends React.Component {
  static propTypes = {
    options: T.array.isRequired,
    name: T.string.isRequired,
    title: T.string.isRequired,
    description: T.string,
    showDropdown: T.bool,
    onToggleDropdown: T.func,
    onCloseDropdown: T.func,
  };

  static defaultProps = {
    description: '',
    showDropdown: false,
    onToggleDropdown: () => {},
    onCloseDropdown: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.options[0],
    };
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      if (this.props.showDropdown) {
        this.props.onCloseDropdown();
      }
    });
  }

  selectOption(selected) {
    this.setState({ selected });
  }

  render() {
    const { name, title, description, showDropdown, onToggleDropdown } = this.props;
    const { selected } = this.state;

    return (
      <div className={ `Select ${showDropdown ? 'm-open' : ''}` }>
        <input type='hidden' name={ name } value={ selected.value }/>
        <div
          className='Select__content'
          onClick={ e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            onToggleDropdown();
          } }
        >
          { selected.text }
          <div className='Select__icon fa fa-caret-down'/>
        </div>
        { description
          ? <div className='Select__description'>{ description }</div>
          : null }
        { title
          ? <div className='Select__title'>{ title }</div>
          : null }
        { showDropdown ? this.renderDropdown() : null }
      </div>
    );
  }

  renderDropdown() {
    const { options, onCloseDropdown } = this.props;
    const { selected } = this.state;

    return (
      <div className='Select__dropdown'>
        { options
          .filter(o => o.value !== selected.value)
          .map(({ text, value }) => (
            <div
              className='Select__option'
              onClick={ e => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                this.selectOption({ text, value });
                onCloseDropdown();
              } }
              key={ `${text}-${value}` }
            >
              { text }
            </div>
        )) }
      </div>
    );
  }
}

const selector = createSelector(
  (state, ownProps) => state.select.dropdownId === makeDropdownId(ownProps),
  showDropdown => ({ showDropdown })
);

const dispatcher = (dispatch, ownProps) => ({
  onToggleDropdown: () => dispatch(selectActions.toggleDropdown(makeDropdownId(ownProps))),
  onCloseDropdown: () => dispatch(selectActions.toggleDropdown('')),
});

export default connect(selector, dispatcher)(Select);
