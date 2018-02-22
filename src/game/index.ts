// Types
type Board = Array<number>
type Turn = 1 | 2


// Constnts
const PLAYER_ONE = 1
const PLAYER_TWO = 2
const EMPTY = 0

class Game {
  board: Board
  turn: 1 | 2
  unlockedBoard: number
  wonBoards: Board

  constructor() {
    this.board = '0'.repeat(81).split('').map((x) => parseInt(x))
    this.turn = PLAYER_ONE
    this.unlockedBoard = -1
    this.wonBoards = new Array(9)
  }

  move(index) {
    const newBoard = this.board.slice()
    const turn = this.turn
    newBoard[index] = turn

    const newTurn = turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    const newWonBoards = this.getWonBoards({ board: newBoard, index, turn })

    const sum = (listOfNumbers: Array<number>) => listOfNumbers.reduce((a, b) => a + b, 0)

    // Finds next unlocked board, if that board has no available moves then all boards become unlocked.
    let unlockedBoard = sum(newWonBoards) !== sum(this.wonBoards) || newWonBoards[index % 9] > 0 ? -1 : index % 9

    let movesAvailable = false
    for (let i = unlockedBoard * 9; i < unlockedBoard * 9 + 9; ++i) {
      if (this.board[i] === 0) {
        movesAvailable = true
      }
    }

    if (!movesAvailable) {
      unlockedBoard = -1
    }

    this.board = newBoard,
    this.turn = newTurn,
    this.unlockedBoard = unlockedBoard,
    this.wonBoards = newWonBoards
  }
  getBoard(): Board {
    return this.board
  }
  getPlayerTurn() {
    return this.turn
  }
  getWonBoards({ board = null, index = null, turn = null } = {}) {
    if (!board) {
      return this.wonBoards
    }
    const boardIndex = Math.floor(index / 9) * 9
    const newWonBoards = this.wonBoards.slice()

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
      if (board[boardIndex + (r * 3)] === board[boardIndex + (r * 3 + 1)] &&
        board[boardIndex + (r * 3)] === board[boardIndex + (r * 3 + 2)] &&
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
      return newWonBoards
    }

    // Checks if board has any moves available
    let movesAvailable = false
    for (let i = boardIndex; i < boardIndex + 9; ++i) {
      if (board[i] === 0) {
        movesAvailable = true
      }
    }

    if (!movesAvailable) {
      newWonBoards[boardIndex / 9] = -1
    }

    return newWonBoards
  }

  getUnlockedBoard() {
    return this.unlockedBoard
  }
}
export default Game