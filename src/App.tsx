import * as React from 'react';
import './App.css';

import SmallBoard from './components/small_board';
const logo = require('./logo.svg');

export type Board = Array<number>

interface Props {

}

interface State {
  board: Board
  turn: number;
  unlockedBoard: number
  wonBoards: Array<number>
}

interface wonBoardsOptions {
  board: Board
  cellIndex: number
  turn: number
  wonBoards: Array<number>
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    let defaultBoard = []
    for (let i = 0; i < 81; ++i) {
      defaultBoard.push(0)
    }

    this.state = {
      board: defaultBoard,
      turn: 1,
      unlockedBoard: -1,
      wonBoards: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }


  getWonBoards = ({ board, cellIndex, turn, wonBoards }: wonBoardsOptions): Board => {
    const boardIndex = Math.floor(cellIndex / 9) * 9
    const newWonBoards = wonBoards.slice()

    // Checks for wins along columns
    for (let c = 0; c < 3; ++c) {
      if (board[boardIndex + c] === board[boardIndex + c + 3] &&
        board[boardIndex + c] === board[boardIndex + c + 6] &&
        board[boardIndex + c] !== 0) {
        newWonBoards[boardIndex / 9] = turn
        return newWonBoards
      }
    }

    // Checks for wins along rows
    for (let r = 0; r < 3; ++r) {
      if (board[boardIndex + (r * 3)] === board[boardIndex + (r * 3 + 3)] &&
        board[boardIndex + (r * 3)] === board[boardIndex + (r * 3 + 6)] &&
        board[boardIndex + (r * 3)] !== 0) {
        newWonBoards[boardIndex / 9] = turn
        return newWonBoards
      }
    }

    // Checks for wins along diagonals
    if ((
        (board[boardIndex] === board[boardIndex + 4] && board[boardIndex] === board[boardIndex + 8]) ||
        (board[boardIndex + 2] === board[boardIndex + 4] && board[boardIndex + 2] === board[boardIndex + 6])
        ) &&
        board[boardIndex + 4] !== 0
    ) {
      newWonBoards[boardIndex / 9] = turn
    }

    return newWonBoards
  }

  handlePlayerMove = (cellIndex: number) => {
    const { board, turn, wonBoards } = this.state

    const newBoard = board.slice()
    newBoard[cellIndex] = turn

    const newTurn = turn === 1 ? 2 : 1;
    const newWonBoards = this.getWonBoards({ board: newBoard, cellIndex, turn, wonBoards })

    const sum = (listOfNumbers: Array<number>) => listOfNumbers.reduce((a, b) => a + b, 0)
    
    let unlockedBoard = sum(newWonBoards) !== sum(wonBoards) || newWonBoards[cellIndex % 9] > 0 ? -1 : cellIndex % 9

    this.setState({
      board: newBoard,
      turn: newTurn,
      unlockedBoard: unlockedBoard,
      wonBoards: newWonBoards
    })
  }

  render() {
    const { board, unlockedBoard, wonBoards } = this.state

    console.log('state:', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ultimate Tic Tac Toe</h1>
        </header>
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
