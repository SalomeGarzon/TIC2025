// Obtener resultados del juego desde localStorage
const gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];

// Mostrar resultados en la página
document.addEventListener("DOMContentLoaded", () => {
  const errorList = document.getElementById("error-list");
  const correctList = document.getElementById("correct-list");

  gameResults.forEach((result) => {
    if (!result.correct) {
      // Agregar errores al contenedor de errores
      const errorItem = document.createElement("div");
      errorItem.className = "result-item";


      errorItem.innerHTML = `
  <p>Level ${result.level}: Incorrect. <span class="correct-text">This is the correct image.</span></p>
  <img src="${result.correctImage}" alt="Correct image for level ${result.level}">
`;

      errorList.appendChild(errorItem);
    } else {
      // Agregar aciertos al contenedor de aciertos
      const correctItem = document.createElement("p");
      correctItem.textContent = `Level ${result.level}: Correct.`;
      correctList.appendChild(correctItem);
    }
  });
});



// Reiniciar el juego
function restartGame() {
  localStorage.removeItem("gameResults"); // Limpia los datos almacenados
  window.location.href = "TIC2/html/Feelings/level1.html"; // Redirige al primer nivel
}
