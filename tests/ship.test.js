const { Ship } = require("../src/ship");

const ship = new Ship(3);

test("Ship is being hit", () => {
  ship.tookHit();
  expect(ship.timesHit).toBe(1);
});

test("Ship is being hit 2nd time", () => {
  ship.tookHit();
  expect(ship.timesHit).toBe(2);
});

test("Ship is sunk", () => {
  const currShip = new Ship(3);
  currShip.tookHit();
  currShip.tookHit();
  currShip.tookHit();
  expect(currShip.isSunk()).toBe(true);
});
