import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = ({ children, toggle: { on } }) => {
  return on ? children : null;
};

const ToggleOff = ({ children, toggle: { on } }) => {
  return !on ? children : null;
};

const ToggleCheckbox = ({ toggle: { on, onToggle }, ...props }) => {
  return <input checked={on} type="checkbox" onChange={onToggle} {...props} />;
};

export function withToggle(Component) {
  function Wrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT];

    return <Component {...props} toggle={toggleContext} />;
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  Wrapper.displayName = `withToggle(${Component.displayName ||
    Component.name})`;

  return Wrapper;
}

class Toggle extends Component {
  static On = withToggle(ToggleOn);
  static Off = withToggle(ToggleOff);
  static Checkbox = withToggle(ToggleCheckbox);

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
