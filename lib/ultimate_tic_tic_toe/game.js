'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PLAYER_ONE = 1;
var PLAYER_TWO = 2;
var EMPTY = 0;
var DEFAULT_BOARD = '0'.repeat(81).split('').map(function (x) {
  return parseInt(x);
});
var DEFAULT_WON_BOARDS = '0'.repeat(9).split('').map(function (x) {
  return parseInt(x);
});

var Game = function () {
  function Game() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$board = _ref.board,
        board = _ref$board === undefined ? DEFAULT_BOARD : _ref$board,
        _ref$wonBoards = _ref.wonBoards,
        wonBoards = _ref$wonBoards === undefined ? DEFAULT_WON_BOARDS : _ref$wonBoards,
        _ref$turn = _ref.turn,
        turn = _ref$turn === undefined ? PLAYER_ONE : _ref$turn,
        _ref$unlockedBoard = _ref.unlockedBoard,
        unlockedBoard = _ref$unlockedBoard === undefined ? -1 : _ref$unlockedBoard;

    _classCallCheck(this, Game);

    this.board = [];

    this.board = board;
    this.wonBoards = wonBoards;
    this.turn = turn;
    this.unlockedBoard = unlockedBoard;
    this.gameOver = false;
    this.winningPlayer = null;
    this.moveCount = 0;
    // this.load()
  }

  //   load(){
  //     this.board = []
  //     for (let i = 0; i < 81; ++i) {
  //       this.board.push(0)
  //     }
  //   }

  _createClass(Game, [{
    key: 'getWinningPlayer',
    value: function getWinningPlayer() {
      return this.winningPlayer;
    }
  }, {
    key: 'move',
    value: function move(index) {
      if (typeof index !== 'number') throw new Error('Incorrect argument provided to move method.');
      var boardIndex = Math.floor(index / 9);

      if (this.isGameOver()) {
        throw new Error("Invalid move: game is already over.");
      } else if (this.wonBoards[boardIndex] !== 0) {
        throw new Error("Invalid move: this board has already been won.");
      }

      var newBoard = this.board.slice();
      var turn = this.turn;
      newBoard[index] = turn;

      var newTurn = turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
      var newWonBoards = this.getWonBoards({ board: newBoard, index: index, turn: turn });

      var unlockedBoard = this.getUnlockedBoard({ move: index, board: newBoard, turn: newTurn });

      this.board = newBoard, this.turn = newTurn, this.unlockedBoard = unlockedBoard, this.wonBoards = newWonBoards;
      this.checkIfGameOver();
      this.moveCount++;
      return true;
    }

    // Finds next unlocked board, if that board has no available moves then all boards become unlocked.

  }, {
    key: 'getUnlockedBoard',
    value: function getUnlockedBoard() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          move = _ref2.move,
          board = _ref2.board,
          turn = _ref2.turn;

      if (!board) return this.unlockedBoard;
      var newWonBoards = this.getWonBoards({ board: board, index: move, turn: turn });

      var sum = function sum(listOfNumbers) {
        return listOfNumbers.reduce(function (a, b) {
          return a + b;
        }, 0);
      };

      var unlockedBoard = sum(newWonBoards) !== sum(this.wonBoards) || newWonBoards[move % 9] > 0 ? -1 : move % 9;

      var movesAvailable = false;
      for (var i = unlockedBoard * 9; i < unlockedBoard * 9 + 9; ++i) {
        if (board[i] === 0) {
          movesAvailable = true;
        }
      }

      if (!movesAvailable) {
        unlockedBoard = -1;
      }

      return unlockedBoard;
    }
  }, {
    key: 'checkIfGameOver',
    value: function checkIfGameOver(board, turn) {
      var wonBoards = !board ? this.wonBoards : board;

      if (wonBoards[0] === wonBoards[1] && wonBoards[0] === wonBoards[2] && wonBoards[0] !== EMPTY || wonBoards[3] === wonBoards[4] && wonBoards[3] === wonBoards[5] && wonBoards[3] !== EMPTY || wonBoards[6] === wonBoards[7] && wonBoards[6] === wonBoards[8] && wonBoards[6] !== EMPTY || wonBoards[0] === wonBoards[3] && wonBoards[0] === wonBoards[6] && wonBoards[0] !== EMPTY || wonBoards[1] === wonBoards[4] && wonBoards[1] === wonBoards[7] && wonBoards[1] !== EMPTY || wonBoards[2] === wonBoards[5] && wonBoards[2] === wonBoards[8] && wonBoards[2] !== EMPTY || wonBoards[0] === wonBoards[4] && wonBoards[0] === wonBoards[8] && wonBoards[0] !== EMPTY || wonBoards[2] === wonBoards[4] && wonBoards[2] === wonBoards[6] && wonBoards[2] !== EMPTY || !wonBoards.includes(0)) {
        var winningPlayer = !wonBoards.includes(0) ? null : this.turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        if (!board) {
          this.gameOver = true;
          this.winningPlayer = winningPlayer;
        } else {
          return winningPlayer;
        }
        return true;
      }
    }
  }, {
    key: 'isGameOver',
    value: function isGameOver() {
      return this.gameOver;
    }
  }, {
    key: 'getBoard',
    value: function getBoard() {
      return this.board;
    }
  }, {
    key: 'getPlayerTurn',
    value: function getPlayerTurn() {
      return this.turn;
    }
  }, {
    key: 'getWonBoards',
    value: function getWonBoards() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$board = _ref3.board,
          board = _ref3$board === undefined ? null : _ref3$board,
          _ref3$index = _ref3.index,
          index = _ref3$index === undefined ? null : _ref3$index,
          _ref3$turn = _ref3.turn,
          turn = _ref3$turn === undefined ? null : _ref3$turn;

      if (!board) {
        return this.wonBoards;
      }
      var boardIndex = Math.floor(index / 9) * 9;
      var newWonBoards = this.wonBoards.slice();

      // Checks for wins along columns
      for (var c = 0; c < 3; ++c) {
        if (board[boardIndex + c] === board[boardIndex + c + 3] && board[boardIndex + c] === board[boardIndex + c + 6] && board[boardIndex + c] !== 0) {
          newWonBoards[boardIndex / 9] = turn;
          return newWonBoards;
        }
      }

      // Checks for wins along rows
      for (var r = 0; r < 3; ++r) {
        if (board[boardIndex + r * 3] === board[boardIndex + (r * 3 + 1)] && board[boardIndex + r * 3] === board[boardIndex + (r * 3 + 2)] && board[boardIndex + r * 3] !== 0) {
          newWonBoards[boardIndex / 9] = turn;
          return newWonBoards;
        }
      }

      // Checks for wins along diagonals
      if ((board[boardIndex] === board[boardIndex + 4] && board[boardIndex] === board[boardIndex + 8] || board[boardIndex + 2] === board[boardIndex + 4] && board[boardIndex + 2] === board[boardIndex + 6]) && board[boardIndex + 4] !== 0) {
        newWonBoards[boardIndex / 9] = turn;
        return newWonBoards;
      }

      // Checks if board has any moves available
      var movesAvailable = false;
      for (var i = boardIndex; i < boardIndex + 9; ++i) {
        if (board[i] === 0) {
          movesAvailable = true;
        }
      }

      if (!movesAvailable) {
        newWonBoards[boardIndex / 9] = -1;
      }

      return newWonBoards;
    }
  }, {
    key: 'getMoves',
    value: function getMoves() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$board = _ref4.board,
          board = _ref4$board === undefined ? this.board : _ref4$board,
          _ref4$unlockedBoard = _ref4.unlockedBoard,
          unlockedBoard = _ref4$unlockedBoard === undefined ? this.unlockedBoard : _ref4$unlockedBoard,
          _ref4$turn = _ref4.turn,
          turn = _ref4$turn === undefined ? this.turn : _ref4$turn,
          _ref4$wonBoards = _ref4.wonBoards,
          wonBoards = _ref4$wonBoards === undefined ? this.wonBoards : _ref4$wonBoards;

      var min = 0;
      var max = 80;
      if (unlockedBoard >= 0) {
        min = unlockedBoard * 9;
        max = unlockedBoard * 9 + 9;
      }

      var moves = [];
      for (var i = min; i <= max; ++i) {
        if (board[i] === 0 && wonBoards[Math.floor(i / 9)] === 0) {
          moves.push(i);
        }
      }
      return moves;
    }
  }, {
    key: 'print',
    value: function print() {
      var rows = ['', '', '', '', '', '', '', '', ''];
      for (var r = 0; r < 9; ++r) {
        for (var c = 0; c < 9; ++c) {
          var cDest = c < 3 ? c : c < 6 ? (r + 1) * 9 : (r + 2) * 9;

          if (this.board[cDest] === PLAYER_ONE) rows[r] += 'x';else if (this.board[cDest] === PLAYER_TWO) rows[r] += 'o';else rows[r] += '-';

          if (c === 2 || c === 5) {
            rows[r] += '|';
          }
        }
      }
      var output = '...........' + '\n';
      for (var i = 0; i < rows.length; ++i) {
        output += rows[i] + '\n';
        if ((i + 1) % 3 === 0) {
          output += '...........' + '\n';
        }
      }

      return output;
    }
  }, {
    key: 'getMoveFromBot',
    value: function getMoveFromBot(_ref5) {
      var skill = _ref5.skill;

      if (skill === 0) {
        return this.getMoveFromLevelZeroBot();
      } else if (skill === 1) {
        return this.getMoveFromLevelOneBot();
      } else if (skill === 2) {
        return this.getMoveFromLevelTwoBot();
      }
    }

    // Strategy: random moves

  }, {
    key: 'getMoveFromLevelZeroBot',
    value: function getMoveFromLevelZeroBot() {
      var moves = this.getMoves();
      var move = moves[Math.floor(Math.random() * moves.length)];
      return move;
    }

    // Strategy: greedy moves aiming to win local grids

  }, {
    key: 'getMoveFromLevelOneBot',
    value: function getMoveFromLevelOneBot() {
      // Finds the unlocked board with the largest difference of friendly to opposing pieces.
      var unlockedBoard = this.unlockedBoard;
      var maxDiff = -1;
      if (this.unlockedBoard === -1) {
        for (var i = 0; i < 9; ++i) {
          if (this.wonBoards[i] === 0) {
            var friendlyCells = this.findCellsOccupiedBy(this.turn, i).length;
            var opposingCells = this.findCellsOccupiedBy(this.turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE, i).length;
            if (friendlyCells - opposingCells > maxDiff) {
              unlockedBoard = i;
              maxDiff = friendlyCells - opposingCells;
            }
          }
        }
      }

      // Finds the move that creates the largest number of winning scenarios locally
      var moves = this.getMoves().filter(function (n) {
        return n >= unlockedBoard * 9 && n < unlockedBoard * 9 + 9;
      });
      if (moves.length === 1) return moves[0];

      var miniBoard = this.board.slice(unlockedBoard * 9, unlockedBoard * 9 + 9);
      var globalWaysToWin = -1;
      var bestMove = null;

      for (var _i = 0; _i < moves.length; ++_i) {
        if (globalWaysToWin !== 100) {
          var moveMadeBoard = miniBoard.slice();
          moveMadeBoard[moves[_i] % 9] = this.turn;
          var localWaysToWin = 0;

          if (this.checkIfGameOver(moveMadeBoard)) {
            return moves[_i];
          } else {
            for (var j = 0; j < moves.length; ++j) {
              var nextMoveMadeBoard = moveMadeBoard.slice();
              nextMoveMadeBoard[moves[j] % 9] = this.turn;
              if (this.checkIfGameOver(nextMoveMadeBoard)) localWaysToWin++;
            }
            if (localWaysToWin > globalWaysToWin) {
              globalWaysToWin = localWaysToWin;
              bestMove = moves[_i];
            }
          }
        }
      }

      return bestMove;
    }

    // Strategy: greedy moves aiming to maximize the difference in winning potential locally

  }, {
    key: 'getMoveFromLevelTwoBot',
    value: function getMoveFromLevelTwoBot() {
      // Finds the unlocked board with the largest difference of friendly to opposing pieces.
      var unlockedBoard = this.unlockedBoard;
      var maxDiff = -1;
      if (this.unlockedBoard === -1) {
        for (var i = 0; i < 9; ++i) {
          if (this.wonBoards[i] === 0) {
            var friendlyCells = this.findCellsOccupiedBy(this.turn, i).length;
            var opposingCells = this.findCellsOccupiedBy(this.turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE, i).length;
            if (friendlyCells - opposingCells > maxDiff) {
              unlockedBoard = i;
              maxDiff = friendlyCells - opposingCells;
            }
          }
        }
      }

      // Finds the move that creates the largest number of winning scenarios
      var moves = this.getMoves().filter(function (n) {
        return n >= unlockedBoard * 9 && n < unlockedBoard * 9 + 9;
      });
      if (moves.length === 1) return moves[0];
      var miniBoard = this.board.slice(unlockedBoard * 9, unlockedBoard * 9 + 9);
      var bestWinningRatio = -100;
      var bestMove = null;

      // Look for easy wins.
      for (var _i2 = 0; _i2 < moves.length; ++_i2) {
        var moveMadeBoard = miniBoard.slice();
        moveMadeBoard[moves[_i2] % 9] = this.turn;
        if (this.checkIfGameOver(moveMadeBoard)) {
          return moves[_i2];
        }
      }

      for (var _i3 = 0; _i3 < moves.length; ++_i3) {
        if (bestWinningRatio !== 100) {
          var _moveMadeBoard = miniBoard.slice();
          _moveMadeBoard[moves[_i3] % 9] = this.turn;
          var localWaysToWin = 0;
          var localWaysToLose = 0;

          // Sums winning scenarios 1 move from now
          for (var j = 0; j < moves.length; ++j) {
            var nextMoveMadeBoard = _moveMadeBoard.slice();
            nextMoveMadeBoard[moves[j] % 9] = this.turn;
            if (this.checkIfGameOver(nextMoveMadeBoard)) localWaysToWin++;
          }
          // Sums losing scenarios for current board
          var opposingTurn = this.turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
          for (var _j = 0; _j < moves.length; ++_j) {
            var _nextMoveMadeBoard = _moveMadeBoard.slice();
            _nextMoveMadeBoard[moves[_j] % 9] = opposingTurn;
            if (this.checkIfGameOver(_nextMoveMadeBoard, opposingTurn)) localWaysToLose++;
          }
          // Sum losing scenarios for next board
          var newUnlockedBoard = this.getUnlockedBoard({ move: moves[_i3], board: _moveMadeBoard, opposingTurn: opposingTurn });
          if (newUnlockedBoard !== -1 && this.wonBoards[newUnlockedBoard] !== 0) {

            var virtualMovesOptions = {
              board: _moveMadeBoard.slice(),
              turn: opposingTurn,
              unlockedBoard: newUnlockedBoard,
              wonBoards: this.wonBoards
            };
            var newMoves = this.getMoves(virtualMovesOptions);
            for (var _j2 = 0; _j2 < newMoves.length; ++_j2) {
              var _nextMoveMadeBoard2 = _moveMadeBoard.slice();
              _nextMoveMadeBoard2[newMoves[_j2] % 9] = opposingTurn;
              if (this.checkIfGameOver(_nextMoveMadeBoard2, opposingTurn)) localWaysToLose++;
            }
            if (localWaysToWin - localWaysToLose > bestWinningRatio) {
              bestWinningRatio = localWaysToWin - localWaysToLose;
              bestMove = moves[_i3];
            }
          }
        }
      }
      if (!bestMove && moves.length > 0) return moves[Math.floor(Math.random() * moves.length)];
      return bestMove;
    }
  }, {
    key: 'findCellsOccupiedBy',
    value: function findCellsOccupiedBy(player, boardIndex) {
      var cells = [];
      var min = boardIndex * 9;
      for (var i = min; i < min + 9; ++i) {
        if (this.board[i] === player) cells.push[i];
      }
      return cells;
    }
  }, {
    key: 'getMoveCount',
    value: function getMoveCount() {
      return this.moveCount;
    }
  }]);

  return Game;
}();

exports.default = Game;