import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Switch from './Switch';

const TOGGLE_CONTEXT = '__toggle__';
const compose = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

const ToggleOn = ({ children, toggle: { on } }) => {
  return on ? children : null;
};

const ToggleOff = ({ children, toggle: { on } }) => {
  return !on ? children : null;
};

const ToggleCheckbox = ({ toggle: { on, onToggle }, ...props }) => {
  return <Switch on={on} onToggle={onToggle} {...props} />;
};

export function withToggle(Component) {
  function Wrapper({ innerRef, ...props }, context) {
    const toggleContext = context[TOGGLE_CONTEXT];

    return <Component {...props} toggle={toggleContext} ref={innerRef} />;
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  Wrapper.displayName = `withToggle(${Component.displayName ||
    Component.name})`;

  Wrapper.Component = Component;

  return hoistNonReactStatics(Wrapper, Component);
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

  getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      'aria-expanded': this.props.on,
      onClick: compose(onClick, this.props.onToggle),
      ...props
    };
  };

  render() {
    return (
      <div>
        {this.props.children}
        {this.props.renderSwitch({
          on: this.props.on,
          onToggle: this.props.onToggle,
          getTogglerProps: this.getTogglerProps
        })}
      </div>
    );
  }
}

export default Toggle;
