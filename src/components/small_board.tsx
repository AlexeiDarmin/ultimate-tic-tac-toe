import * as React from 'react';
import '../App.css';

interface Props {
  onClick: Function
  boardIndex: number
  board: Array<number>
  unlocked: boolean
}

class SmallBoard extends React.Component<Props> {

  renderCells = () => {
    const { onClick, boardIndex, board, unlocked } = this.props

    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      const cellIndex = boardIndex * 9 + i
      console.log(board[cellIndex])
      return (
        <div
          className="cell"
          data-player={board[cellIndex]}
          key={i}
          onClick={() => board[cellIndex] === 0 && unlocked ? onClick(cellIndex) : null}
        />
      )
    })
  }

  render() {
    const { unlocked } = this.props

    return (
      <div className="tictactoeBoard" data-unlocked={unlocked}>
        {this.renderCells()}
      </div>
    );
  }
}

export default SmallBoard;
