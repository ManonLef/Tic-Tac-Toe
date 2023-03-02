// gameBoard Module
const gameBoard = (function () {
  const _gameBoardContents = ["X", "O", "", "O", "X", "O", "X", "O", "<3"];

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
  function showMoves() {
    for (let i = 0; i < _gameBoardContents.length; i++) {
      _renderSquares(i);
    }
  }
  // returned
  return {
    showMoves,
  };
})();
