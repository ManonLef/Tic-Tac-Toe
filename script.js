// gameBoard Module
const gameBoard = (function () {
  const _gameBoardContents = ["X", "O", "O", "O", "X", "O", "X", "O", "<3"];

  // gameboard creator
  const _container = document.querySelector(".gameBoardContainer");

  // listeners
  document.querySelector("button").addEventListener("click", showMoves);
  // render
  function _renderSquares(arrayItem) {
    const square = document.createElement("div");
    square.setAttribute("data-value", [arrayItem]);
    square.textContent = _gameBoardContents[arrayItem];
    _container.appendChild(square);
  }

  function _emptySquares() {
    while (_container.firstChild) {
      _container.removeChild(_container.firstChild);
    }
  }

  function showMoves() {
    _emptySquares();
    for (let i = 0; i < _gameBoardContents.length; i++) {
      _renderSquares(i);
    }
  }
  // returned
  return {
    showMoves,
  };
})();

const Players = (function () {
  const playerFactory = (name, symbol) => {
    return { name, symbol };
  };

  // selectors
  const playerOneBtn = document.querySelector(".player-one");
  const playerTwoBtn = document.querySelector(".player-two");

  // listeners
  playerOneBtn.addEventListener("click", addPlayerOne);
  playerTwoBtn.addEventListener("click", addPlayerTwo);

  const gameArray = ["X", "O", "O", "O", "X", "O", "X", "O", "<3"];

  function addPlayerOne() {
    return (playerOne = playerFactory(prompt("name?"), prompt("symbol?")));
  }
  function addPlayerTwo() {
    return (playerTwo = playerFactory(prompt("name?"), prompt("symbol?")));
  }

  return {
    playerFactory,
  };
})();
