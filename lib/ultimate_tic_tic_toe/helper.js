'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = function () {
  function Position(x, y) {
    _classCallCheck(this, Position);

    this.x = x;
    this.y = y;
  }

  _createClass(Position, [{
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }]);

  return Position;
}();

var TicTacToeBoard = function () {
  function TicTacToeBoard(board) {
    _classCallCheck(this, TicTacToeBoard);

    this.DEFAULT_BOARD_SIZE = 3;
    this.IN_PROGRESS = -1;
    this.DRAW = 0;
    this.P1 = 1;
    this.P2 = 2;
    this.totalMoves = 0;

    if (board) {
      this.boardValues = board.boardValues.map(function (r) {
        return r.slice();
      });
      this.DEFAULT_BOARD_SIZE = board.DEFAULT_BOARD_SIZE;
      this.IN_PROGRESS = board.IN_PROGRESS;
      this.DRAW = board.DRAW;
      this.P1 = board.P1;
      this.P2 = board.P2;
      this.totalMoves = board.totalMoves;
    } else {
      this.boardValues = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      this.DEFAULT_BOARD_SIZE = 3;
      this.IN_PROGRESS = -1;
      this.DRAW = 0;
      this.P1 = 1;
      this.P2 = 2;
      this.totalMoves = 0;
    }
  }

  _createClass(TicTacToeBoard, [{
    key: 'performMove',
    value: function performMove(player, p) {
      // position p
      this.totalMoves++;
      this.boardValues[p.getX()][p.getY()] = player;
    }

    // checkStatus() {
    //   /* Evaluate whether the game is won and return winner. If it is draw return 0 else return -1 */
    //   const { boardValues: b, totalMoves } = this

    //   if (b[0][0] !== 0 && b[0][0] === b[0][1] && b[0][1] === b[0][2]) {
    //     return b[0][0]
    //   } else if (b[1][0] !== 0 && b[1][0] === b[1][1] && b[1][1] === b[1][2]) {
    //     return b[1][0]
    //   } else if (b[2][0] !== 0 && b[2][0] === b[2][1] && b[2][1] === b[2][2]) {
    //     return b[2][0]
    //   } else if (b[0][0] !== 0 && b[0][0] === b[1][0] && b[1][0] === b[2][0]) {
    //     return b[1][0]
    //   } else if (b[0][1] !== 0 && b[0][1] === b[1][1] && b[1][1] === b[2][1]) {
    //     return b[0][1]
    //   } else if (b[0][2] !== 0 && b[0][2] === b[1][2] && b[1][2] === b[2][2]) {
    //     return b[0][2]
    //   } else if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    //     return b[0][0]
    //   } else if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    //     return b[0][2]
    //   }

    //   if (totalMoves === 9) {
    //     return 0
    //   }

    //   return -1
    // }

    // getEmptyPositions() {
    //   const size = this.boardValues.length;
    //   const emptyPositions = new Array();
    //   for (let i = 0; i < size; i++) {
    //     for (let j = 0; j < size; j++) {
    //       if (this.boardValues[i][j] == 0)
    //         emptyPositions.push(new Position(i, j));
    //     }
    //   }
    //   return emptyPositions;
    // }

  }]);

  return TicTacToeBoard;
}();

var UTTTBoard = function () {
  function UTTTBoard(board) {
    _classCallCheck(this, UTTTBoard);

    this.DEFAULT_BOARD_SIZE = 9;
    this.IN_PROGRESS = -1;
    this.DRAW = 0;
    this.P1 = 1;
    this.P2 = 2;
    this.totalMoves = 0;
    this.unlockedBoardCell = -1;

    if (board) {
      this.boardValues = board.boardValues.slice();
      this.wonBoards = board.wonBoards.slice().map(function (r) {
        return r.slice();
      });
      this.unlockedBoardCell = board.unlockedBoardCell;
      this.totalMoves = board.totalMoves;
    } else {
      this.boardValues = '0'.repeat(81).split('').map(function (x) {
        return parseInt(x);
      });
      this.wonBoards = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; // 2d array to match original checkStatus() spec
    }
  }

  _createClass(UTTTBoard, [{
    key: 'performMove',
    value: function performMove(player, index) {
      this.totalMoves++;
      this.boardValues[index] = player;

      var boardIndex = Math.floor(index / 9);
      var start_i = boardIndex * 9;
      var currBoard = [this.boardValues.slice(start_i, start_i + 3), this.boardValues.slice(start_i + 3, start_i + 6), this.boardValues.slice(start_i + 6, start_i + 9)];

      // Updates won boards if the status of the board in the current move has changed.
      var status = this.checkStatus(currBoard);

      if (status !== -1) {
        var newWonBoards = flattenNestedArrays(this.wonBoards);
        newWonBoards[boardIndex] = status;
        this.wonBoards = unFlattenNestedArrays(newWonBoards);
      }

      // Updates unlocked board cell, if the board is already won then sets unlockedBoardCell to -1
      var localMoveIndex = index % 9;
      var nextBoardStatus = flattenNestedArrays(this.wonBoards)[localMoveIndex];
      this.unlockedBoardCell = nextBoardStatus === -1 ? localMoveIndex : -1;
    }
    /*
      Evaluates whether the global board has been won by default, can also evaluate if the unlocked board has been won.
      Returns the winner, if it's a draw then 1 else -1.
    */

  }, {
    key: 'checkStatus',
    value: function checkStatus(board) {
      /* Evaluate whether the game is won and return winner. If it is draw return 0 else return -1 */
      var b = board ? board : this.wonBoards;
      var isWonBoards = !board;
      var n = isWonBoards ? -1 : 0; // value to check against
      // console.log('checking status of: ', b)
      if (b[0][0] !== n && b[0][0] === b[0][1] && b[0][1] === b[0][2]) {
        return b[0][0];
      } else if (b[1][0] !== n && b[1][0] === b[1][1] && b[1][1] === b[1][2]) {
        return b[1][0];
      } else if (b[2][0] !== n && b[2][0] === b[2][1] && b[2][1] === b[2][2]) {
        return b[2][0];
      } else if (b[0][0] !== n && b[0][0] === b[1][0] && b[1][0] === b[2][0]) {
        return b[0][0];
      } else if (b[0][1] !== n && b[0][1] === b[1][1] && b[1][1] === b[2][1]) {
        return b[0][1];
      } else if (b[0][2] !== n && b[0][2] === b[1][2] && b[1][2] === b[2][2]) {
        return b[0][2];
      } else if (b[0][0] !== n && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
        return b[0][0];
      } else if (b[0][2] !== n && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        return b[0][2];
      }

      for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
          if (b[r][c] === n && isWonBoards) {
            return -1;
          } else if (b[r][c] === n && !isWonBoards) {
            return -1;
          }
        }
      }

      return 0;
    }

    // gets all valid moves, not all empty positions

  }, {
    key: 'getEmptyPositions',
    value: function getEmptyPositions() {

      var min = 0;
      var max = 80;
      if (this.unlockedBoardCell >= 0) {
        min = this.unlockedBoardCell * 9;
        max = this.unlockedBoardCell * 9 + 8;
      }

      var emptyPositions = new Array();
      var wonBoardsFlattened = flattenNestedArrays(this.wonBoards);
      for (var i = min; i <= max; i++) {
        if (this.boardValues[i] === 0 && wonBoardsFlattened[Math.floor(i / 9)] === -1) {
          emptyPositions.push(i);
        }
      }
      if (emptyPositions.length === 0) debugger;
      return emptyPositions;
    }
  }]);

  return UTTTBoard;
}();

function flattenNestedArrays(arr) {
  return [].concat.apply([], arr);
}

function unFlattenNestedArrays(arr) {
  return [[arr[0], arr[1], arr[2]], [arr[3], arr[4], arr[5]], [arr[6], arr[7], arr[8]]];
}

exports.TicTacToeBoard = TicTacToeBoard;
exports.UTTTBoard = UTTTBoard;
exports.Position = Position;