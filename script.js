// temp test functions
function log(msg) {
  console.log(msg);
}
// --------------------GAMOEBOARD MODULE------------------------------- //
const gameBoard = (function () {
  const gameBoardContents = ["", "", "", "", "", "", "", "", ""];

  // selectors
  const startButton = document.querySelector(".start");

  // listener
  startButton.addEventListener("click", showMoves)

  // gameboard creator
  const container = document.querySelector(".gameBoardContainer");

  // render
  function renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    square.textContent = gameBoardContents[arrayItem];
    square.addEventListener("click", game.addSymbolToBoard);
    container.appendChild(square);
  }

  function emptySquares() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function showMoves() {
    emptySquares();
    for (let i = 0; i < gameBoardContents.length; i++) {
      renderSquares(i);
    }
  }
  // returned
  return {
    showMoves,
    gameBoardContents,
  };
})();

// --------------------PLAYERS MODULE------------------------------- //

const players = (function () {
  // player factory function
  const playerFactory = (name, symbol, currentPlayer) => {
    return { name, symbol, currentPlayer };
  };

  function addPlayerOne() {
    playerOne = playerFactory("Manon", "X", true);
  }
  function addPlayerTwo() {
    playerTwo = playerFactory("You", "O", false);
  }

  return {
    addPlayerOne,
    addPlayerTwo,
  };
})();

players.addPlayerOne();
players.addPlayerTwo();
// --------------------GAME MODULE------------------------------- //

const game = (function () {
  let playerSymbol = playerOne.symbol;

  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameBoard.gameBoardContents[index] !== "") {
      log("square is not empty");
    } else {
      gameBoard.gameBoardContents[index] = playerSymbol;
      gameBoard.showMoves();
      checkWinningCombo();
      switchPlayer();
    }
  }

  // player Switch

  function switchPlayer() {
    if (playerOne.currentPlayer) {
      playerOne.currentPlayer = false;
      playerTwo.currentPlayer = true;
      playerSymbol = playerTwo.symbol;
    } else {
      playerOne.currentPlayer = true;
      playerTwo.currentPlayer = false;
      playerSymbol = playerOne.symbol;
    }
  }

  function checkWinningCombo() {
    const array = gameBoard.gameBoardContents;
    if (
      // horizontal win conditions
      (array[0] === array[1] && array[0] === array[2] && array[0] !== "") ||
      (array[3] === array[4] && array[3] === array[5] && array[3] !== "") ||
      (array[6] === array[7] && array[6] === array[8] && array[6] !== "") ||
      // vertical win conditions
      (array[0] === array[3] && array[0] === array[6] && array[0] !== "") ||
      (array[1] === array[4] && array[1] === array[7] && array[1] !== "") ||
      (array[2] === array[5] && array[2] === array[8] && array[2] !== "") ||
      // diagonal win conditions
      (array[0] === array[4] && array[0] === array[8] && array[0] !== "") ||
      (array[2] === array[4] && array[2] === array[6] && array[2] !== "")
    ) {
      log("we have a winner");
      if (playerOne.currentPlayer) {
        log(`the winner is ${playerOne.name}`);
      } else {
        log(`the winner is ${playerTwo.name}`);
      }
    } else if (
      (array[0] &&
        array[1] &&
        array[2] &&
        array[3] &&
        array[4] &&
        array[5] &&
        array[6] &&
        array[7] &&
        array[8]) !== ""
    ) {
      log("It's a TIE");
    }
  }

  return {
    addSymbolToBoard,
  };
})();

//gameBoard.showMoves();
