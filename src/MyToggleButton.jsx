import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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

const MyToggleButtonWithToggle = withToggle(MyToggleButton);

export default MyToggleButtonWithToggle;

export function test() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const onToggle = () => (onToggle.called = true);

  ReactDOM.render(
    <MyToggleButtonWithToggle.Component toggle={{ on: true, onToggle }} />,
    div
  );

  if (!div.innerHTML.includes('on')) {
    throw new Error(`Contents are wrong: ${div.innerHTML}`);
  }

  const button = div.getElementsByTagName('button')[0];

  button.click();

  if (!onToggle.called) {
    throw new Error('toggle not called');
  }
}
