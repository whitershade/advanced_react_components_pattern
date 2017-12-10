import React, { Component } from 'react';

function ToggleOn({ on, children }) {
  return on ? children : null;
}

function ToggleOff({ on, children }) {
  return !on ? children : null;
}

function ToggleCheckbox({ on, onToggle, ...props }) {
  return <input checked={on} type="checkbox" onChange={onToggle} />;
}

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Checkbox = ToggleCheckbox;

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.props.on,
        onToggle: this.props.onToggle
      })
    );

    return <div>{children}</div>;
  }
}

export default Toggle;
