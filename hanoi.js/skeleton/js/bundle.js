/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);

	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function HanoiView(game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.fromTower;
	  this.toTower;
	  this.setupTowers();
	  this.render();
	  this.bindClickTowerListener();
	}

	HanoiView.prototype.move = function() {
	  if (this.game.move(this.fromTower, this.toTower)) {
	    this.render();
	  } else {
	    alert("Invalid move, please make another move.");
	  }
	  this.fromTower = undefined;
	  this.toTower = undefined;
	};

	HanoiView.prototype.bindClickTowerListener = function() {
	  $("ul").on("click", function(event) {
	    var $currentTarget = $(event.currentTarget);

	    if (typeof this.fromTower === "number") {
	      this.toTower = parseInt($currentTarget.attr("data-pos"));
	      $('ul').removeClass("selected");
	      this.move();
	      if (this.game.isWon()) {
	        alert("You have won the game!");
	      }
	    } else {
	      this.fromTower = parseInt($currentTarget.attr("data-pos"));
	      $currentTarget.addClass("selected");
	    }
	  }.bind(this));
	};

	HanoiView.prototype.setupTowers = function() {
	  var $stack0 = $("<ul></ul>");
	  var $stack1 = $("<ul></ul>");
	  var $stack2 = $("<ul></ul>");
	  var stackArray = [$stack0, $stack1, $stack2];
	  // console.log(stackArray);

	  var number = 0;
	  stackArray.forEach(function(stack) {
	    for (var i = 2; i >= 0; i--) {
	      var $li = $("<li></li>)");
	      $li.attr("data-pos", "" + number + "," + i);
	      stack.attr("data-pos", number);

	      stack.append($li);
	    }
	    this.$el.append(stack);
	    number += 1;
	  }.bind(this));

	};

	HanoiView.prototype.render = function() {
	  $("li").removeClass('disk-1');
	  $("li").removeClass('disk-2');
	  $("li").removeClass('disk-3');

	  this.game.towers.forEach(function(tower, towerIdx) {
	    tower.forEach(function(pebble, pebbleIdx) {
	      var $li = $("[data-pos=" + "'" + towerIdx + "," + pebbleIdx + "'" + "]");
	      switch (pebble) {
	        case 1:
	          $li.addClass('disk-1');
	          break;
	        case 2:
	          $li.addClass('disk-2');
	          break;
	        case 3:
	          $li.addClass('disk-3');
	          break;
	      }
	    });
	  });

	};


	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	}

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};

	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};

	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }

	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};

	module.exports = Game;


/***/ }
/******/ ]);