const nextLevelButton = document.getElementById("next-level");

// Obtén el nivel actual desde la URL usando una expresión regular más precisa
const currentLevel = parseInt(window.location.pathname.match(/level(\d+)/)?.[1] || "1", 10);
const totalLevels = 9;

// Inicializa los datos de resultados en localStorage si no existen
if (!localStorage.getItem("gameResults")) {
  localStorage.setItem("gameResults", JSON.stringify([]));
}

// Función para seleccionar una imagen
function selectImage(selectedOption) {
  // Quita selección previa
  document.querySelectorAll('.image-option').forEach(option => {
    option.classList.remove('selected');
  });

  // Marca la imagen seleccionada
  selectedOption.classList.add('selected');

  // Detecta si es correcta o incorrecta
  const isCorrect = selectedOption.querySelector("img").dataset.correct === "true";

  // Guarda la selección en localStorage
  updateGameResults(currentLevel, isCorrect);

  // Habilita el botón Next Level
  nextLevelButton.classList.add("enabled");
  nextLevelButton.disabled = false;
}

// Función para actualizar los resultados en localStorage
function updateGameResults(level, isCorrect) {
  const gameResults = JSON.parse(localStorage.getItem("gameResults"));

  // Actualiza o agrega el resultado del nivel actual
  const levelResult = {
    level,
    correct: isCorrect,
    correctImage: `TIC2/images/Feelings/correctLevel${level}.png`,
    userImage: isCorrect ? `correctLevel${level}.png` : `incorrectLevel${level}.png`,
  };

  // Elimina resultados previos del nivel actual si existen
  const existingIndex = gameResults.findIndex(result => result.level === level);
  if (existingIndex !== -1) {
    gameResults[existingIndex] = levelResult;
  } else {
    gameResults.push(levelResult);
  }

  // Guarda los resultados actualizados
  localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

// Función para redirigir al siguiente nivel
function goToNextLevel() {
  if (currentLevel < totalLevels) {
    const nextLevel = currentLevel + 1;
    const nextLevelUrl = `TIC2/html/Feelings/level${nextLevel}.html`;
    window.location.href = nextLevelUrl;
  } else {
    // Redirige a la página de finalización si se completaron todos los niveles
    window.location.href = "TIC2/html/Feelings/completion-page.html";
  }
}

// Evento del botón "Next Level"
nextLevelButton.addEventListener("click", goToNextLevel);

// Maneja eventos de teclado en las opciones de imagen
function handleKeydown(event, element) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectImage(element);
  }
}

// Maneja eventos de teclado en el botón "Next Level"
function handleNextButtonKeydown(event) {
  if ((event.key === "Enter" || event.key === " ") && !nextLevelButton.disabled) {
    event.preventDefault();
    goToNextLevel();
  }
}
