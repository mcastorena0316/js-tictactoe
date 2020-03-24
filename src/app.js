const UI = () => {
  const displaySection = (clickedBtn, sectionToShow) => {
    const allSections = document.querySelectorAll('.wrapper section');
    const clickedButton = document.getElementById(clickedBtn);
    clickedButton.addEventListener('click', (e) => {
      for (let i = 0; i < allSections.length; i += 1) {
        const { id } = allSections[i];
        if (id === sectionToShow) {
          allSections[i].style.display = 'block';
        } else {
          allSections[i].style.display = 'none';
        }
      }

      e.preventDefault();
    });
  };

  const displayContinueToGame = () => {
    displaySection('start-btn', 'continue-to-game');
  };

  const displayInstruction = () => {
    displaySection('read-instruction-btn', 'read-instruction');
  };

  const returnToContinueToGame = () => {
    displaySection('return-to-continue-btn', 'continue-to-game');
  };

  const displayStartGame = () => {
    displaySection('playgame-btn', 'playgame-section');
  };

  const checkMarker = () => {
    const marker1 = document.getElementById('player1-marker');

    function inputChecker() {
      const x = ['X', 'x'];
      const o = ['O', 'o'];
      if (x.includes(marker1.value)) {
        document.getElementById('player2-marker').value = o[x.indexOf(marker1.value)];
      } else if (o.includes(marker1.value)) {
        document.getElementById('player2-marker').value = x[o.indexOf(marker1.value)];
      } else if (marker1.value === '') {
        document.getElementById('player2-marker').value = '';
      } else {
        alert('Select a valid marker');
      }
    }
    marker1.addEventListener('keyup', inputChecker);
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    checkMarker,
  };
};

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

const gameBoard = (() => {
  const showBoard = () => {
    let cell = '';
    for (let i = 1; i <= 9; i += 1) {
      cell += `<button class="cell cell-${i}" id="cell-${i}"></button>`;
    }
    document.getElementById('display-board').innerHTML = cell;
  };

  return { showBoard };
})();

const TicTacToe = () => {


  const displayBoard = () => {
    function validateData(e) {
      const playersInput = document.querySelectorAll('.playgame-section .form-control');
      const playersEmptyInput = Array.from(playersInput).filter((item) => item.value === '');
      if (playersEmptyInput.length > 0) {
        alert('Fill all your inputs');
      } else {
        gameBoard.showBoard();
        document.getElementById('boardgame-section').style.display = 'block';
        document.getElementById('playgame-section').style.display = 'none';
        const playerOneName = document.getElementById('player1-name').value;
        const playerOneMarker = document.getElementById('player1-marker').value;
        const playerTwoName = document.getElementById('player2-name').value;
        const playerTwoMarker = document.getElementById('player2-marker').value;

        const player1 = Player(playerOneName, playerOneMarker);
        const player2 = Player(playerTwoName, playerTwoMarker);

        const playersInputs = document.querySelectorAll('#boardgame-section .form-control');
        Array.from(playersInputs).forEach((ele) => {
          const { id } = ele;
          ele.innerText = document.querySelector(`.playgame-section #${id}`).value;
        });
      }
      e.preventDefault();
    }
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', validateData);
  };

  return { displayBoard }
};

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();
ui.displayStartGame();
ui.checkMarker();

const tictactoe = TicTacToe();
tictactoe.displayBoard();
