// Numbers and their corresponding words
const numbers = [
  { num: 1, word: "one" },
  { num: 2, word: "two" },
  { num: 3, word: "three" },
  { num: 4, word: "four" },
  { num: 5, word: "five" },
  { num: 6, word: "six" },
  { num: 7, word: "seven" },
  { num: 8, word: "eight" },
  { num: 9, word: "nine" },
  { num: 10, word: "ten" },
  { num: 11, word: "eleven" },
  { num: 12, word: "twelve" },
  { num: 13, word: "thirteen" },
  { num: 14, word: "fourteen" },
  { num: 15, word: "fifteen" },
  { num: 16, word: "sixteen" },
  { num: 17, word: "seventeen" },
  { num: 18, word: "eighteen" },
  { num: 19, word: "nineteen" },
  { num: 20, word: "twenty" },
  { num: 30, word: "thirty" },
  { num: 40, word: "forty" },
  { num: 50, word: "fifty" },
  { num: 60, word: "sixty" },
  { num: 70, word: "seventy" },
  { num: 80, word: "eighty" },
  { num: 90, word: "ninety" },
  { num: 100, word: "one hundred" },
  { num: 1000, word: "one thousand" }
];

let currentIndex = 0;
let selectedNumbers = [];

// Shuffle and pick 10 random numbers
function shuffleNumbers() {
  const shuffled = numbers.sort(() => Math.random() - 0.5);
  selectedNumbers = shuffled.slice(0, 10);
}

// Display the current number
const numberElement = document.getElementById("number");
const feedbackElement = document.getElementById("feedback");
const answerInput = document.getElementById("answer");
const restartButton = document.getElementById("restart-button");

function loadNumber() {
  numberElement.textContent = selectedNumbers[currentIndex].num;
  feedbackElement.textContent = "";
  answerInput.value = "";
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = selectedNumbers[currentIndex].word;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Correct! Great job!";
    feedbackElement.style.color = "green";
    
    setTimeout(() => {
      currentIndex++;
      if (currentIndex === Math.floor(selectedNumbers.length / 2)) {
        feedbackElement.textContent = "You're halfway through!";
        feedbackElement.style.color = "blue";
        
        // Continue to the next number after a short delay
        setTimeout(() => {
          loadNumber();
        }, 1000);
      } else if (currentIndex < selectedNumbers.length) {
        loadNumber();
      } else {
        feedbackElement.textContent = "Congratulations! You finished the game. Well done!";
        feedbackElement.style.color = "purple";
        numberElement.textContent = "";
        restartButton.style.display = "block"; // Show the restart button
        restartButton.focus(); // Focus the button for accessibility
      }
    }, 1000);
  } else {
    feedbackElement.textContent = "Oops! Try again. Remember: " + correctAnswer;
    feedbackElement.style.color = "red";
  }
}

function restartGame() {
  currentIndex = 0;
  restartButton.style.display = "none"; // Hide the restart button
  shuffleNumbers();
  loadNumber();
}

// Add keyboard accessibility to the restart button
restartButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    restartGame();
  }
});

// Initialize the game
shuffleNumbers();
loadNumber();
