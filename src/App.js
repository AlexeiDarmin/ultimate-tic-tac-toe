import * as React from 'react';

import { UltimateTicTacToe, TicTacToe } from 'ultimate_tic_tic_toe';

class App extends React.Component {

  render() {
    return <div>
      <UltimateTicTacToe 
      playerOne="human" 
      playerTwo="ai_mist" 
      loopGame={true} 
      moveDelay={50}
    />
    <TicTacToe />
    </div>
  }
}

export default App;
