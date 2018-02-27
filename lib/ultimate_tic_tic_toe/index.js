'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = exports.UltimateTicTacToe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _botSkills;

var _react = require('react');

var React = _interopRequireWildcard(_react);

require('./ultimate_tic_tac_toe.css');

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _small_board = require('./small_board');

var _small_board2 = _interopRequireDefault(_small_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PLAYER_HUMAN = 'human';
var PLAYER_BOT_0 = 'bot_level_zero';
var PLAYER_BOT_1 = 'bot_level_one';
var PLAYER_BOT_2 = 'bot_level_two';

var botSkills = (_botSkills = {}, _defineProperty(_botSkills, PLAYER_BOT_0, 0), _defineProperty(_botSkills, PLAYER_BOT_1, 1), _defineProperty(_botSkills, PLAYER_BOT_2, 2), _botSkills);

var game = new _game2.default();

var UltimateTicTacToe = function (_React$Component) {
  _inherits(UltimateTicTacToe, _React$Component);

  function UltimateTicTacToe(props) {
    _classCallCheck(this, UltimateTicTacToe);

    var _this = _possibleConstructorReturn(this, (UltimateTicTacToe.__proto__ || Object.getPrototypeOf(UltimateTicTacToe)).call(this, props));

    _this.runBot = function (botType) {
      if (!game.isGameOver()) {
        var moves = game.getMoves();
        var move = game.getMoveFromBot({ skill: botSkills[botType] });
        _this.handlePlayerMove(move);
      }
    };

    _this.handlePlayerMove = function (cellIndex) {
      game.move(cellIndex);

      _this.setState({
        board: game.getBoard(),
        turn: game.getPlayerTurn(),
        unlockedBoard: game.getUnlockedBoard(),
        wonBoards: game.getWonBoards(),
        moveCount: game.getMoveCount()
      });
    };

    _this.state = {
      board: game.getBoard(),
      turn: game.getPlayerTurn(),
      unlockedBoard: game.getUnlockedBoard(),
      wonBoards: game.getWonBoards(),
      playerOneWins: 0,
      playerTwoWins: 0,
      moveCount: 0
    };
    return _this;
  }

  _createClass(UltimateTicTacToe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var playerOne = this.props.playerOne;


      if (playerOne !== PLAYER_HUMAN) {
        this.runBot(playerOne);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (!game.isGameOver() || this.state.moveCount === 0) {
        if (this.state.turn === 1 && this.props.playerOne !== PLAYER_HUMAN) {
          setTimeout(function () {
            return _this2.runBot(_this2.props.playerOne);
          }, this.props.moveDelay);
        } else if (this.state.turn === 2 && this.props.playerTwo !== PLAYER_HUMAN) {
          setTimeout(function () {
            return _this2.runBot(_this2.props.playerTwo);
          }, this.props.moveDelay);
        }
      } else if (game.isGameOver()) {
        if (this.props.loopGame === true) {
          var winner = game.getWinningPlayer();
          game = new _game2.default();

          if (winner === 1) {
            console.log('player 1 to 2 win ratio: ', this.state.playerOneWins + 1, this.state.playerTwoWins);
            this.setState({ playerOneWins: this.state.playerOneWins + 1, moveCount: 0 });
          } else if (winner === 2) {
            console.log('player 1 to 2 win ratio: ', this.state.playerOneWins, this.state.playerTwoWins + 1);
            this.setState({ playerTwoWins: this.state.playerTwoWins + 1, moveCount: 0 });
          } else {
            this.setState({ moveCount: 0 });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          board = _state.board,
          unlockedBoard = _state.unlockedBoard,
          wonBoards = _state.wonBoards;


      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'div',
          { className: 'megaTictactoeBoard' },
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
            return React.createElement(_small_board2.default, {
              key: i,
              boardIndex: i,
              onClick: _this3.handlePlayerMove,
              board: board,
              unlocked: unlockedBoard === i || unlockedBoard === -1,
              won: wonBoards[i]
            });
          })
        )
      );
    }
  }]);

  return UltimateTicTacToe;
}(React.Component);

UltimateTicTacToe.defaultProps = {
  playerOne: PLAYER_HUMAN,
  playerTwo: PLAYER_HUMAN,
  loopGame: false,
  moveDelay: 1000
};

exports.UltimateTicTacToe = UltimateTicTacToe;
exports.Game = _game2.default;