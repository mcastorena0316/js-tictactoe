import GameMock from './gameMock';
import Player from '../src/player';


const player1 = Player('Jim', 'X');
const player2 = Player('Mary', 'O');


const game = GameMock();

test('game should be true', () => {
  expect(game).toBeTruthy();
});