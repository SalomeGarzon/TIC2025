let currentLevel = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let feedback = [];

const levels = [
  { id: 'sad', correct: true, instruction: 'She is sad' },
  { id: 'happy', correct: false, instruction: 'She is happy' },
  { id: 'sad-face', correct: true, instruction: 'She has a sad face' },
  { id: 'happy-face', correct: false, instruction: 'She has a happy face' },
  { id: 'angry-face', correct: true, instruction: 'She is angry' },
  { id: 'excited-face', correct: false, instruction: 'She is excited' },
  { id: 'big', correct: true, instruction: 'It is big' },
  { id: 'small', correct: false, instruction: 'It is small' },
  { id: 'old', correct: true, instruction: 'He is old' },
  { id: 'young', correct: false, instruction: 'He is young' }
];

document.querySelectorAll('.choice').forEach(img => {
  img.addEventListener('click', (event) => {
    handleChoice(event.target);
  });
});

function handleChoice(selectedImage) {
  const level = levels[currentLevel];
  const isCorrect = selectedImage.id === level.id;

  if (isCorrect) {
    correctAnswers++;
    feedback.push(`Level ${currentLevel + 1}: Correct! ${level.instruction}`);
  } else {
    wrongAnswers++;
    feedback.push(`Level ${currentLevel + 1}: Incorrect. Correct answer: ${level.instruction}`);
  }

  currentLevel++;

  if (currentLevel < levels.length) {
    showNextLevel(levels[currentLevel].id);
    updateInstruction(levels[currentLevel].instruction);
  } else {
    showResults();
  }
}

function showNextLevel(nextLevelId) {
  document.querySelectorAll('.choice').forEach(img => {
    img.style.display = img.id === nextLevelId ? 'block' : 'none';
  });
}

function updateInstruction(instruction) {
  document.querySelector('.text-instruction h3').textContent = instruction;
}

function showResults() {
  const messageContainer = document.querySelector('.message-container');
  messageContainer.style.display = 'block';
  
  document.getElementById('correct-answers').textContent = correctAnswers;
  document.getElementById('wrong-answers').textContent = wrongAnswers;

  const feedbackList = document.createElement('ul');
  feedback.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    feedbackList.appendChild(listItem);
  });

  messageContainer.appendChild(feedbackList);
}

function restartGame() {
  currentLevel = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  feedback = [];

  document.querySelector('.message-container').style.display = 'none';
  document.querySelector('.message-container ul')?.remove(); // Elimina la lista de feedback anterior

  showNextLevel(levels[0].id);
  updateInstruction(levels[0].instruction);
}
