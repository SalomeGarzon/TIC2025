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
  { num: 1000, word: "one thousand" },
];

// Game variables
let selectedNumbers = [];
let currentIndex = 0;

// DOM Elements
const numberElement = document.getElementById("number");
const feedbackElement = document.getElementById("feedback");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");
const levelDisplay = document.getElementById("level-display");

// Shuffle numbers and select 10 random ones
function shuffleNumbers() {
  selectedNumbers = [...numbers].sort(() => Math.random() - 0.5).slice(0, 10);
}

// Speak the text
function speakText(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set language to English
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("SpeechSynthesis is not available in this browser.");
  }
}

// Load and display the current number
function loadNumber() {
  const currentNumber = selectedNumbers[currentIndex];
  numberElement.textContent = currentNumber.num; // Display number on screen
  levelDisplay.textContent = `Level: ${currentIndex + 1}`; // Update level display
  feedbackElement.textContent = ""; // Clear feedback
  answerInput.value = ""; // Clear input field
  answerInput.focus(); // Focus the input field

  // Announce level and number
  const announcement = `Level ${currentIndex + 1}. Write the number ${currentNumber.num}.`;
  speakText(announcement);
}

// Check the user's answer
function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = selectedNumbers[currentIndex].word;

  if (userAnswer === correctAnswer) {
    const feedbackText = "Correct! Great job!";
    feedbackElement.textContent = feedbackText;
    feedbackElement.style.color = "green";

    feedbackElement.setAttribute("aria-live", "assertive");
    speakText(feedbackText);

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < selectedNumbers.length) {
        loadNumber();
      } else {
        const finishText = "Congratulations! You finished the game. Well done!";
        feedbackElement.textContent = finishText;
        feedbackElement.style.color = "purple";

        feedbackElement.setAttribute("aria-live", "assertive");
        speakText(finishText);

        numberElement.textContent = "";
        levelDisplay.textContent = ""; // Clear the level display
        restartButton.style.display = "block"; // Show the restart button
        restartButton.focus();
      }
    }, 1000);
  } else {
    const retryText = `Oops! Try again. Remember: ${correctAnswer}`;
    feedbackElement.textContent = retryText;
    feedbackElement.style.color = "red";

    feedbackElement.setAttribute("aria-live", "assertive");
    speakText(retryText);
  }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
  switch (event.key) {
    case "ArrowRight":
      if (document.activeElement === answerInput) {
        submitButton.focus();
      }
      break;

    case "ArrowLeft":
      if (document.activeElement === submitButton) {
        answerInput.focus();
      }
      break;

    case "Enter":
      if (
        document.activeElement === answerInput ||
        document.activeElement === submitButton
      ) {
        checkAnswer();
      }
      break;

    default:
      break;
  }
}

// Restart the game
function restartGame() {
  currentIndex = 0;
  levelDisplay.textContent = "Level: 1"; // Reset level display
  restartButton.style.display = "none"; // Hide the restart button
  shuffleNumbers();
  loadNumber();
}

// Add keyboard event listener
document.addEventListener("keydown", handleKeyboardNavigation);

// Initialize the game
shuffleNumbers();
loadNumber();
