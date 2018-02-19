import * as React from 'react';
import '../App.css';
import { Board } from '../App';

interface Props {
  onClick: Function
  boardIndex: number
  board: Board
  unlocked: boolean
  won: number
}

class SmallBoard extends React.Component<Props> {

  renderCells = () => {
    const { onClick, boardIndex, board, unlocked, won } = this.props

    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      const cellIndex = boardIndex * 9 + i
      const clickable = board[cellIndex] === 0 && unlocked && !won

      return (
        <div
          className="cell"
          data-player={board[cellIndex]}
          data-clickable={clickable}
          data-won={won}
          key={i}
          onClick={() => clickable ? onClick(cellIndex) : null}
        />
      )
    })
  }

  render() {
    const { unlocked, won } = this.props

    return (
      <div className="tictactoeBoard" data-unlocked={unlocked} data-won={won}>
        {this.renderCells()}
      </div>
    );
  }
}

export default SmallBoard;
