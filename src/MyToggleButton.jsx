import React, { PureComponent } from 'react';
import { withToggle } from './Toggle';

class MyToggleButton extends PureComponent {
  focus = () => this.button.focus();

  render() {
    const { toggle: { on, onToggle } } = this.props;

    return (
      <button ref={button => (this.button = button)} onClick={onToggle}>
        {on ? 'on' : 'off'}
      </button>
    );
  }
}

export default withToggle(MyToggleButton);
