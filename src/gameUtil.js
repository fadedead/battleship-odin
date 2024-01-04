const { shipsAvailable } = require("./config");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomShipPlacements() {
  const currFleet = { ...shipsAvailable };
  const visited = new Set();
  const shipPlacements = [];

  for (let [size, quantity] of Object.entries(currFleet)) {
    size = parseInt(size);
    for (let i = 0; i < quantity; i++) {
      let x = getRandomInt(0, 9);
      let y = getRandomInt(0, 9);

      let rotation = getRandomInt(0, 1);

      while (checkShipExist(x, y, rotation, size, visited)) {
        x = getRandomInt(0, 9);
        y = getRandomInt(0, 9);

        rotation = getRandomInt(0, 1);
      }
      shipPlacements.push([x, y, rotation, size]);
    }
  }

  return shipPlacements;
}

function checkShipExist(x, y, rotation, length, visited) {
  if (rotation === 0) {
    if (y + length > 9) return true;

    const currCells = [];
    for (let checkY = y; checkY <= y + length; checkY++) {
      let shipStr = "" + x + checkY;
      currCells.push(shipStr);
      if (visited.has(shipStr)) {
        return true;
      }
    }

    for (let val of currCells) {
      visited.add(val);
    }
    return false;
  } else {
    if (x + length > 9) return true;

    const currCells = [];
    for (let checkX = x; checkX <= x + length; checkX++) {
      let shipStr = "" + checkX + y;

      currCells.push(shipStr);
      if (visited.has(shipStr)) {
        return true;
      }
    }

    for (let val of currCells) {
      visited.add(val);
    }
    return false;
  }
}

module.exports = {
  getRandomInt,
  generateRandomShipPlacements,
};
