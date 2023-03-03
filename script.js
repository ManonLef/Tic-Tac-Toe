// temp test functions
function log(msg) {
  console.log(msg);
}

// --------------------GAMEBOARD MODULE------------------------------- //
const gameBoard = (function () {
  // selectors and pointers
  const container = document.querySelector(".gameBoardContainer");
  const gameArray = 
  // render
  function renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    square.textContent = game.gameArray[arrayItem];
    square.addEventListener("click", game.addSymbolToBoard);
    container.appendChild(square);
  }
  
  function removeGrid() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function showMoves() {
    for (let i = 0; i < game.gameArray.length; i++) {
      renderSquares(i);
    }
  }

  function resetArray() {
    for (let i = 0; i < game.gameArray.length; i++) {
      game.gameArray[i] = "";
    }
  }

  function newGame() {
    resetArray();
    showMoves();
  }
  // globally accessible
  return {
    showMoves,
    newGame,
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
  const gameArray = ["", "", "", "", "", "", "", "", ""];

  let playerSymbol = playerOne.symbol;

  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameArray[index] !== "") {
      log("square is not empty");
    } else {
      gameArray[index] = playerSymbol;
      gameBoard.showMoves();
      endMove();
    }
  }

  function endMove() {
    checkWinningCombo();
    switchPlayer();
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
    const array = gameArray;
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
      endGame();
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
      endGame();
    }
  }

  function endGame() {
    log("END, restarting");
    setTimeout(() => {
      gameBoard.newGame();
    }, 1200);
  }

  return {
    addSymbolToBoard,
    gameArray,
  };
})();
