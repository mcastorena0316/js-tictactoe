<<<<<<< HEAD

=======
>>>>>>> refined-testing
const Player = (name, marker) => {
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;
  // eslint-disable-next-line no-return-assign
  const increaseScore = () => score += 1;
  const getScore = () => score;
  return {
    getName, getMarker, getScore, score, increaseScore,
  };
};

export default Player;