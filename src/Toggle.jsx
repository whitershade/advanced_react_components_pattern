import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = withToggle(({ children, toggle: { on } }) => {
  return on ? children : null;
});

const ToggleOff = withToggle(({ children, toggle: { on } }) => {
  return !on ? children : null;
});

const ToggleCheckbox = withToggle(({ toggle: { on, onToggle }, ...props }) => {
  return <input checked={on} type="checkbox" onChange={onToggle} {...props} />;
});

ToggleCheckbox.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

export function withToggle(Component) {
  function Wrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT];

    return <Component {...props} toggle={toggleContext} />;
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  return Wrapper;
}

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Checkbox = ToggleCheckbox;
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.props.on,
        onToggle: this.props.onToggle
      }
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Toggle;
