# Ultimate Tic Tac Toe

A client and react component for the Ultimate Tic Tac Toe game. AI coming soon.

I'm iterating quickly on this module so I welcome any and all feedback, please open issues on github for feature requests! The goal is to create a go-to UTTT implementation for building bots.

![midgame v0.1.0](https://github.com/AlexeiDarmin/ultimate-tic-tac-toe/blob/master/src/images/screencap%20v0.1.0.png?raw=true "midgame v0.1.0")

## Installation

```
npm i ultimate-tic-tac-toe
```

## Usage
To import and render the react component (which includes the game internally).

```js
import { UltimateTTT } from 'ultimate-tic-tac-toe'

export yourReactComponent = (props) => {
  return <UltimateTTT />
}
```

To import the client only and play a game to completion randomly.

```js
import { Game } from 'ultimate-tic-tac-toe'
const game = new Game()

while (!game.isGameOver()) {
  const moves = game.getMoves()
  const move = moves[Math.floor(Math.random() * moves.length)];
  game.move(move)
}
console.log(game.print());
```

## API

### .move(index)
Attempts to make a move to the specificed index, a number between 0 - 80. Returns true upon success.

### .getBoard()
Returns the current board state as an array of length 81. 0s represet empty cells. 1s represent cells where player_one has moved. 2s represent where player_two has moved.
```js
game.getBaord() // -> [1, 1, 1, 0, 0, 2, 2, 1, 1, 2, 0, 1, 1, 2, 0, 2, 0, 2, 2, 1, 0, 2, 1, 1, 0, 2, 1, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 0, 1, 0, 2, 0, 2, 2, 1, 1, 2, 1, 0, 0, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 1, 0, 1, 0, 2]
```


### .isGameOver()
Returns true if the game has ended by either player winning or a draw. Returns false otherwise.
```js
game.isGameOver() // -> true
```

### .print()
Prints a text representation of the board.
```js
game.print()
/* ->
...........
xxo|ooo|ooo
xxo|ooo|---
xxo|---|---
...........
xxo|---|xxx
xxo|xxx|---
xxo|---|---
...........
xxo|---|---
xxo|---|---
xxo|---|---
...........
*/
```

### .getMoves()
Returns an array of numbers representing the cells where the current player can move.
```js
game.getMoves() // -> [0, 2, 3, 11, 13]
```

### .undoMove() - coming soon
Undoes the previous move.
