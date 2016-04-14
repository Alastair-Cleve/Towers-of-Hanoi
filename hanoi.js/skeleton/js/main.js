var HanoiView = require("./view");
var HanoiGame = require("../../hanoi-core-solution/game");

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);

});
