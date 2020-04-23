const gameBoard = (() => {
  const renderBoard = (boardArray) => {
    let cell = '';
    for (let i = 1; i <= boardArray.length; i += 1) {
      cell += `<button class="cell cell-${i}" id="cell-${i}">${boardArray[i - 1]}</button>`;
    }
    document.getElementById('display-board').innerHTML = cell;
    return cell;
  };
  return { renderBoard };
})();

export default gameBoard;