class View {
  constructor(game, $el) {
    this.game = game;
    this.container = $el;
    this.clickedTower = null;
    this.setupTowers();
    this.render();
    this.installHoverHandler();
    this.installClickHandler();
  }

  setupTowers() {
    let chars = ['A', 'B', 'C'];
    for (let i = 0; i < 3; i++) {
      let $ul = $("<ul></ul>");
      $ul.data("index", i);
      this.container.append($ul);
    }
  }

  installHoverHandler() {
    const onHover = (e) => {
      $(e.currentTarget).addClass('highlighted');
    };
    const offHover = e => {
      $(e.currentTarget).removeClass('highlighted');
    };

    $('.hanoi ul').hover(onHover ,offHover);
  }


  installClickHandler() {
    $('.hanoi ul').on('click', e => {
      let i = $(e.currentTarget).data("index");
      this.clickTower(i);
      this.alertIfWon();
    });
  }
  clickTower(tower) {
    console.log(this.clickedTower);
    if (this.clickedTower !== null) {
      this.moveTower(tower);
    } else {
      this.clickedTower = tower;
      $($('ul')[tower]).addClass('selected');
    }
  }

  moveTower(tower) {
    if (!this.game.move(this.clickedTower, tower)) {
      alert('invalid move');
    } else {
      this.clickedTower = null;
      $('ul').removeClass('selected');
      this.render();
    }
  }

  alertIfWon() {
    if (this.game.isWon()) {
      alert('you won!');
    }
  }

  render() {
    $('li').remove();
    for (let i = 0; i < 3; i++) {
      let $ul = $($('ul')[i]);
      let contents = this.game.towers[i];
      contents.forEach (size => {
        let $li = $("<li></li>");
        $li.addClass('disk');
        if (size === 1) { $li.addClass('top-disk'); }
        if (size === 2) { $li.addClass('middle-disk'); }
        if (size === 3) { $li.addClass('bottom-disk'); }
        $ul.append($li);
      });
    }
  }
}

module.exports = View;
