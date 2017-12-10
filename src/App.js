import React, { PureComponent } from 'react';
import Toggle, { withToggle } from './Toggle';

const MyToggle = ({ toggle: { on, onToggle } }) => (
  <button onClick={onToggle}>{on ? 'on' : 'off'}</button>
);
const MyToggleWrapper = withToggle(MyToggle);

const MyEventComponent = withToggle(({ toggle, on, event }) => {
  const props = { [event]: on };

  return toggle.on ? <button {...props}>The {event} event</button> : null;
});
MyEventComponent.displayName = 'MyEventComponent';

class App extends PureComponent {
  state = { on: false };

  onToggle = () => this.setState(({ on }) => ({ on: !on }));

  render() {
    return (
      <div className="App">
        <Toggle on={this.state.on} onToggle={this.onToggle}>
          <hr />
          <Toggle.On>Toggle on</Toggle.On>
          <Toggle.Off>Toggle off</Toggle.Off>
          <hr />
          <Toggle.Checkbox />
          <hr />
          <MyToggleWrapper />
          <hr />
          <MyEventComponent event="onClick" on={e => alert(e.type)} />
          <hr />
        </Toggle>
      </div>
    );
  }
}

export default App;
