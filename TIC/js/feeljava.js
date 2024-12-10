let currentLevel = 1;
let correctAnswers = 0;
let wrongAnswers = 0;

const levels = [
  { id: 'sad', correct: true, nextLevel: 'happy', instruction: 'She is sad' },
  { id: 'happy', correct: false, nextLevel: 'sad-face', instruction: 'She is happy' },
  { id: 'sad-face', correct: true, nextLevel: 'happy-face', instruction: 'She has a sad face' },
  { id: 'happy-face', correct: false, nextLevel: 'angry-face', instruction: 'She has a happy face' },
  { id: 'angry-face', correct: true, nextLevel: 'excited-face', instruction: 'She is angry' },
  { id: 'excited-face', correct: false, nextLevel: null, instruction: 'She is excited' }
];

document.querySelectorAll('.choice').forEach(img => {
  img.addEventListener('click', (event) => {
    handleChoice(event.target);
  });
});

function handleChoice(selectedImage) {
  if (selectedImage.dataset.level == currentLevel) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  if (levels[currentLevel].nextLevel) {
    showNextLevel(levels[currentLevel].nextLevel);
    updateInstruction(levels[currentLevel].nextLevel); // Actualiza la instrucción
  } else {
    showResults();
  }
}

function showNextLevel(nextLevelId) {
  document.querySelectorAll('.choice').forEach(img => {
    img.style.display = (img.id == nextLevelId) ? 'block' : 'none';
  });

  currentLevel++;
}

function updateInstruction(levelId) {
  const level = levels.find(level => level.id === levelId);
  if (level) {
    document.querySelector('.text-instruction h3').textContent = level.instruction;
  }
}

function showResults() {
  document.querySelector('.message-container').style.display = 'block';
  document.getElementById('correct-answers').textContent = correctAnswers;
  document.getElementById('wrong-answers').textContent = wrongAnswers;
}

function restartGame() {
  currentLevel = 1;
  correctAnswers = 0;
  wrongAnswers = 0;
  document.querySelector('.message-container').style.display = 'none';
  showNextLevel('sad');
  updateInstruction('sad'); // Restablecer la instrucción inicial
}
