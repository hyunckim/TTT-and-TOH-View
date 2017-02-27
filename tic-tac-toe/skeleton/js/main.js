const View = require("./ttt-view");
const Game = require("../../solution/game");

$( () => {
  const container = $($(".ttt")[0]);
  const game  = new Game();
  const view = new View(game, container);
  view.setupBoard();
  view.bindEvents();
});
