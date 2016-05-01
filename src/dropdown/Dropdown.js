/** Created by ge on 5/1/16. */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.value || {
        label: props.placeholder || 'Select...',
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillMount() {
    if (this.props.value)
      this.setState({selected: this.getOptionByValue(this.props.value)});
  }

  componentWillReceiveProps(newProps) {
    var {value} = newProps;
    if (!this.state || !this.state.selected) {
    } else if (!value) {
      this.setState({selected: undefined});
    } else if (value !== this.state.selected.value) {
      this.setState({selected: this.getOptionByValue(value)});
    }
  }

  getOptionByValue(value) {
    var selected;
    var {options} = this.props;
    if (!options) return;
    options.forEach((item)=> {
      if (item.value === value) selected = item;
    });
    return selected;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleMouseDown(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setValue(value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState)
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected.value, newState.selected)
    }
  }

  renderOption(option) {
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected
    });

    let value = option.value || option.label || option;
    let label = option.label || option.value || option;

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}>
        {label}
      </div>
    )
  }

  buildMenu() {
    let {options, baseClassName} = this.props;
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={`${baseClassName}-title`}>{option.name}</div>);
        let _options = option.items.map((item) => this.renderOption(item));

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    });

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({isOpen: false})
      }
    }
  }

  render() {
    var {baseClassName, value, options, placeholder, ...props} = this.props;
    let menu = this.state.isOpen ? <div className={`${baseClassName}-menu`}>{this.buildMenu()}</div> : null;

    let dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen
    });

    var label;
    if (this.state && this.state.selected) label = this.state.selected.label;
    if (!label) label = (<div className={`${baseClassName}-placeholder`}>{placeholder}</div>);

    return (
      <div className={dropdownClass} {...props}>
        <div className={`${baseClassName}-control`} onMouseDown={this.handleMouseDown.bind(this)}
             onTouchEnd={this.handleMouseDown.bind(this)}>
          {label}
          <span className={`${baseClassName}-arrow`}/>
        </div>
        {menu}
      </div>
    )
  }

}

Dropdown
  .defaultProps = {baseClassName: 'Dropdown'};
export
default
Dropdown;
