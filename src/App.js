import * as React from 'react';

import { UltimateTicTacToe } from 'ultimate_tic_tic_toe';

class App extends React.Component {
  render() {
    return <UltimateTicTacToe playerOne="human" playerTwo="bot_level_one" loopGame={true} moveDelay={20}/>
  }
}

export default App;
