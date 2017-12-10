import React, { PureComponent } from 'react';
import Toggle, { withToggle } from './Toggle';
import MyToggleButton, { test } from './MyToggleButton';
import Switch from './Switch';

const MyEventComponent = withToggle(({ toggle, on, event }) => {
  const props = { [event]: on };

  return toggle.on ? <button {...props}>The {event} event</button> : null;
});
MyEventComponent.displayName = 'MyEventComponent';

function renderSwitch({ on, onToggle, getTogglerProps }) {
  return (
    <div>
      renderedSwitch
      <Switch on={on} onToggle={onToggle} {...getTogglerProps()} />
      {on ? 'on' : 'off'}
      <button {...getTogglerProps()}>Button with Toggler Props</button>
      <button
        {...getTogglerProps({
          onClick: () => alert('hi')
        })}
      >
        Button with changed Toggler Props
      </button>
    </div>
  );
}

class App extends PureComponent {
  state = { on: false };

  onToggle = () => {
    this.setState(({ on }) => ({ on: !on }));
    if (!this.state.on) this.myToggleButton.focus();
  };

  render() {
    return (
      <div className="App">
        <Toggle
          on={this.state.on}
          onToggle={this.onToggle}
          renderSwitch={renderSwitch}
        >
          <hr />
          <Toggle.On>Toggle on</Toggle.On>
          <Toggle.Off>Toggle off</Toggle.Off>
          <hr />
          <Toggle.Checkbox />
          <hr />
          <MyToggleButton
            innerRef={myToggleButton => (this.myToggleButton = myToggleButton)}
          />
          <hr />
          <MyEventComponent event="onClick" on={e => alert(e.type)} />
          <hr />
          <MyToggleButton.ToggleMessage />
          <button onClick={test}>TEST</button>
        </Toggle>
      </div>
    );
  }
}

export default App;
