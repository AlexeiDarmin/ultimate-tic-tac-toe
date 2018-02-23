import * as React from 'react';
import './App.css';

import Game from './game'
import SmallBoard from './components/small_board';
const logo = require('./logo.svg');

let game = new Game()

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      board: game.getBoard(),
      turn: game.getPlayerTurn(),
      unlockedBoard: game.getUnlockedBoard(),
      wonBoards: game.getWonBoards()
    }
  }

  handlePlayerMove = (cellIndex) => {
    game.move(cellIndex)
  
    this.setState({
      board: game.getBoard(),
      turn: game.getPlayerTurn(),
      unlockedBoard: game.getUnlockedBoard(),
      wonBoards: game.getWonBoards()
    })
  }

  render() {
    const { board, unlockedBoard, wonBoards } = this.state

    return (
      <div className="App">
        <div className="megaTictactoeBoard">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
            (i) => <SmallBoard
              key={i}
              boardIndex={i}
              onClick={this.handlePlayerMove}
              board={board}
              unlocked={unlockedBoard === i || unlockedBoard === -1}
              won={wonBoards[i]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
