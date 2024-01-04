const { generateRandomShipPlacements } = require("./gameUtil");
const { Player } = require("./player");

class Game {
  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();

    this.playerOne.setOpponent(this.playerTwo);
    this.playerTwo.setOpponent(this.playerOne);
  }

  startGameVsComputer(playerBoard) {
    for (let ship of playerBoard) {
      const [x, y, rotation, size] = [...ship];
      this.playerOne.gameboard.placeShip([x, y], rotation, size);
    }

    for (let ship of generateRandomShipPlacements()) {
      const [x, y, rotation, size] = [...ship];
      this.playerTwo.gameboard.placeShip([x, y], rotation, size);
    }
  }

  playMoveVsComputer(move) {
    this.playerOne.playMove(move);
    if (this.playerOne.checkWin()) {
      // Call to show the win
    } else {
      this.playerTwo.playRandomMove();
      if (this.playerTwo.checkWin()) {
        // Call to show the win
      }
      // Call to show the move played
    }
  }
}

module.exports = {
  Game,
};
