# Ultimate Tic Tac Toe

A client and react component for [Ultimate Tic Tac Toe](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe). AI coming soon.

I'm iterating quickly on this module so I welcome any and all feedback, please open issues on github for feature requests! The goal is to create a go-to UTTT implementation for building bots. There is currently an export bug that I'm working to fix urgently, please check back in a day or two!. 

![midgame v0.1.0](https://github.com/AlexeiDarmin/ultimate-tic-tac-toe/blob/master/src/images/screencap%20v0.1.0.png?raw=true "midgame v0.1.0")

## Installation

```
npm i ultimate-tic-tac-toe
```

## Usage
To import and render the react component (which includes the game internally).

```
import { UltimateTTT} from 'ultimate-tic-tac-toe'

export yourReactComponent = (props) => {
  return <UltimateTTT />
}
```

To import the game only.

```
import { Game } from 'ultimate-tic-tac-toe'
const game = new Game()
```

## API

### .move(index)
Attempts to make a move to the specificed index, a number between 0 - 80. Returns true upon success or throws an error for an invalid move.

### .getBoard()
Returns the current board state as an array of length 81. 0s represet empty cells. 1s represent cells where player_one has moved. 2s represent where player_two has moved.

### .isGameOver()
Returns true if the game has ended by either player winning or a draw. Returns false otherwise.

### .print() - coming soon
Prints a text representation of the board.

### .undoMove() - coming soon
Undoes the previous move.

### .getMoves() - coming soon
Returns an array of numbers representing the cells where the current player can move.
