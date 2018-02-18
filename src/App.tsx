import * as React from 'react';
import './App.css';

import SmallBoard from './components/small_board';
const logo = require('./logo.svg');

interface Props {

}

interface State {
  board: Array<number>;
  turn: number;
}

class App extends React.Component<Props , State> {

  constructor(props: Props) {
    super(props)

    let defaultBoard = []
    for (let i = 0; i < 81; ++i) {
      defaultBoard.push(0)
    }

    this.state = {
      board: defaultBoard,
      turn: 1
    }
  }

  handlePlayerMove = (cellIndex: number) => {
    const { board, turn } = this.state

    const newBoard = board.slice()
    newBoard[cellIndex] = turn

    const newTurn = turn === 1 ? 2 : 1;

    this.setState({ board: newBoard, turn: newTurn })
  }

  render() {
    console.log('state:', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ultimate Tic Tac Toe</h1>
        </header>
        <div className="megaTictactoeBoard">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
            (i) => <SmallBoard key={i} boardIndex={i} onClick={this.handlePlayerMove} board={this.state.board}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
