import gameBoardMock from './gameBoardMock';

const game = gameBoardMock.renderBoard();
const newDiv = document.createElement('div');
newDiv.className = 'display-cell';
newDiv.innerHTML = game;

test('should assign id cell-1 as a classlit to first cel', () => {
  const firstCell = newDiv.querySelectorAll('button')[0];
  expect(firstCell.getAttribute('class')).toBe('cell cell-1');
});

test('should assign id cell-9 as a classlit to last cel', () => {
  const lastCell = newDiv.querySelectorAll('button')[8];
  expect(lastCell.getAttribute('class')).toBe('cell cell-9');
});