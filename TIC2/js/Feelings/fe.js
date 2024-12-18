const nextLevelButton = document.getElementById("next-level");

// Obtiene el nivel actual desde la URL (ejemplo: level1.html)
const currentLevel = parseInt(window.location.pathname.match(/\d+/)?.[0] || 1);
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
    correctImage: `/images/Feelings/correct-image-level${level}.png`, // Imagen correcta (ajústala según el nivel)
    userImage: isCorrect ? `correct-image-level${level}.png` : `incorrect-image-level${level}.png`, // Imagen seleccionada
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
    window.location.href = `level${nextLevel}.html`;
  } else {
    // Redirige a la página de finalización si se completaron todos los niveles
    window.location.href = "/html/Feelings/completion-page.html";
  }
}

// Evento del botón "Next Level"
nextLevelButton.addEventListener("click", goToNextLevel);
