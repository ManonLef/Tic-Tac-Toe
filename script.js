// gameBoard Module
const gameBoard = (function () {
  const _gameBoardContents = ["X", "O", "X", "O", "X", "O", "X", "<3"];
  // render
  function showGame() {
    for (let i = 0; i <= _gameBoardContents.length; i++) {
      console.log(_gameBoardContents[i]);
    }
  }
  // returned
  return {
    showGame,
  };
})();
