import * as React from 'react';

import { UltimateTicTacToe } from 'ultimate_tic_tic_toe';

class App extends React.Component {
  render() {
    return <UltimateTicTacToe 
      playerOne="human" 
      playerTwo="bot_level_two" 
      loopGame={true} 
      moveDelay={50}
    />
  }
}

export default App;
