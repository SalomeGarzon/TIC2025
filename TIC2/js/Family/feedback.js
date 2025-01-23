// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const correct = params.get("correct") || "0";
const wrong = params.get("wrong") || "0";

// Mostrar resultados con estilos y emojis
document.getElementById("correct-result").innerHTML = `Correct Answers: ${correct} <span class="emoji">😊</span>`;
document.getElementById("wrong-result").innerHTML = `Wrong Answers: ${wrong} <span class="emoji">😢</span>`;

// Reiniciar juego
document.getElementById("restart").addEventListener("click", () => {
  sessionStorage.clear(); // Limpiar datos de sessionStorage
  window.location.href = "/TIC2/html//Family/family.html"; // Redirigir a la página inicial
});


// Botón pagina de inicio
document.getElementById("home").addEventListener("click", () => {
  sessionStorage.clear(); // Limpiar datos de sessionStorage
  window.location.href = "/index.html"; // Redirigir a la página inicial
});
