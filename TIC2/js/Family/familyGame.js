  // Botón para ver el video nuevamente
  document.getElementById("watch-video").addEventListener("click", function () {
    window.location.href = "TIC2/html/Family/Notification/notification.html";
  });

  // Inicializar contadores de aciertos y errores en sessionStorage
  if (!sessionStorage.getItem("correct")) sessionStorage.setItem("correct", "0");
  if (!sessionStorage.getItem("wrong")) sessionStorage.setItem("wrong", "0");

  const options = document.querySelectorAll(".option");
  const buttons = document.querySelectorAll("#watch-video, #next-level, #finish");
  const allInteractiveElements = [...options, ...buttons]; // Combinar opciones y botones
  const level = parseInt(document.body.getAttribute("data-level"), 10); // Nivel actual
  const totalLevels = 6; // Total de niveles
  let selectedOptionIndex = 0;
  let selectedOption = null;

  // Establecer tabindex dinámico y eliminar bordes iniciales
  allInteractiveElements.forEach((element) => {
    element.setAttribute("tabindex", "0");
    element.style.outline = "none";

    // Añadir estilos de focus dinámicamente
    element.addEventListener("focus", () => element.style.outline = "4px solid #007bff");
    element.addEventListener("blur", () => element.style.outline = "none");

    // Manejar selección con clic para opciones y botones
    element.addEventListener("click", () => {
      if (element.classList.contains("option")) {
        options.forEach((opt) => opt.classList.remove("selected")); // Quitar selección previa
        element.classList.add("selected"); // Marcar opción actual
        selectedOption = element;

        // Habilitar botones
        if (level < totalLevels) {
          document.getElementById("next-level").disabled = false;
        } else {
          // En el último nivel, habilitar el botón "Finish" sin enfocarlo
          const finishBtn = document.getElementById("finish");
          if (finishBtn) finishBtn.disabled = false;
        }
      } else if (element.id === "watch-video") {
        window.location.href = "TIC2/html/Family/Notification/notification.html";
      }
    });
  });

  // Navegación por teclado
  document.addEventListener("keydown", (event) => {
    const focusedElement = document.querySelector(":focus");

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        // Mover el foco al siguiente elemento interactivo
        if (focusedElement) {
          focusedElement.blur();
          selectedOptionIndex = (selectedOptionIndex + 1) % allInteractiveElements.length;
          allInteractiveElements[selectedOptionIndex].focus();
        }
        break;

      case "ArrowLeft":
      case "ArrowUp":
        // Mover el foco al elemento anterior
        if (focusedElement) {
          focusedElement.blur();
          selectedOptionIndex =
            (selectedOptionIndex - 1 + allInteractiveElements.length) % allInteractiveElements.length;
          allInteractiveElements[selectedOptionIndex].focus();
        }
        break;

      case "Enter":
        // Simular clic en el elemento enfocado
        if (focusedElement) {
          focusedElement.click();
        }
        break;

      default:
        break;
    }
  });

  if (document.getElementById("next-level")) {
    document.getElementById("next-level").addEventListener("click", () => {
      if (selectedOption) {
        const isCorrect = selectedOption.getAttribute("data-correct") === "true";
        sessionStorage.setItem(
          isCorrect ? "correct" : "wrong",
          +sessionStorage.getItem(isCorrect ? "correct" : "wrong") + 1
        );

        const nextLevel = level + 1;
        if (level < totalLevels) {
          window.location.href = `TIC2/html/Family/family${nextLevel}.html`;
        }
      }
    });
  }

  if (document.getElementById("finish")) {
    document.getElementById("finish").addEventListener("click", () => {
      if (selectedOption) {
        const isCorrect = selectedOption.getAttribute("data-correct") === "true";
        sessionStorage.setItem(
          isCorrect ? "correct" : "wrong",
          +sessionStorage.getItem(isCorrect ? "correct" : "wrong") + 1
        );

        const correctCount = sessionStorage.getItem("correct");
        const wrongCount = sessionStorage.getItem("wrong");

        // Redirigir a la página de feedback
        window.location.href = `TIC2/html/Family/feedback.html?correct=${correctCount}&wrong=${wrongCount}`;
      }
    });
  }
