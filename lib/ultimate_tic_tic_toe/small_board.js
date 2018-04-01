'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToe = exports.SmallBoard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _miniGame = require('./miniGame');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mcts = new _miniGame.MonteCarloTreeSearch();

var renderCells = function renderCells(_ref) {
  var _onClick = _ref.onClick,
      _ref$boardIndex = _ref.boardIndex,
      boardIndex = _ref$boardIndex === undefined ? 0 : _ref$boardIndex,
      _ref$board = _ref.board,
      board = _ref$board === undefined ? [] : _ref$board,
      unlocked = _ref.unlocked,
      _ref$won = _ref.won,
      won = _ref$won === undefined ? -1 : _ref$won;

  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
    var cellIndex = boardIndex * 9 + i;
    var clickable = board[cellIndex] === 0 && unlocked && won === -1;

    return React.createElement('div', {
      className: 'cell',
      'data-player': board[cellIndex],
      'data-clickable': clickable,
      'data-won': won,
      key: i,
      onClick: function onClick() {
        return clickable ? _onClick(cellIndex) : null;
      }
    });
  });
};

var SmallBoard = function SmallBoard() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var unlocked = props.unlocked,
      won = props.won;


  return React.createElement(
    'div',
    { className: 'tictactoeBoard', 'data-unlocked': unlocked, 'data-won': won },
    renderCells(props)
  );
};

var TicTacToe = function (_React$PureComponent) {
  _inherits(TicTacToe, _React$PureComponent);

  function TicTacToe(props) {
    _classCallCheck(this, TicTacToe);

    var _this = _possibleConstructorReturn(this, (TicTacToe.__proto__ || Object.getPrototypeOf(TicTacToe)).call(this, props));

    _this.handleOnClick = function (index) {
      var _this$state = _this.state,
          board = _this$state.board,
          player = _this$state.player;

      var position = new _miniGame.Position(Math.floor(index / 3), index % 3);

      board.performMove(player, position);
      var formattedBoard = [].concat.apply([], board.boardValues);

      _this.setState({
        player: 3 - player,
        formattedBoard: formattedBoard
      });
    };

    _this.runBot = function () {
      var _this$state2 = _this.state,
          board = _this$state2.board,
          player = _this$state2.player;


      var newBoard = mcts.findNextMove(board, player);
      var formattedBoard = [].concat.apply([], newBoard.boardValues);

      _this.setState({
        player: 3 - player,
        board: newBoard,
        formattedBoard: formattedBoard
      });
    };

    _this.state = {
      board: new _miniGame.Board(),
      player: 1,
      formattedBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    return _this;
  }

  _createClass(TicTacToe, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.board.checkStatus() === -1 && prevState.player === 1 && this.state.player === 2) {
        this.runBot();
      } else if (this.state.board.checkStatus() !== -1) {
        this.setState({
          board: new _miniGame.Board(),
          player: prevState.player,
          formattedBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(SmallBoard, {
        won: false,
        boardIndex: 0,
        unlocked: true,
        onClick: this.handleOnClick,
        board: this.state.formattedBoard
      });
    }
  }]);

  return TicTacToe;
}(React.PureComponent);

exports.SmallBoard = SmallBoard;
exports.TicTacToe = TicTacToe;