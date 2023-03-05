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

  function getCurrentPlayer() {
    if (getPlayerOneTurn()) {
      return getPlayerOneName();
    }
    return getPlayerTwoName();
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
    currentView.hideForm();
    gameBoard.newGame();
    // add view: update top text
  }

  function switchPlayer() {
    if (playerOne.currentPlayer) {
      playerOne.currentPlayer = false;
      playerTwo.currentPlayer = true;
      playerSymbol = playerTwo.symbol;
      currentView.updateText(
        currentView.instruction,
        `it's ${getPlayerTwoName()}'s turn`
      );
    } else {
      playerOne.currentPlayer = true;
      playerTwo.currentPlayer = false;
      playerSymbol = playerOne.symbol;
      currentView.updateText(
        currentView.instruction,
        `it's ${getPlayerOneName()}'s turn`
      );
    }
  }

  // globally accessible
  return {
    getPlayerOneSymbol,
    getPlayerTwoSymbol,
    getPlayerOneTurn,
    getPlayerTwoTurn,
    getCurrentPlayerSymbol,
    getCurrentPlayer,
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
      currentView.updateText(
        currentView.instruction,
        `the winner is ${players.getCurrentPlayer()}`
      );
      gameBoard.removeSquareListeners();
      endGame("win");
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
      endGame("tie");
    } else {
      players.switchPlayer();
    }
  }

  function endMove() {
    checkWinningCombo();
  }

  // game finishing
  function endGame(winOrTie) {
    currentView.showPlayAgain(winOrTie);
  }

  // globally accessible
  return {
    endMove,
    endGame,
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
    const img = document.createElement("img");
    if (gameArray[arrayItem] === "X") {
      img.src = "./notes and resources/cross.svg";
    } else if (gameArray[arrayItem] === "O") {
      img.src = "./notes and resources/circle.svg";
      img.className = "circle";
    }
    square.addEventListener("click", gameBoard.addSymbolToBoard);
    container.appendChild(square);
    square.appendChild(img);
  }

  function removeGrid() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function removeSquareListeners() {
    const squares = container.children;
    for (square of squares) {
      square.removeEventListener("click", gameBoard.addSymbolToBoard);
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
    if (document.querySelector(".overlays").firstChild) {
      document
        .querySelector(".overlays")
        .removeChild(document.querySelector(".overlays").firstChild);
    }
    resetArray();
    displayArray();
    currentView.updateText(
      currentView.instruction,
      `it's ${players.getCurrentPlayer()}'s turn`
    );
  }
  // globally accessible
  return {
    removeGrid,
    displayArray,
    newGame,
    gameArray,
    addSymbolToBoard,
    removeSquareListeners,
  };
})();

// -------------------- UI MODULE ------------------------------- //
const currentView = (function () {
  // selectors and constants
  const instruction = document.querySelector(".instruction");
  const playerForm = document.querySelector(".playerForm");
  const center = document.querySelector(".overlays");
  // helper functions
  function updateText(selector, message) {
    selector.textContent = message;
  }

  // Later feauture: create playMode buttons
  function playModeSelection() {
    updateText(instruction, "Pick a gamemode");
    // pvp button
    const pvp = document.createElement("button");
    pvp.textContent = "START GAME";
    pvp.className = "pvp";
    pvp.addEventListener("click", showPlayerForm);
    center.appendChild(pvp);
    // extra buttons
  }

  function hideForm() {
    playerForm.setAttribute("hidden", "");
  }

  function showPlayerForm() {
    // check for modal
    if (document.querySelector(".overlays").firstChild) {
      document
        .querySelector(".overlays")
        .removeChild(document.querySelector(".overlays").firstChild);
    }

    const modal = document.querySelector(".again-container");
    if (modal) {
      center.remove(modal);
    }

    gameBoard.removeGrid();
    updateText(instruction, "Enter Player Names");
    playerForm.removeAttribute("hidden");
  }

  function showPlayAgain(winOrTie) {
    // container
    const againContainer = document.createElement("div");
    againContainer.className = "again-container";
    center.appendChild(againContainer);

    const playAgain = document.createElement("div");
    playAgain.className = "play-again";
    againContainer.appendChild(playAgain);

    const yes = document.createElement("button");
    const no = document.createElement("button");

    yes.className = "play-again-button";
    no.className = "play-again-button";
    yes.textContent = "YES";
    no.textContent = "NO";

    againContainer.appendChild(yes);
    againContainer.appendChild(no);
    no.addEventListener("click", showPlayerForm);
    yes.addEventListener("click", gameBoard.newGame);

    if (winOrTie === "tie") {
      playAgain.textContent = "Tic Tac TIE! Want to play another game?";
    } else {
      playAgain.textContent = `Tic Tac WIN for ${players.getCurrentPlayer()}. Want to play another game?`;
    }
  }

  // start screen:
  showPlayerForm();

  return {
    hideForm,
    updateText,
    instruction,
    showPlayAgain,
  };
})();
