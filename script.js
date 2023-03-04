// Temporary test functions
function log(msg) {
  console.log(msg);
}
// End temporary test functions

// -------------------- PLAYERS MODULE ------------------------------- //

const players = (function () {
  // selectors
  const submitNamesBtn = document.querySelector(".submit-names");
  const playerOneName = document.querySelector("#playerOneName");
  const playerTwoName = document.querySelector("#playerTwoName");

  // listeners
  submitNamesBtn.addEventListener("click", setPlayerNames);

  // player factory function
  const playerFactory = (name, symbol, currentPlayer) => ({
    name,
    symbol,
    currentPlayer,
  });

  // add players
  function addPlayerOne(name) {
    playerOne = playerFactory(name, "X", true);
  }
  function addPlayerTwo(name) {
    playerTwo = playerFactory(name, "O", false);
  }

  function setPlayerNames(event) {
    event.preventDefault();
    playerOne.name = playerOneName.value;
    playerTwo.name = playerTwoName.value;
    currentView.hideForm();
  }

  // globally accessible
  return {
    addPlayerOne,
    addPlayerTwo,
  };
})();

// temporary player creation
players.addPlayerOne();
players.addPlayerTwo();
// end temporary player creation

// -------------------- GAME MODULE ------------------------------- //

const game = (function () {
  // variables
  const gameArray = ["", "", "", "", "", "", "", "", ""];
  let playerSymbol = playerOne.symbol;

  // player move and put mark on board
  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameArray[index] !== "") {
      log("square is not empty");
    } else {
      gameArray[index] = playerSymbol;
      gameBoard.displayArray();
      endMove();
    }
  }

  function endMove() {
    checkWinningCombo();
    switchPlayer();
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

  // game finishing
  function endGame() {
    // do stuff
    // Temporary stuff
    log("END, restarting");
    setTimeout(() => {
      gameBoard.newGame();
    }, 1000);
    // End Temporary stuff
  }

  // globally accessible
  return {
    addSymbolToBoard,
    gameArray,
  };
})();

// --------------------GAMEBOARD MODULE------------------------------- //
const gameBoard = (function () {
  // selectors and variables
  const container = document.querySelector(".gameBoardContainer");
  const gameArray = game.gameArray;

  // render functions
  function renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    square.textContent = gameArray[arrayItem];
    square.addEventListener("click", game.addSymbolToBoard);
    container.appendChild(square);
  }

  function removeGrid() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function displayArray() {
    removeGrid();
    for (let i = 0; i < gameArray.length; i++) {
      renderSquares(i);
    }
  }

  // resets array to empty values
  function resetArray() {
    for (let i = 0; i < gameArray.length; i++) {
      gameArray[i] = "";
    }
  }

  function newGame() {
    // do stuff
    // Temporary stuff
    resetArray();
    displayArray();
    // End Temporary Stuff
  }
  // globally accessible
  return {
    displayArray,
    newGame,
  };
})();

// -------------------- GAME MODULE ------------------------------- //
const currentView = (function () {
  // selectors and constants
  const playModeContainer = document.querySelector(".playSelect");
  const instruction = document.querySelector(".instruction");
  const announce = document.querySelector(".announce");
  const playerForm = document.querySelector(".playerForm");

  // helper functions
  function updateText(selector, message) {
    selector.textContent = message;
  }
  // create playMode buttons
  function playModeSelection() {
    updateText(instruction, "Pick a gamemode");
    // pvp button
    const pvp = document.createElement("button");
    pvp.textContent = "2 players";
    pvp.className = "pvp";
    pvp.addEventListener("click", showPlayerForm);
    playModeContainer.appendChild(pvp);
    // pvc button
    const pvc = document.createElement("button");
    pvc.textContent = "vs computer";
    pvc.className = "pvc";
    pvc.addEventListener("click", showPlayerForm /* p1 only */);
    playModeContainer.appendChild(pvc);
  }

  function hideForm() {
    playerForm.setAttribute("hidden", "");
  }

  function showPlayerForm() {
    // Temp
    while (playModeContainer.firstChild) {
      playModeContainer.removeChild(playModeContainer.firstChild);
    }

    if (this.className === "pvp") {
      updateText(instruction, "Choose your names");
      playerForm.removeAttribute("hidden");
    } else {
      updateText(instruction, "pvc selected");
    }
    // remove playmode buttons

    // End Temp
  }

  // Temp Render
  playModeSelection();

  // globally accessible
  return {
    playModeSelection,
    hideForm,
  };
})();
