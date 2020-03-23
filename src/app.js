const UI = () => {
  const displaySection = (clickedBtn, sectionToShow) => {
    let allSections = document.querySelectorAll('.wrapper section');
    let clickedButton = document.getElementById(clickedBtn);
    clickedButton.addEventListener('click', function (e) {
      for (let i = 0; i < allSections.length; i++) {
        let id = allSections[i].id;
        if (id === sectionToShow) {
          allSections[i].style.display = 'block';
        } else {
          allSections[i].style.display = 'none';
        }
      }

      e.preventDefault();
    })
  }

  const displayContinueToGame = () => {
    displaySection('start-btn', 'continue-to-game');
  }

  const displayInstruction = () => {
    displaySection('read-instruction-btn', 'read-instruction');
  }

  const returnToContinueToGame = () => {
    displaySection('return-to-continue-btn', 'continue-to-game');
  }

  return { displayContinueToGame, displayInstruction, returnToContinueToGame }
}

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();