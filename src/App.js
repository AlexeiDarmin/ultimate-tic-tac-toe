import * as React from 'react';

import { UltimateTicTacToe, SmallBoard as TicTacToe, runGame } from 'ultimate_tic_tic_toe';

const board = runGame()
const formattedBoard = [].concat.apply([], board.boardValues)
class App extends React.Component {

  render() {
    return <div>
      <UltimateTicTacToe 
      playerOne="human" 
      playerTwo="bot_level_two" 
      loopGame={true} 
      moveDelay={50}
    />
    <TicTacToe 
      won={false}
      boardIndex={0}
      unlocked={true}
      onClick={() => null}
      board={formattedBoard}    
    />
    </div>
  }
}

export default App;
