"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmallBoard = function (_React$Component) {
  _inherits(SmallBoard, _React$Component);

  function SmallBoard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SmallBoard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SmallBoard.__proto__ || Object.getPrototypeOf(SmallBoard)).call.apply(_ref, [this].concat(args))), _this), _this.renderCells = function () {
      var _this$props = _this.props,
          _onClick = _this$props.onClick,
          boardIndex = _this$props.boardIndex,
          board = _this$props.board,
          unlocked = _this$props.unlocked,
          won = _this$props.won;


      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
        var cellIndex = boardIndex * 9 + i;
        var clickable = board[cellIndex] === 0 && unlocked && !won;

        return React.createElement("div", {
          className: "cell",
          "data-player": board[cellIndex],
          "data-clickable": clickable,
          "data-won": won,
          key: i,
          onClick: function onClick() {
            return clickable ? _onClick(cellIndex) : null;
          }
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SmallBoard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          unlocked = _props.unlocked,
          won = _props.won;


      return React.createElement(
        "div",
        { className: "tictactoeBoard", "data-unlocked": unlocked, "data-won": won },
        this.renderCells()
      );
    }
  }]);

  return SmallBoard;
}(React.Component);

exports.default = SmallBoard;