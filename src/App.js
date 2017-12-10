import React, { PureComponent } from 'react';
import Toggle from './Toggle';

class App extends PureComponent {
  state = { on: false };

  onToggle = () => this.setState(({ on }) => ({ on: !on }));

  render() {
    return (
      <div className="App">
        <Toggle on={this.state.on} onToggle={this.onToggle}>
          <Toggle.On>Toggle on</Toggle.On>
          <Toggle.Off>Toggle off</Toggle.Off>
          <Toggle.Checkbox />
        </Toggle>
        <button onClick={this.onToggle}>Check</button>
      </div>
    );
  }
}

export default App;
