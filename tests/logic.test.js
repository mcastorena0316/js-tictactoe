import Logic from '../src/logic';

const logic = Logic();

test('should place a marker on the board cell', () => {
  logic.placeMarker(1, 'O');
  expect(logic.boardArray).toStrictEqual(['O', '', '', '', '', '', '', '', '']);
  logic.resetGame();
});

test('should check for no empty cells', () => {

  [1, 2, 4, 5, 8].forEach((item) => {
    return logic.placeMarker(item - 1, 'X');
  });

  [3, 6, 7, 9].forEach((item) => {
    logic.placeMarker(item - 1, 'O');
  });

  expect(logic.isEmpty()).toBe(false);
  logic.resetGame();
});

test('should check for filled cells', () => {
  [1, 2, 4].forEach((item) => {
    logic.placeMarker(item, 'X');
  });

  [3, 6].forEach((item) => {
    logic.placeMarker(item, 'O');
  });

  expect(logic.getFilledCell()).toStrictEqual([1, 2, 3, 4, 6]);
  logic.resetGame();
});

test('should reset the game', () => {
  [3, 6, 8, 7].forEach((item) => {
    logic.placeMarker(item, 'O');
  });

  logic.resetGame();
  expect(logic.isEmpty()).toBe(true);
});

test('check if a player won', () => {
  logic.winningCombinations();

  // [1, 2, 3].forEach((item) => {
  //   logic.placeMarker(item - 1, 'O');
  // });
  logic.boardArray = ['O', 'O', 'O', '', '', '', '', '', ''];
  expect(logic.thereIsWinner('O')).toBe(true);
  logic.resetGame();

  // // By column
  // [2, 5, 8].forEach((item) => {
  //   logic.placeMarker(item - 1, 'X');
  // });
  // expect(logic.thereIsWinner('X')).toBe(true);
  // logic.resetGame();

  // // By diagonal
  // [3, 5, 7].forEach((item) => {
  //   logic.placeMarker(item - 1, 'X');
  // });
  // expect(logic.thereIsWinner('X')).toBe(true);
  // logic.resetGame();
});


test('check if a game is tie', () => {
  logic.tieMove();
  expect(logic.tieMove()).toBe(true);
});