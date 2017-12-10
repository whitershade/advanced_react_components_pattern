import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

function ToggleOn({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];

  return on ? children : null;
}

ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleOff({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];

  return !on ? children : null;
}

ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleCheckbox(props, context) {
  const { on, onToggle } = context[TOGGLE_CONTEXT];

  return <input checked={on} type="checkbox" onChange={onToggle} {...props} />;
}

ToggleCheckbox.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

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
