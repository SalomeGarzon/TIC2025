// Botón para ver el video nuevamente
document.getElementById("watch-video").addEventListener("click", function () {
    window.location.href = "/html/Family/Notification/notification.html";
  });
  
  // Variables para el control de selección
  const options = document.querySelectorAll(".option");
  const finishBtn = document.getElementById("finish");
  
  // Recuperar y/o inicializar contadores
  if (!localStorage.getItem("correct")) localStorage.setItem("correct", 0);
  if (!localStorage.getItem("wrong")) localStorage.setItem("wrong", 0);
  
  // Manejo de selección
  let selectedOption = null;
  
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Quitar selección previa
      options.forEach((opt) => opt.classList.remove("selected"));
  
      // Seleccionar la opción actual
      option.classList.add("selected");
      selectedOption = option;
    });
  });
  
  // Al presionar "Finish"
  finishBtn.addEventListener("click", () => {
    if (selectedOption) {
      const isCorrect = selectedOption.getAttribute("data-correct") === "true";
  
      // Actualizar contadores
      if (isCorrect) {
        localStorage.setItem("correct", +localStorage.getItem("correct") + 1);
      } else {
        localStorage.setItem("wrong", +localStorage.getItem("wrong") + 1);
      }
  
      // Mostrar retroalimentación
      const correctCount = localStorage.getItem("correct");
      const wrongCount = localStorage.getItem("wrong");
  
      document.body.innerHTML = `
        <div id="feedback">
          <h2>Feedback</h2>
          <p><strong>Correct Answers:</strong> ${correctCount}</p>
          <p><strong>Wrong Answers:</strong> ${wrongCount}</p>
          <button id="restart">Restart</button>
        </div>
      `;
  
      // Botón para reiniciar
      document.getElementById("restart").addEventListener("click", () => {
        localStorage.setItem("correct", 0);
        localStorage.setItem("wrong", 0);
        window.location.href = "/html/Family/family.html";
      });
    }
  });
  