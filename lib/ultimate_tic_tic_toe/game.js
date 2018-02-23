'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PLAYER_ONE = 1;
var PLAYER_TWO = 2;
var EMPTY = 0;

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = [];

    this.board = '0'.repeat(81).split('').map(function (x) {
      return parseInt(x);
    });
    this.wonBoards = '0'.repeat(9).split('').map(function (x) {
      return parseInt(x);
    });
    this.turn = PLAYER_ONE;
    this.unlockedBoard = -1;
    this.gameOver = false;
    // this.load()
  }

  //   load(){
  //     this.board = []
  //     for (let i = 0; i < 81; ++i) {
  //       this.board.push(0)
  //     }
  //   }

  _createClass(Game, [{
    key: 'move',
    value: function move(index) {
      var newBoard = this.board.slice();
      var turn = this.turn;
      newBoard[index] = turn;

      var newTurn = turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
      var newWonBoards = this.getWonBoards({ board: newBoard, index: index, turn: turn });

      var sum = function sum(listOfNumbers) {
        return listOfNumbers.reduce(function (a, b) {
          return a + b;
        }, 0);
      };

      // Finds next unlocked board, if that board has no available moves then all boards become unlocked.
      var unlockedBoard = sum(newWonBoards) !== sum(this.wonBoards) || newWonBoards[index % 9] > 0 ? -1 : index % 9;

      var movesAvailable = false;
      for (var i = unlockedBoard * 9; i < unlockedBoard * 9 + 9; ++i) {
        if (this.board[i] === 0) {
          movesAvailable = true;
        }
      }

      if (!movesAvailable) {
        unlockedBoard = -1;
      }

      this.board = newBoard, this.turn = newTurn, this.unlockedBoard = unlockedBoard, this.wonBoards = newWonBoards;
      this.checkIfGameOver();
    }
  }, {
    key: 'checkIfGameOver',
    value: function checkIfGameOver() {
      var wonBoards = this.wonBoards;

      if (wonBoards[0] === wonBoards[1] && wonBoards[0] === wonBoards[2] && wonBoards[0] !== EMPTY || wonBoards[3] === wonBoards[4] && wonBoards[3] === wonBoards[5] && wonBoards[3] !== EMPTY || wonBoards[6] === wonBoards[7] && wonBoards[6] === wonBoards[8] && wonBoards[6] !== EMPTY || wonBoards[0] === wonBoards[3] && wonBoards[0] === wonBoards[6] && wonBoards[0] !== EMPTY || wonBoards[1] === wonBoards[4] && wonBoards[1] === wonBoards[7] && wonBoards[1] !== EMPTY || wonBoards[2] === wonBoards[5] && wonBoards[2] === wonBoards[8] && wonBoards[2] !== EMPTY || wonBoards[0] === wonBoards[4] && wonBoards[0] === wonBoards[8] && wonBoards[0] !== EMPTY || wonBoards[2] === wonBoards[4] && wonBoards[2] === wonBoards[6] && wonBoards[2] !== EMPTY) {
        this.gameOver = true;
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
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$board = _ref.board,
          board = _ref$board === undefined ? null : _ref$board,
          _ref$index = _ref.index,
          index = _ref$index === undefined ? null : _ref$index,
          _ref$turn = _ref.turn,
          turn = _ref$turn === undefined ? null : _ref$turn;

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
    key: 'getUnlockedBoard',
    value: function getUnlockedBoard() {
      return this.unlockedBoard;
    }
  }]);

  return Game;
}();

exports.default = Game;