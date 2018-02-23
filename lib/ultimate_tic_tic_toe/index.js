'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = exports.UltimateTicTacToe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var game = new _game2.default();

var UltimateTicTacToe = function (_React$Component) {
  _inherits(UltimateTicTacToe, _React$Component);

  function UltimateTicTacToe(props) {
    _classCallCheck(this, UltimateTicTacToe);

    var _this = _possibleConstructorReturn(this, (UltimateTicTacToe.__proto__ || Object.getPrototypeOf(UltimateTicTacToe)).call(this, props));

    _this.handlePlayerMove = function (cellIndex) {
      game.move(cellIndex);

      _this.setState({
        board: game.getBoard(),
        turn: game.getPlayerTurn(),
        unlockedBoard: game.getUnlockedBoard(),
        wonBoards: game.getWonBoards()
      });
    };

    _this.state = {
      board: game.getBoard(),
      turn: game.getPlayerTurn(),
      unlockedBoard: game.getUnlockedBoard(),
      wonBoards: game.getWonBoards()
    };
    return _this;
  }

  _createClass(UltimateTicTacToe, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
              onClick: _this2.handlePlayerMove,
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

exports.UltimateTicTacToe = UltimateTicTacToe;
exports.Game = _game2.default;