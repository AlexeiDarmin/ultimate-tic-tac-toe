'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonteCarloTreeSearch = exports.Position = exports.Board = exports.runGame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('./helper');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(dynamicInitializer) {
    _classCallCheck(this, Node);

    var initializingFromNothing = !dynamicInitializer;

    if (initializingFromNothing) {
      this.state = new State();
      this.parent = null;
      this.childArray = [];
      return;
    }

    var initializingFromNode = dynamicInitializer.state;
    var initializingFromState = !initializingFromNode;

    if (initializingFromNode) {
      this.state = new State(dynamicInitializer.state);
      this.parent = dynamicInitializer.parent;
      this.childArray = dynamicInitializer.childArray.slice();
    } else if (initializingFromState) {
      this.state = new State(dynamicInitializer);
      this.parent = null;
      this.childArray = [];
    }
  }

  _createClass(Node, [{
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'getParent',
    value: function getParent() {
      return this.parent;
    }
  }, {
    key: 'getChildArray',
    value: function getChildArray() {
      return this.childArray;
    }
  }, {
    key: 'setBoard',
    value: function setBoard(board) {
      this.state.setBoard(board);
    }
  }, {
    key: 'setPlayerNo',
    value: function setPlayerNo(playerNo) {
      this.state.setPlayerNo(playerNo);
    }
  }, {
    key: 'setParent',
    value: function setParent(node) {
      this.parent = node;
    }
  }, {
    key: 'getChildWithMaxScore',
    value: function getChildWithMaxScore() {
      var maxScore = Number.MIN_SAFE_INTEGER;
      var child = void 0;
      this.getChildArray().forEach(function (c) {
        if (c.state.winScore > maxScore) {
          maxScore = c.state.winScore;
          child = c;
        }
      });

      return child;
    }
  }, {
    key: 'getRandomChildNode',
    value: function getRandomChildNode() {
      return this.childArray[Math.floor(Math.random() * this.childArray.length)];
    }
  }]);

  return Node;
}();

var Tree = function () {
  function Tree(n) {
    _classCallCheck(this, Tree);

    if (n) this.root = n;else {
      this.root = new Node();
    }
  }

  _createClass(Tree, [{
    key: 'getRoot',
    value: function getRoot() {
      return this.root;
    }
  }, {
    key: 'setRoot',
    value: function setRoot(node) {
      this.root = node;
    }
  }]);

  return Tree;
}();

var State = function () {
  function State(state) {
    _classCallCheck(this, State);

    this.board = new _helper.UTTTBoard(state ? state.board : null);
    this.playerNo = state ? state.playerNo : null;
    this.visitCount = state ? state.visitCount : 0;
    this.winScore = state ? state.winScore : 0;
  }

  _createClass(State, [{
    key: 'getWinScore',
    value: function getWinScore() {
      return this.winScore;
    }
  }, {
    key: 'getVisitCount',
    value: function getVisitCount() {
      return this.visitCount;
    }
  }, {
    key: 'getBoard',
    value: function getBoard() {
      return this.board;
    }
  }, {
    key: 'getOpponent',
    value: function getOpponent() {
      return 3 - this.playerNo;
    }
  }, {
    key: 'getPlayerNo',
    value: function getPlayerNo() {
      return this.playerNo;
    }
  }, {
    key: 'setBoard',
    value: function setBoard(board) {
      this.board = board;
    }
  }, {
    key: 'setPlayerNo',
    value: function setPlayerNo(player) {
      this.playerNo = player;
    }
  }, {
    key: 'setWinScore',
    value: function setWinScore(score) {
      this.winScore = score;
    }
  }, {
    key: 'addScore',
    value: function addScore(score) {
      if (this.winScore !== Number.MIN_SAFE_INTEGER) {
        this.winScore += score;
      }
    }
  }, {
    key: 'incrementVisit',
    value: function incrementVisit() {
      this.visitCount++;
    }
  }, {
    key: 'getAllPossibleStates',
    value: function getAllPossibleStates() {
      var _this = this;

      // constructs a list of all possible states from current state
      var possibleMoves = this.board.getEmptyPositions();

      var possibleStates = [];

      possibleMoves.forEach(function (move) {
        var newState = new State({
          board: new _helper.UTTTBoard(_this.board),
          playerNo: 3 - _this.playerNo,
          visitCount: 0,
          winScore: 0
        });
        newState.board.performMove(newState.playerNo, move);
        possibleStates.push(newState);
      });

      return possibleStates;
    }
  }, {
    key: 'randomPlay',
    value: function randomPlay() {
      // get a list of all possible positions on the board and play a random move
      var possibleMoves = this.board.getEmptyPositions();
      var randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      this.board.performMove(this.playerNo, randomMove);
    }
  }, {
    key: 'togglePlayer',
    value: function togglePlayer() {
      this.playerNo = 3 - this.playerNo;
    }
  }]);

  return State;
}();

var MonteCarloTreeSearch = function () {
  function MonteCarloTreeSearch() {
    _classCallCheck(this, MonteCarloTreeSearch);
  }

  _createClass(MonteCarloTreeSearch, [{
    key: 'findNextMove',
    value: function findNextMove(board, playerNo) {
      // define an end time which will act as a terminating condition
      // const end = (new Date()).getTime() + 100
      var end = 2;

      var opponent = 3 - playerNo;
      var tree = new Tree();
      var rootNode = tree.getRoot();
      rootNode.getState().setBoard(board);
      rootNode.getState().setPlayerNo(opponent);

      // while ((new Date()).getTime() < end) {
      var count = 0;
      while (count < 150000) {
        var promisingNode = this.selectPromisingNode(rootNode);
        if (promisingNode.getState().getBoard().checkStatus() === board.IN_PROGRESS) {
          this.expandNode(promisingNode);
        }
        var nodeToExplore = promisingNode;
        if (promisingNode.getChildArray().length > 0) {
          nodeToExplore = promisingNode.getRandomChildNode();
        }
        var playoutResult = this.simulateRandomPlayout(nodeToExplore, opponent);
        this.backPropogation(nodeToExplore, playoutResult);
        count++;
      }
      var winnerNode = rootNode.getChildWithMaxScore();
      tree.setRoot(winnerNode);
      return winnerNode.getState().getBoard();
    }
  }, {
    key: 'selectPromisingNode',
    value: function selectPromisingNode(rootNode) {
      var node = rootNode;

      while (node.getChildArray().length !== 0) {
        node = UCTInstance.findBestNodeWithUCT(node);
      }
      return node;
    }

    // Populates the childArray of node

  }, {
    key: 'expandNode',
    value: function expandNode(node) {
      var possibleStates = node.getState().getAllPossibleStates();
      possibleStates.forEach(function (state) {
        var newNode = new Node(state);
        newNode.setParent(node);
        newNode.getState().setPlayerNo(node.getState().getOpponent());
        node.getChildArray().push(newNode);
      });
    }

    // If nodeToExplore is a winning board for playerNo, then add WIN_SCORE to total winScore for playerNo.

  }, {
    key: 'backPropogation',
    value: function backPropogation(nodeToExplore, playerNo) {
      var tempNode = nodeToExplore;
      while (tempNode != null) {
        tempNode.getState().incrementVisit();
        if (tempNode.getState().getPlayerNo() == playerNo) {
          tempNode.getState().addScore(10);
        }
        tempNode = tempNode.getParent();
      }
    }
  }, {
    key: 'simulateRandomPlayout',
    value: function simulateRandomPlayout(node, opponent) {
      var tempNode = new Node(node);
      var tempState = tempNode.getState();
      var boardStatus = tempState.getBoard().checkStatus();
      if (boardStatus === opponent) {
        tempNode.getParent().getState().setWinScore(Number.MIN_SAFE_INTEGER);
        return boardStatus;
      }
      while (boardStatus == tempState.getBoard().IN_PROGRESS) {
        tempState.togglePlayer();
        tempState.randomPlay();
        boardStatus = tempState.getBoard().checkStatus();
      }
      return boardStatus;
    }
  }]);

  return MonteCarloTreeSearch;
}();

var UCT = function () {
  function UCT() {
    _classCallCheck(this, UCT);
  }

  _createClass(UCT, [{
    key: 'construtor',
    value: function construtor() {}
  }, {
    key: 'uctValue',
    value: function uctValue(totalVisit, nodeWinScore, nodeVisit) {
      if (nodeVisit == 0) {
        return Number.MAX_SAFE_INTEGER;
      }
      // 1.41 is an approximation of Math.sqrt(2) which is exploration parameter
      return nodeWinScore / nodeVisit + Math.sqrt(2) * Math.sqrt(Math.log(totalVisit) / nodeVisit);
    }
  }, {
    key: 'findBestNodeWithUCT',
    value: function findBestNodeWithUCT(node) {
      var _this2 = this;

      var parentVisit = node.getState().getVisitCount();
      var scoreList = node.getChildArray().map(function (c) {
        return _this2.uctValue(parentVisit, c.getState().getWinScore(), c.getState().getVisitCount());
      });

      // room for improvement here
      var maxScore = Math.max.apply(Math, _toConsumableArray(scoreList));
      var index = scoreList.indexOf(maxScore);
      return node.getChildArray()[index];
    }
  }]);

  return UCT;
}();

function runGame() {
  var mtcs = new MonteCarloTreeSearch();
  var board = new _helper.UTTTBoard();
  var player = board.P1;
  var totalMoves = board.DEFAULT_BOARD_SIZE * board.DEFAULT_BOARD_SIZE;
  for (var i = 0; i < totalMoves; i++) {
    board = mtcs.findNextMove(board, player);
    if (board.checkStatus() != -1) {
      break;
    }
    player = 3 - player;
  }
  var winStatus = board.checkStatus();
  // assertEquals(winStatus, Board.DRAW);
  return board;
}

var UCTInstance = new UCT();

exports.runGame = runGame;
exports.Board = _helper.UTTTBoard;
exports.Position = _helper.Position;
exports.MonteCarloTreeSearch = MonteCarloTreeSearch;