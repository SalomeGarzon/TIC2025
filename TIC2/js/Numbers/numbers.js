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

// Variables del juego
let selectedNumbers = [];
let currentIndex = 0;

// Elementos del DOM
const numberElement = document.getElementById("number");
const feedbackElement = document.getElementById("feedback");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");

// Función para seleccionar 10 números aleatorios
function shuffleNumbers() {
  selectedNumbers = [...numbers].sort(() => Math.random() - 0.5).slice(0, 10);
}

// Función para hablar el texto
function speakText(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Idioma inglés
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("SpeechSynthesis no está disponible en este navegador.");
  }
}

// Mostrar y pronunciar el número actual
function loadNumber() {
  const currentNumber = selectedNumbers[currentIndex];
  numberElement.textContent = currentNumber.num; // Mostrar número en pantalla
  feedbackElement.textContent = ""; // Limpiar retroalimentación
  answerInput.value = ""; // Limpiar entrada de respuesta
  answerInput.focus(); // Enfocar el campo de texto al cargar un número

  // Actualizar atributo aria-live para que el lector de pantalla anuncie el número
  numberElement.setAttribute("aria-live", "assertive");
  speakText(currentNumber.num.toString()); // Pronunciar número
}

// Verificar la respuesta
function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = selectedNumbers[currentIndex].word;

  if (userAnswer === correctAnswer) {
    const feedbackText = "Correct! Great job!";
    feedbackElement.textContent = feedbackText;
    feedbackElement.style.color = "green";

    // Actualizar aria-live para lectores de pantalla
    feedbackElement.setAttribute("aria-live", "assertive");
    speakText(feedbackText); // Reproducir retroalimentación

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < selectedNumbers.length) {
        loadNumber();
      } else {
        const finishText = "Congratulations! You finished the game. Well done!";
        feedbackElement.textContent = finishText;
        feedbackElement.style.color = "purple";

        // Actualizar aria-live para lectores de pantalla
        feedbackElement.setAttribute("aria-live", "assertive");
        speakText(finishText); // Reproducir mensaje final

        numberElement.textContent = "";
        restartButton.style.display = "block"; // Mostrar botón de reinicio
        restartButton.focus(); // Enfocar el botón para accesibilidad
      }
    }, 1000);
  } else {
    const retryText = `Oops! Try again. Remember: ${correctAnswer}`;
    feedbackElement.textContent = retryText;
    feedbackElement.style.color = "red";

    // Actualizar aria-live para lectores de pantalla
    feedbackElement.setAttribute("aria-live", "assertive");
    speakText(retryText); // Reproducir retroalimentación negativa
  }
}

// Manejar eventos del teclado
function handleKeyboardNavigation(event) {
  switch (event.key) {
    case "ArrowRight":
      // Mover al botón de submit desde el campo de entrada
      if (document.activeElement === answerInput) {
        submitButton.focus();
      }
      break;

    case "ArrowLeft":
      // Mover al campo de entrada desde el botón de submit
      if (document.activeElement === submitButton) {
        answerInput.focus();
      }
      break;

    case "Enter":
      // Si el foco está en el campo de entrada o el botón, verificar la respuesta
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

// Reiniciar el juego
function restartGame() {
  currentIndex = 0;
  restartButton.style.display = "none"; // Ocultar botón de reinicio
  shuffleNumbers();
  loadNumber();
}

// Agregar eventos de teclado al documento
document.addEventListener("keydown", handleKeyboardNavigation);

// Inicializar el juego
shuffleNumbers();
loadNumber();