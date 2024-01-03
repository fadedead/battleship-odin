const { shipsAvailable } = require("./config");

function getGameSetup(player) {
  const setupDiv = document.createElement("div");
  setupDiv.classList.add("setup-div");

  const setupContainer = document.createElement("div");
  setupContainer.classList.add("setup-container");

  const board = getBoard(player);
  setupContainer.appendChild(board);

  const shipsDiv = document.createElement("div");
  const ships = getShips();
  setupContainer.appendChild(shipsDiv);

  const buttonsDiv = getButtons();

  setupDiv.appendChild(setupContainer);
  setupDiv.appendChild(buttonsDiv);

  return setupDiv;
}

function getBoard() {
  const board = document.createElement("div");
  board.classList.add("board");

  const shipsToBePlaced = { ...shipsAvailable };
  const boardArr = [];
  const shipPostions = [];
  let isLeft = true;
  let currLength = parseInt(Object.keys(shipsToBePlaced)[0]);

  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 10; col++) {
      const currDiv = document.createElement("div");
      currDiv.classList.add("cell");

      currDiv.addEventListener("click", () => {
        handleMouseClick(row, col, currLength, isLeft, boardArr, shipPostions);
        currLength = handleShipToPlace(shipsToBePlaced, currLength);
        if (currLength === "END") alert("done");
      });

      currDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        isLeft = !isLeft;
        clearUnfilledCells(boardArr);
      });

      currDiv.addEventListener("mouseover", () => {
        handleMouseOver(row, col, currLength, isLeft, boardArr);
      });

      currDiv.addEventListener("mouseleave", () => {
        handleMouseLeave(row, col, currLength, isLeft, boardArr);
      });

      currRow.push(currDiv);
      board.appendChild(currDiv);
    }
    boardArr.push(currRow);
  }

  return board;
}

function clearUnfilledCells(boardArr) {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (boardArr[row][col].style.backgroundColor !== "black") {
        boardArr[row][col].style.backgroundColor = "white";
      }
    }
  }
}

function handleShipToPlace(shipsToBePlaced, currLength) {
  shipsToBePlaced[currLength] -= 1;
  if (shipsToBePlaced[currLength] > 0) return currLength;
  else {
    delete shipsToBePlaced[currLength];
    return parseInt(Object.keys(shipsToBePlaced)[0]) || "END";
  }
}

function handleMouseClick(
  row,
  col,
  currLength,
  isLeft,
  boardArr,
  shipPostions,
) {
  if (
    boardArr[row][col].style.backgroundColor === "red" ||
    boardArr[row][col].style.backgroundColor === "black"
  )
    return;

  let divColor = "black";

  if (isLeft) {
    let currCol = col;
    while (currCol < col + currLength) {
      boardArr[row][currCol].style.backgroundColor = divColor;
      currCol += 1;
    }
    shipPostions.push([row, col, 0, currLength]);
  } else {
    let currRow = row;
    while (currRow < row + currLength) {
      boardArr[currRow][col].style.backgroundColor = divColor;
      currRow += 1;
    }

    shipPostions.push([row, col, 1, currLength]);
  }
}

function handleMouseOver(row, col, currLength, isLeft, boardArr) {
  let divColor = "green";

  if (isLeft) {
    if (col + currLength > 10) divColor = "red";

    let currCol = col;
    while (currCol < 10 && currCol < col + currLength) {
      if (boardArr[row][currCol].style.backgroundColor === "black") {
        divColor = "red";
      }
      currCol += 1;
    }

    currCol = col;
    while (currCol < 10 && currCol < col + currLength) {
      if (boardArr[row][currCol].style.backgroundColor !== "black")
        boardArr[row][currCol].style.backgroundColor = divColor;
      currCol += 1;
    }
  } else {
    if (row + currLength > 10) divColor = "red";

    let currRow = row;
    while (currRow < 10 && currRow < row + currLength) {
      if (boardArr[currRow][col].style.backgroundColor === "black") {
        divColor = "red";
      }
      currRow += 1;
    }

    currRow = row;
    while (currRow < 10 && currRow < row + currLength) {
      if (boardArr[currRow][col].style.backgroundColor !== "black")
        boardArr[currRow][col].style.backgroundColor = divColor;
      currRow += 1;
    }
  }
}

function handleMouseLeave(row, col, currLength, isLeft, boardArr) {
  let divColor = "white";

  if (isLeft) {
    let currCol = col;
    while (currCol < 10 && currCol < col + currLength) {
      if (boardArr[row][currCol].style.backgroundColor !== "black")
        boardArr[row][currCol].style.backgroundColor = divColor;
      currCol += 1;
    }
  } else {
    let currRow = row;
    while (currRow < 10 && currRow < row + currLength) {
      if (boardArr[currRow][col].style.backgroundColor !== "black")
        boardArr[currRow][col].style.backgroundColor = divColor;
      currRow += 1;
    }
  }
}

function getShips() {}

function getButtons() {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const start = document.createElement("button");
  start.innerText = "Start";
  start.classList.add("setup-button");

  start.addEventListener("click", () => {});

  buttonsContainer.appendChild(start);

  const reset = document.createElement("button");

  reset.innerText = "Reset";
  reset.classList.add("setup-button");

  reset.addEventListener("click", () => {
    const setupContainer =
      document.getElementsByClassName("setup-container")[0];
    const board = document.getElementsByClassName("board")[0];

    setupContainer.removeChild(board);

    const newBoard = getBoard();
    setupContainer.appendChild(newBoard);
  });

  buttonsContainer.appendChild(reset);

  return buttonsContainer;
}

module.exports = {
  getGameSetup,
};
