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
  const playerOne = playerFactory("Player 1", "X", true);
  const playerTwo = playerFactory("Player 2", "O", false);

  const getPlayerOneName = () => playerOne.name;
  const getPlayerTwoName = () => playerTwo.name;

  const getPlayerOneSymbol = () => playerOne.symbol;
  const getPlayerTwoSymbol = () => playerTwo.symbol;

  const getPlayerOneTurn = () => playerOne.currentPlayer;
  const getPlayerTwoTurn = () => playerTwo.currentPlayer;

  function getCurrentPlayerSymbol() {
    if (getPlayerOneTurn()) {
      return getPlayerOneSymbol();
    }
    return getPlayerTwoSymbol();
  }

  // Set names set on form or revert to default player names
  function setPlayerNames(event) {
    event.preventDefault();
    if (playerOneName.value !== "" && playerTwoName.value !== "") {
      playerOne.name = playerOneName.value;
      playerTwo.name = playerTwoName.value;
    } else if (playerOneName.value === "" && playerTwoName.value !== "") {
      playerOne.name = "Player 1";
      playerTwo.name = playerTwoName.value;
    } else if (playerOneName.value !== "" && playerTwoName.value === "") {
      playerOne.name = playerOneName.value;
      playerTwo.name = "Player 2";
    }
    currentView.updateText(currentView.instruction, "Game in Progress");

    currentView.hideForm();
    gameBoard.newGame();
    // add view: update top text
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

  // globally accessible
  return {
    getPlayerOneName,
    getPlayerTwoName,
    getPlayerOneSymbol,
    getPlayerTwoSymbol,
    getPlayerOneTurn,
    getPlayerTwoTurn,
    getCurrentPlayerSymbol,
    switchPlayer,
  };
})();

// -------------------- GAME MODULE ------------------------------- //
const game = (function () {
  function checkWinningCombo() {
    const array = gameBoard.gameArray;
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
      if (players.getPlayerOneTurn()) {
        currentView.updateText(
          currentView.instruction,
          `${players.getPlayerOneName()} won this game`
        );
      } else {
        log(`the winner is ${players.getPlayerTwoName()}`);
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

  function endMove() {
    checkWinningCombo();
    players.switchPlayer();
  }

  // game finishing
  function endGame() {
    setTimeout(() => {
      gameBoard.newGame();
    }, 1000);
  }

  // globally accessible
  return {
    endMove,
  };
})();

// --------------------GAMEBOARD MODULE------------------------------- //
const gameBoard = (function () {
  // selectors and variables
  const container = document.querySelector(".gameBoardContainer");
  // variables
  const gameArray = ["", "", "", "", "", "", "", "", ""];

  // player move and put mark on board
  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameArray[index] !== "") {
      log("square is not empty");
    } else {
      gameArray[index] = players.getCurrentPlayerSymbol();
      displayArray();
      game.endMove();
    }
  }

  // render functions
  function renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    const img = document.createElement("img")
    if (gameArray[arrayItem] === "X") {
      img.src = "./notes and resources/cross.svg"
    } else if (gameArray[arrayItem] === "O") {
      img.src = "./notes and resources/circle.svg"
      img.className = "circle";
    }
    square.addEventListener("click", gameBoard.addSymbolToBoard);
    container.appendChild(square);
    square.appendChild(img)
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
    gameArray,
    addSymbolToBoard,
  };
})();

// -------------------- UI MODULE ------------------------------- //
const currentView = (function () {
  // selectors and constants
  const instruction = document.querySelector(".instruction");
  const playerForm = document.querySelector(".playerForm");
  const center = document.querySelector(".overlays")
  // helper functions
  function updateText(selector, message) {
    selector.textContent = message;
  }

  // feauture: create playMode buttons
  function playModeSelection() {
    updateText(instruction, "Pick a gamemode");
    // pvp button
    const pvp = document.createElement("button");
    pvp.textContent = "START GAME";
    pvp.className = "pvp";
    pvp.addEventListener("click", showPlayerForm);
    center.appendChild(pvp);
  }

  function hideForm() {
    playerForm.setAttribute("hidden", "");
  }

  function showPlayerForm() {
    updateText(instruction, "Enter PLayer Names");
    playerForm.removeAttribute("hidden");
  }

showPlayerForm()
  return {
    hideForm,
    updateText,
    instruction,
  };
})();
