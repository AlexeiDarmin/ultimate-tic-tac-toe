import * as React from 'react';
import './App.css';

import SmallBoard from './components/small_board';
const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ultimate Tic Tac Toe</h1>
        </header>
        <div className="megaTictactoeBoard">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <SmallBoard key={i} />)}
        </div>
      </div>
    );
  }
}

export default App;
