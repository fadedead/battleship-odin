let game = null;
let playerOneBoard = null;
let playerTwoBoard = null;

function showGameVsComputer(currGame, shipPlacements) {
  game = currGame;
  const content = document.getElementById("content");
  const setupDiv = document.getElementsByClassName("setup-div")[0];
  content.removeChild(setupDiv);

  const gameDiv = getGameDivVsComputer(shipPlacements);
  gameDiv.classList.add("game-div");

  content.appendChild(gameDiv);
}

function getGameDivVsComputer(shipPlacements) {
  const gameboardContainer = document.createElement("div");
  gameboardContainer.classList.add("gameboard-container");

  playerOneBoard = generateBoardOfShipPlacements(shipPlacements);

  playerTwoBoard = generateOpponentBoard();

  gameboardContainer.appendChild(playerOneBoard.board);
  gameboardContainer.appendChild(playerTwoBoard.board);

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
  return { board, boardArr };
}

function generateOpponentBoard() {
  const board = document.createElement("div");
  board.classList.add("board");

  const boardArr = [];
  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 10; col++) {
      const currDiv = document.createElement("div");
      currDiv.classList.add("cell");

      const clickHandler = () => {
        game.playMoveVsComputer([row, col]);
        currDiv.removeEventListener("click", clickHandler);
      };

      currDiv.addEventListener("click", clickHandler);

      currRow.push(currDiv);
      board.appendChild(currDiv);
    }
    boardArr.push(currRow);
  }
  return { board, boardArr };
}

function updatePlayerBoards() {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (game.playerOne.gameboard.getCoordsState([row, col]) == "MISS")
        playerOneBoard.boardArr[row][col].innerText = "X";
      if (game.playerOne.gameboard.getCoordsState([row, col]) == "HIT")
        playerOneBoard.boardArr[row][col].innerText = "H";
      if (game.playerTwo.gameboard.getCoordsState([row, col]) == "MISS")
        playerTwoBoard.boardArr[row][col].innerText = "X";
      if (game.playerTwo.gameboard.getCoordsState([row, col]) == "HIT")
        playerTwoBoard.boardArr[row][col].innerText = "H";
    }
  }
}

function gameFinished(winner) {
  alert(winner);
  location.reload();
}

module.exports = {
  showGameVsComputer,
  gameFinished,
  updatePlayerBoards,
};
