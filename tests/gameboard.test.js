const { Gameboard } = require("../src/gameboard");

test("Ship placed at 0 0 with roation 0 should have a ship at 0 0", () => {
  const gameboard = new Gameboard();
  const coords = [0, 0];
  const rotation = 0;
  const size = 3;
  gameboard.placeShip(coords, rotation, size);
  expect(gameboard.getCoordsState(coords)).toBe("SHIP");
});

test("Ship placed at 0 0 with rotation 1 should be present at 2 0", () => {
  const gameboard = new Gameboard();
  const coords = [0, 0];
  const shipEndCoords = [2, 0];
  const rotation = 1;
  const size = 3;
  gameboard.placeShip(coords, rotation, size);
  expect(gameboard.getCoordsState(coords)).toBe("SHIP");
  expect(gameboard.getCoordsState(shipEndCoords)).toBe("SHIP");
});

test("Ship placed at 0 0 with rotation 0 should be hit at 0, 1", () => {
  const gameboard = new Gameboard();
  const coords = [0, 0];
  const rotation = 0;
  const size = 3;
  gameboard.placeShip(coords, rotation, size);

  const attackCoords = [0, 1];
  gameboard.receiveAttack(attackCoords);
  expect(gameboard.getCoordsState(attackCoords)).toBe("HIT");
});

test("Ship placed at 0 0 with rotaion 0 should not get hit at coord 4, 4", () => {
  const gameboard = new Gameboard();
  const coords = [0, 0];
  const rotation = 0;
  const size = 3;
  gameboard.placeShip(coords, rotation, size);

  const attackCoords = [4, 4];
  gameboard.receiveAttack(attackCoords);
  expect(gameboard.getCoordsState(attackCoords)).toBe("MISS");
});

test("When all ships are sunk game is over", () => {
  const gameboard = new Gameboard();
  const coords = [0, 0];
  const rotation = 0;
  const size = 3;
  gameboard.placeShip(coords, rotation, size);

  const attackCoords = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];

  attackCoords.forEach((val) => gameboard.receiveAttack(val));
  expect(gameboard.checkIsGameOver()).toBe(true);
});
