import React, { PureComponent } from 'react';
import Toggle, { withToggle } from './Toggle';

const MyToggle = withToggle(({ on, onToggle }) => (
  <button onClick={onToggle}>{on ? 'on' : 'off'}</button>
));

class App extends PureComponent {
  state = { on: false };

  onToggle = () => this.setState(({ on }) => ({ on: !on }));

  render() {
    return (
      <div className="App">
        <Toggle on={this.state.on} onToggle={this.onToggle}>
          <div>
            <Toggle.On>Toggle on</Toggle.On>
            <Toggle.Off>Toggle off</Toggle.Off>
          </div>
          <Toggle.Checkbox />
          <MyToggle />
        </Toggle>
        <button onClick={this.onToggle}>Check</button>
      </div>
    );
  }
}

export default App;
