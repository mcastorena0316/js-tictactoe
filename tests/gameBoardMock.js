const gameBoardMock = (() => {
  const renderBoard = () => {
    let cell = '';
    for (let i = 1; i <= 9; i += 1) {
      cell += `<button class="cell cell-${i}" id="cell-${i}"></button>`;
    }
    return cell;
  };
  return { renderBoard };
})();

export default gameBoardMock;