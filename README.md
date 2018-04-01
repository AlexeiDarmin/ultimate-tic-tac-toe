# Ultimate Tic Tac Toe

A client and react component for the Ultimate Tic Tac Toe game. AI coming soon.

![midgame v0.1.0](https://github.com/AlexeiDarmin/ultimate-tic-tac-toe/blob/master/src/images/screencap%20v0.1.0.png?raw=true "midgame v0.1.0")

## Installation

```
npm i ultimate-tic-tac-toe
```

## Usage
To import and render the react component, note all props are optional and the TicTacToe component takes no props:

```js
import { UltimateTicTacToe, TicTacToe } from 'ultimate_tic_tic_toe';

class App extends React.Component {

  render() {
    return <div>
      <UltimateTicTacToe 
      playerOne="human" 
      playerTwo="bot_level_two" 
      loopGame={true} 
      moveDelay={50}
    />
    <TicTacToe />
    </div>
  }
}
```
| Prop      | Data type | Default value | Values available                                                  | Additional information                                                        |
|-----------|-----------|---------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------|
| playerOne | string    | `'human'`     | `'human'`, `'bot_level_zero'`, `'bot_level_one', 'bot_level_two'` | The higher the level the higher the skill of the bot                          |
| playerTwo | string    | `'human'`     | `'human'`, `'bot_level_zero'`, `'bot_level_one', 'bot_level_two'` | The higher the level the higher the skill of the bot                          |
| loopGame  | boolean   | `false`       | `true`, `false`                                                   | Resets the game once it's complete, useful for comparing bots over many games |
| moveDelay | number    | `1000`        | A number in milliseconds                                          | Represents the time between bot moves                                         |

To import and run the client only:
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


### .getMoves()
Returns an array of numbers representing the cells where the current player can move.
```js
game.getMoves() // -> [0, 2, 3, 11, 13]
```

### getMoveCount()
Returns a number representing the number of moves that have been played in the current game. 
```js 
game.getMoveCount() // -> 5 
```

### getMoveFromBot({ skill })
Takes an object with a skill attribute which is a number, currently 0 or 1. Runs a bot of that skill level on the current game position and returns a move suggestion by that bot. 
```js
game.getMoveFromBot({ skill: 1 }) // -> 17
```

### .getBoard()
Returns the current board state as an array of length 81. 0s represet empty cells. 1s represent cells where player_one has moved. 2s represent where player_two has moved.
```js
game.getBoard() // -> [1, 1, 1, 0, 0, 2, 2, 1, 1, 2, 0, 1, 1, 2, 0, 2, 0, 2, 2, 1, 0, 2, 1, 1, 0, 2, 1, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 0, 1, 0, 2, 0, 2, 2, 1, 1, 2, 1, 0, 0, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 1, 0, 1, 0, 2]
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

### .undoMove() - coming soon
Undoes the previous move.
