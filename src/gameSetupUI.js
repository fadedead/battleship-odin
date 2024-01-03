const ships = {
  2: 4,
  3: 3,
  4: 2,
};

const currState = {};

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

  const buttonsDiv = document.createElement("div");

  setupDiv.appendChild(setupContainer);

  return setupDiv;
}

function getBoard(player) {
  const board = document.createElement("div");
  board.classList.add("board");

  const boardArr = [];
  let isLeft = true;
  let currLength = 3;

  for (let row = 0; row < 10; row++) {
    const currRow = [];
    for (let col = 0; col < 10; col++) {
      const currDiv = document.createElement("div");
      currDiv.classList.add("cell");

      currDiv.addEventListener("click", (e) => {
        handleMouseClick(row, col, currLength, isLeft, boardArr);
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

function handleMouseClick(row, col, currLength, isLeft, boardArr) {
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
  } else {
    let currRow = row;
    while (currRow < row + currLength) {
      boardArr[currRow][col].style.backgroundColor = divColor;
      currRow += 1;
    }
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

module.exports = {
  getGameSetup,
};
