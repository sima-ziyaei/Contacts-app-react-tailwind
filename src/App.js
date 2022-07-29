import React, { Component } from 'react';

import './App.css';
import Contact from "./components/Contact"


const relation=["اعضای خانواده", "دوست", "همکار", "فامیل"]

class App extends Component {
  constructor() {
    super();
    this.state = relation;
  }
  render() {
  return (
    <Contact relation={this.state} />
    );
  }
}


export default App;
