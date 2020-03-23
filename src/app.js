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

  const displayBoard = () => {
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', validateData);
    function validateData(e) {

      const playersInput = document.querySelectorAll('.playgame-section .form-control');
      const playersEmptyInput = Array.from(playersInput).filter((item) => {
        return item.value === '';
      });
      function checkMarker(marker) {
        if (marker.value === 'X') {
          document.getElementById('player2-marker').value = 'O';
          document.getElementById('boardgame-section').style.display = 'block';
          document.getElementById('playgame-section').style.display = 'none';
        } else if (marker.value === 'O') {
          document.getElementById('player2-marker').value = 'X';
          document.getElementById('boardgame-section').style.display = 'block';
          document.getElementById('playgame-section').style.display = 'none';
        } else {
          alert("Select a valid marker")
        }
      }

      if (playersEmptyInput.length > 0) {
        alert("Fill all your inputs");
      } else {
        const marker1 = document.getElementById('player1-marker');
        marker1.addEventListener('keyup', checkMarker(marker1));
      }

      e.preventDefault();
    }
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    displayBoard,
  };
};

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();
ui.displayStartGame();
ui.displayBoard();