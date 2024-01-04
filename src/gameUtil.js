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
    let shipStr = "";
    for (let checkY = y; checkY < y + length; checkY++) {
      shipStr += x + checkY;
    }
    if (visited.has(shipStr)) {
      return true;
    } else {
      visited.add(shipStr);
      return false;
    }
  } else {
    if (x + length > 9) return true;
    let shipStr = "";
    for (let checkX = x; checkX < x + length; checkX++) {
      shipStr += checkX + y;
    }
    if (visited.has(shipStr)) {
      return true;
    } else {
      visited.add(shipStr);
      return false;
    }
  }
}

module.exports = {
  getRandomInt,
  generateRandomShipPlacements,
};
