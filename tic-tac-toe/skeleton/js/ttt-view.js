class View {
  constructor(game, $el) {
    this.container = $el;
    this.game = game;
  }

  bindEvents() {
    $('li').click( (e) => {
      let $el = $(e.currentTarget);
      $el.text(this.game.currentPlayer);
      $el.addClass('clicked');
      this.makeMove($el.data("pos"));
    });
  }

  makeMove($square) {
    this.game.playMove($square);
    if (this.game.isOver()) {
      this.game.swapTurn();
      alert(`${this.game.currentPlayer} wins`);
    }
  }

  setupBoard() {
    let $ul = $("<ul></ul>");
    for (let i = 0; i < 9; i++) {
      let $li = $("<li></li>");
      $li.data("pos", [Math.floor(i / 3), i % 3]);
      $ul.append($li);
    }
    this.container.append($ul);
    const onHover = (e) => {
      $(e.currentTarget).addClass('hovered');
    };
    const offHover = e => {
      $(e.currentTarget).removeClass('hovered');
    };
    $('li').hover(onHover, offHover);
  }
}

module.exports = View;
