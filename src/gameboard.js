const { Ship } = require("./ship");

class Gameboard {
  #shipPostions = new Array(10);

  constructor() {
    this.board = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10).fill("NONE");
    }

    for (let i = 0; i < 10; i++) {
      this.#shipPostions[i] = new Array(10).fill(null);
    }

    this.totalShips = 0;
    this.totalShipsSunk = 0;
  }

  placeShip(coords, rotation, size) {
    const [x, y] = coords;
    const ship = new Ship(size);

    if (rotation == 0) {
      for (let pos = y; pos < y + size; pos++) {
        this.board[x][pos] = "SHIP";
        this.#shipPostions[x][pos] = ship;
      }
    } else {
      for (let pos = x; pos < x + size; pos++) {
        this.board[pos][y] = "SHIP";
        this.#shipPostions[pos][y] = ship;
      }
    }

    this.totalShips += 1;
  }

  getCoordsState(coords) {
    const [x, y] = coords;
    return this.board[x][y];
  }

  receiveAttack(coords) {
    const [x, y] = coords;

    if (this.board[x][y] == "SHIP") {
      this.#shipPostions[x][y].tookHit();

      if (this.#shipPostions[x][y].isSunk()) this.totalShipsSunk += 1;

      this.board[x][y] = "HIT";
    } else {
      this.board[x][y] = "MISS";
    }
  }

  checkIsGameOver() {
    return this.totalShipsSunk == this.totalShips;
  }
}

module.exports = {
  Gameboard,
};
