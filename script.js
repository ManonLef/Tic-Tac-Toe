// gameBoard Module
const gameBoard = (function () {
  const gameBoardContents = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

  // gameboard creator
  const _container = document.querySelector(".gameBoardContainer");

  // listeners
  document.querySelector("button").addEventListener("click", showMoves);
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
    for (let i = 0; i < gameBoardContents.length; i++) {
      _renderSquares(i);
    }
  }
  // returned
  return {
    showMoves,
    gameBoardContents,
  };
})();

const players = (function () {
  const playerFactory = (name, symbol) => {
    return { name, symbol };
  };

  // selectors
  const playerOneBtn = document.querySelector(".player-one");
  const playerTwoBtn = document.querySelector(".player-two");

  // listeners
  playerOneBtn.addEventListener("click", addPlayerOne);
  playerTwoBtn.addEventListener("click", addPlayerTwo);

  function addPlayerOne() {
   (playerOne = playerFactory(prompt("name?"), "X"));
  }
  function addPlayerTwo() {
    return (playerTwo = playerFactory(prompt("name?"), "O"));
  }
})();




const game = (function () {
  // selectors

  // listener test

  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (this.textContent) {
      console.log("not empty");
    } else {
      gameBoard.gameBoardContents[index] = playerOne.symbol;
      console.log(gameBoard.gameBoardContents);
      gameBoard.showMoves();
    }
  }

  return {
    addSymbolToBoard,
  };
})();
