// Botón para ver el video nuevamente
document.getElementById("watch-video").addEventListener("click", function () {
  window.location.href = "/TIC2025/TIC/html/Family/Notification/notification.html";
});

// Variables para el control de selección
const options = document.querySelectorAll(".option");
const nextLevelBtn = document.getElementById("next-level");
const finishBtn = document.getElementById("finish");

// Inicializamos contadores de aciertos y errores en localStorage
const correctCount = parseInt(localStorage.getItem("correct") || "0", 10);
const wrongCount = parseInt(localStorage.getItem("wrong") || "0", 10);

localStorage.setItem("correct", correctCount);
localStorage.setItem("wrong", wrongCount);

// Manejo de selección de opciones
let selectedOption = null;

options.forEach((option) => {
  option.addEventListener("click", () => {
    // Quitar selección previa
    options.forEach((opt) => opt.classList.remove("selected"));

    // Marcar la opción actual como seleccionada
    option.classList.add("selected");
    selectedOption = option;

    // Habilitar el botón correspondiente (Next Level o Finish)
    if (nextLevelBtn) nextLevelBtn.disabled = false;
    if (finishBtn) finishBtn.disabled = false;
  });
});

// Detectar el nivel actual desde el atributo del <body>
const level = document.body.getAttribute("data-level");

// Configurar la redirección del botón "Next Level" según el nivel
if (nextLevelBtn) {
  nextLevelBtn.addEventListener("click", () => {
    if (selectedOption) {
      const isCorrect = selectedOption.getAttribute("data-correct") === "true";

      // Actualizar contadores en localStorage
      if (isCorrect) {
        localStorage.setItem("correct", +localStorage.getItem("correct") + 1);
      } else {
        localStorage.setItem("wrong", +localStorage.getItem("wrong") + 1);
      }

      // Redirigir al nivel siguiente
      const nextLevel = parseInt(level, 10) + 1;
      window.location.href = `/TIC2025/TIC/html/Family/family${nextLevel}.html`;
    }
  });
}

// Manejo del botón "Finish" en la página final
if (finishBtn) {
  finishBtn.addEventListener("click", () => {
    if (selectedOption) {
      const isCorrect = selectedOption.getAttribute("data-correct") === "true";

      // Actualizar contadores en localStorage
      if (isCorrect) {
        localStorage.setItem("correct", +localStorage.getItem("correct") + 1);
      } else {
        localStorage.setItem("wrong", +localStorage.getItem("wrong") + 1);
      }

      // Recuperar los valores de correct y wrong desde localStorage
      const correctCount = localStorage.getItem("correct") || "0";
      const wrongCount = localStorage.getItem("wrong") || "0";

      // Redirigir a feedback.html con los parámetros correct y wrong en la URL
      window.location.href = `/TIC2025/TIC/html/Family/feedback.html`;
    }
  });
}





