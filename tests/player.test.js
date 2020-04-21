import Player from '../src/player';

const player1 = Player('Jim', 'X');
const player2 = Player('Mary', 'O');

test('should return the name of the player', () => {
  expect(player1.getName()).toBe('Jim');
  expect(player2.getName()).toBe('Mary');
});

test('should return the marker of the player', () => {
  expect(player1.getMarker()).toBe('X');
  expect(player2.getMarker()).toBe('O');
});