import React, { Component } from 'react';
import './App.css';
import IconApp from './IconApp';

class App extends Component {
  constructor() {
    // In a constructor, call `super` first if the class extends another class
    super();
    this.state={text:''};
    this.updateText = this.updateText.bind(this);
  }

  updateText(ev){
    const value = ev.currentTarget.value;
    this.setState({ text: value });
  }
  render() {

    return (
      <div className="App">
          <textarea
            className="form-control"
            value={this.state.text}
            onChange={this.updateText}
            ref={el => el && el.focus()}
          />
          <IconApp text={this.state.text} />
        </div>
    );
  }
}

export default App;
