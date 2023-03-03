// temp test functions
function log(msg) {
  console.log(msg);
}
// --------------------GAMOEBOARD MODULE------------------------------- //
const gameBoard = (function () {
  const gameBoardContents = ["", "I", "", "", "A", "", "", "O", ""];

  // gameboard creator
  const _container = document.querySelector(".gameBoardContainer");

  // render
  function _renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    square.textContent = gameBoardContents[arrayItem];
    square.addEventListener("click", game.addSymbolToBoard);
    _container.appendChild(square);
  }

  function _emptySquares() {
    while (_container.firstChild) {
      _container.removeChild(_container.firstChild);
    }
  }

  function showMoves() {
    _emptySquares();
    for (let i = 0; i < 9; i++) {
      _renderSquares(i);
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
  const playerFactory = (name, symbol) => {
    return { name, symbol };
  };

  function addPlayerOne() {
    return (playerOne = playerFactory("Manon", "X"));
  }
  function addPlayerTwo() {
    return (playerTwo = playerFactory("You", "O"));
  }

  return {
    addPlayerOne,
    addPlayerTwo,
  };
})();

// --------------------GAME MODULE------------------------------- //

const game = (function () {
  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameBoard.gameBoardContents[index] !== "") {
      log("square is not empty")
    } else {
      gameBoard.gameBoardContents[index] = playerOne.symbol;
      gameBoard.showMoves();
    }
  }

  return {
    addSymbolToBoard,
  };
})();

gameBoard.showMoves();
players.addPlayerOne();
players.addPlayerTwo();
