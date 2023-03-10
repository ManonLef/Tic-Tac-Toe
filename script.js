const players = (function () {
  const submitNamesBtn = document.querySelector(".submit-names");
  const playerOneName = document.querySelector(".player-one-name");
  const playerTwoName = document.querySelector(".player-two-name");

  submitNamesBtn.addEventListener("click", setPlayerNames);

  const playerFactory = (name, symbol, currentPlayer) => ({
    name,
    symbol,
    currentPlayer,
  });

  const playerOne = playerFactory("Player 1", "X", true);
  const playerTwo = playerFactory("Player 2", "O", false);

  const getPlayerOneName = () => playerOne.name;
  const getPlayerTwoName = () => playerTwo.name;

  const getPlayerOneSymbol = () => playerOne.symbol;
  const getPlayerTwoSymbol = () => playerTwo.symbol;

  const getPlayerOneTurn = () => playerOne.currentPlayer;

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
    view.hideForm();
    game.newGame();
    
    playerOneName.value = "";
    playerTwoName.value = "";
  }

  function switchPlayer() {
    if (getPlayerOneTurn()) {
      playerOne.currentPlayer = false;
      playerTwo.currentPlayer = true;
    } else {
      playerOne.currentPlayer = true;
      playerTwo.currentPlayer = false;
    }
    view.updateText(`it's ${getCurrentPlayer()}'s turn`);
  }

  return {
    getCurrentPlayerSymbol,
    getCurrentPlayer,
    switchPlayer,
  };
})();

const game = (function () {
  function newGame() {
    if (document.querySelector(".overlays").firstChild) {
      document
        .querySelector(".overlays")
        .removeChild(document.querySelector(".overlays").firstChild);
    }
    gameBoard.resetArray();
    gameBoard.displayArray();
    view.updateText(`it's ${players.getCurrentPlayer()}'s turn`);
  }

  function endGame(winOrTie) {
    view.showPlayAgain(winOrTie);
  }

  return {
    newGame,
    endGame,
  };
})();

const gameBoard = (function () {
  const container = document.querySelector(".gameboard-container");
  const gameArray = ["", "", "", "", "", "", "", "", ""];

  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameArray[index] !== "") {
      // do nothing
    } else {
      gameArray[index] = players.getCurrentPlayerSymbol();
      displayArray();
      checkWinningCombo();
    }
  }

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
    square.addEventListener("click", addSymbolToBoard);
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
      square.removeEventListener("click", addSymbolToBoard);
    }
  }

  function displayArray() {
    removeGrid();
    for (let i = 0; i < gameArray.length; i++) {
      renderSquares(i);
    }
  }

  function resetArray() {
    for (let i = 0; i < gameArray.length; i++) {
      gameArray[i] = "";
    }
  }

  function checkWinningCombo() {
    const array = gameArray;
    if (
      (array[0] === array[1] && array[0] === array[2] && array[0] !== "") ||
      (array[3] === array[4] && array[3] === array[5] && array[3] !== "") ||
      (array[6] === array[7] && array[6] === array[8] && array[6] !== "") ||
      (array[0] === array[3] && array[0] === array[6] && array[0] !== "") ||
      (array[1] === array[4] && array[1] === array[7] && array[1] !== "") ||
      (array[2] === array[5] && array[2] === array[8] && array[2] !== "") ||
      (array[0] === array[4] && array[0] === array[8] && array[0] !== "") ||
      (array[2] === array[4] && array[2] === array[6] && array[2] !== "")
    ) {
      view.updateText(`the winner is ${players.getCurrentPlayer()}`);
      gameBoard.removeSquareListeners();
      game.endGame("win");
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
      game.endGame("tie");
    } else {
      players.switchPlayer();
    }
  }

  return {
    resetArray,
    removeGrid,
    displayArray,
    removeSquareListeners,
    checkWinningCombo,
  };
})();

const view = (function () {
  const topMessage = document.querySelector(".top-message");
  const playerForm = document.querySelector(".player-form");
  const center = document.querySelector(".overlays");
  const modal = document.querySelector(".replay-container");

  function updateText(message) {
    topMessage.textContent = message;
  }

  function hideForm() {
    playerForm.setAttribute("hidden", "");
  }

  function showPlayerForm() {
    if (center.firstChild) {
      center.removeChild(center.firstChild);
    }
    if (modal) {
      center.remove(modal);
    }
    gameBoard.removeGrid();
    updateText("Enter Player Names");
    playerForm.removeAttribute("hidden");
  }

  function showPlayAgain(winOrTie) {
    const againContainer = document.createElement("div");
    againContainer.className = "replay-container";
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
    yes.addEventListener("click", game.newGame);

    if (winOrTie === "tie") {
      playAgain.textContent = "Tic Tac TIE! Want to play another game?";
    } else {
      playAgain.textContent = `Tic Tac WIN for ${players.getCurrentPlayer()}. Want to play another game?`;
    }
  }

  showPlayerForm();

  return {
    hideForm,
    updateText,
    showPlayAgain,
  };
})();

// WROTE THIS INCLUDING PVC MODE FOR A LATER FEATURE.
// Location: view
// function playModeSelection() {
//   updateText(topMessage, "Pick a gamemode");
//   const pvp = document.createElement("button");
//   pvp.textContent = "START GAME";
//   pvp.className = "pvp";
//   pvp.addEventListener("click", showPlayerForm);
//   center.appendChild(pvp);
// }
