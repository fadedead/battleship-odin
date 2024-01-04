function showGameVsComputer(game, shipPlacements) {
  const content = document.getElementById("content");
  const setupDiv = document.getElementsByClassName("setup-div")[0];
  content.removeChild(setupDiv);

  const gameDiv = getGameDiv(shipPlacements);

  content.appendChild(gameDiv);
}

function getGameDiv(shipPlacements) {
  const gameboardContainer = document.createElement("div");
  gameboardContainer.classList.add("gameboard-container");

  const playerOneBoard = generateBoardOfShipPlacements(shipPlacements);

  const playerTwoBoard = generateEnemyBoard();

  gameboardContainer.appendChild(playerOneBoard);
  gameboardContainer.appendChild(playerTwoBoard);

  return gameboardContainer;
}

function generateBoardOfShipPlacements(shipPlacements) {
  const board = document.createElement("div");
  board.classList.add("board");

  const boardArr = [];
  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 10; col++) {
      const currDiv = document.createElement("div");
      currDiv.classList.add("cell");

      currRow.push(currDiv);
      board.appendChild(currDiv);
    }
    boardArr.push(currRow);
  }

  for (let [row, col, rotation, size] of shipPlacements) {
    size = parseInt(size);
    if (rotation == 0) {
      let currCol = col;
      while (currCol < col + size) {
        boardArr[row][currCol].style.backgroundColor = "gray";
        currCol += 1;
      }
    } else {
      let currRow = row;
      while (currRow < row + size) {
        boardArr[currRow][col].style.backgroundColor = "gray";
        currRow += 1;
      }
    }
  }
  return board;
}

function generateEnemyBoard() {
  const board = document.createElement("div");
  board.classList.add("board");

  const boardArr = [];
  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 10; col++) {
      const currDiv = document.createElement("div");
      currDiv.classList.add("cell");

      currRow.push(currDiv);
      board.appendChild(currDiv);
    }
    boardArr.push(currRow);
  }
  return board;
}

module.exports = { showGameVsComputer };
