const { getRandomInt } = require("./gameUtil");
const { Gameboard } = require("./gameboard");

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.opponentBoard = null;
    this.movesPlayed = new Set();
  }

  setOpponent(opponent) {
    this.opponentBoard = opponent.gameboard;
  }

  playMove(move) {
    if (this.opponentBoard == null)
      throw new Error("Opponent not set for player");
    this.opponentBoard.recieveAttack(move);
  }

  playRandomMove() {
    if (this.opponentBoard == null)
      throw new Error("Opponent not set for player");

    const x = getRandomInt(0, 9);
    const y = getRandomInt(0, 9);
    while (this.movesPlayed.has(`${x}${y}`)) {
      x = getRandomInt(0, 9);
      y = getRandomInt(0, 9);
    }

    this.movesPlayed.add(`${x}${y}`);
    this.playMove([x, y]);
  }

  checkWin() {
    if (this.opponentBoard == null)
      throw new Error("Opponent not set for player");
    return this.opponentBoard.checkIsGameOver();
  }
}

module.exports = {
  Player,
};
