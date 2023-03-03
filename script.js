// gameBoard Module
const gameBoard = (function () {
  const gameBoardContents = ["", "", "", "", "", "", "", "", ""];

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
    console.log("showmoves running")
    _emptySquares();
    console.log("empty running")
    for (let i = 0; i < 9; i++) {
      _renderSquares(i);
      console.log("rendering " + `$[i]`)
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
    return playerOne = playerFactory(prompt("player one name?"), "X");
  }
  function addPlayerTwo() {
    return playerTwo = playerFactory(prompt("player two name?"), "O");
  }

  return {
    addPlayerOne,
    addPlayerTwo,
  };
})();

const game = (function () {
  // selectors
  const playBtn = document.querySelector(".play");
  // listener
  playBtn.addEventListener("click", startGame);

  function startGame() {
    
    players.addPlayerOne();
    gameBoard.gameBoardContents = ["", "", "", "T", "A", "C", "T", "O", "E"];
    console.log(gameBoard.gameBoardContents);

    gameBoard.showMoves();
    
  }

  function addSymbolToBoard() {
    const index = this.getAttribute("data-value");
    if (gameBoard.gameBoardContents[index] !== "") {
      console.log("not empty");
    } else {
      gameBoard.gameBoardContents[index] = playerOne.symbol;
      console.log(gameBoard.gameBoardContents);
      gameBoard.showMoves();
    }
  }

  return {
    addSymbolToBoard,
    playBtn,
    startGame
  };
})();


gameBoard.showMoves();
