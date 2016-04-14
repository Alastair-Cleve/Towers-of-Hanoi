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
