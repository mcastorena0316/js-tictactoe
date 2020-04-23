const Logic = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];

  const placeMarker = (cell, marker) => {
    boardArray[cell - 1] = marker;
  };

  const winningCombinations = () => {
    const winningArray = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7],
    ];
    return winningArray;
  };

  // eslint-disable-next-line max-len
  const thereIsWinner = (marker) => winningCombinations().some((combination) => combination.every((combinationInner) => boardArray[combinationInner - 1] === marker));

  const tieMove = () => boardArray.every((item) => item !== '');

  const changeTurns = (currentPlayer, player1, player2) => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return currentPlayer;
  };

  const resetGame = () => {
    boardArray = ['', '', '', '', '', '', '', '', ''];
    return boardArray;
  };

  return {
    boardArray, winningCombinations, thereIsWinner, changeTurns, placeMarker, tieMove, resetGame,
  };
});

export default Logic;